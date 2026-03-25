'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, MapPin, Tag, X } from 'lucide-react'
import type { TreeNode } from '@/lib/tree'
import { createTree, getCheckedLabels } from '@/lib/tree'
import { fetchSteder, fetchCpvKoder } from '@/lib/search-api'
import { TreePickerModal } from '@/components/ui/TreePickerModal'

type PickerType = 'steder' | 'cpv' | null

export function HeroSearchBar() {
  const [freeText, setFreeText] = useState('')
  const [locationIds, setLocationIds] = useState<Set<number>>(new Set())
  const [cpvIds, setCpvIds] = useState<Set<number>>(new Set())
  const [activePicker, setActivePicker] = useState<PickerType>(null)

  // Cached API data
  const [stederNodes, setStederNodes] = useState<TreeNode[]>([])
  const [cpvNodes, setCpvNodes] = useState<TreeNode[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([fetchSteder(), fetchCpvKoder()])
      .then(([steder, cpv]) => {
        setStederNodes(steder)
        setCpvNodes(cpv)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  // Build tree maps for chip labels
  const stederTree = stederNodes.length > 0 ? createTree(stederNodes) : null
  const cpvTree = cpvNodes.length > 0 ? createTree(cpvNodes) : null

  const locationChips = stederTree
    ? getCheckedLabels(locationIds, stederTree.nodeMap)
    : []
  const cpvChips = cpvTree
    ? getCheckedLabels(cpvIds, cpvTree.nodeMap)
    : []

  function handleSubmit() {
    const params = new URLSearchParams()
    if (freeText.trim()) params.set('s', freeText.trim())
    if (locationIds.size > 0)
      params.set('locations', JSON.stringify(Array.from(locationIds)))
    if (cpvIds.size > 0)
      params.set('cpv', JSON.stringify(Array.from(cpvIds)))

    const url = `https://finndoff.no/portal/search${params.toString() ? `?${params.toString()}` : ''}`
    window.location.href = url
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <>
      <div className="mt-8 w-full max-w-2xl">
        {/* Search bar — dark-aware */}
        <div className="flex flex-col gap-2 rounded-2xl bg-navy-800/80 backdrop-blur-sm border border-white/10 p-2 shadow-[var(--shadow-verksted-lg)] sm:flex-row sm:items-center">
          {/* Free text */}
          <input
            type="text"
            value={freeText}
            onChange={(e) => setFreeText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Bransje eller tjeneste"
            className="flex-1 rounded-xl bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-navy-400"
          />

          {/* Divider (desktop only) */}
          <div className="hidden h-8 w-px bg-white/10 sm:block" />

          {/* Location picker button */}
          <button
            type="button"
            onClick={() => !loading && setActivePicker('steder')}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm text-navy-300 transition-colors hover:bg-white/5 disabled:opacity-50"
          >
            <MapPin className="h-4 w-4 shrink-0 text-primary-400" />
            <span className="whitespace-nowrap">
              {locationIds.size > 0
                ? `${locationIds.size} sted${locationIds.size > 1 ? 'er' : ''}`
                : 'Velg sted'}
            </span>
          </button>

          {/* Divider (desktop only) */}
          <div className="hidden h-8 w-px bg-white/10 sm:block" />

          {/* CPV picker button */}
          <button
            type="button"
            onClick={() => !loading && setActivePicker('cpv')}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm text-navy-300 transition-colors hover:bg-white/5 disabled:opacity-50"
          >
            <Tag className="h-4 w-4 shrink-0 text-primary-400" />
            <span className="whitespace-nowrap">
              {cpvIds.size > 0
                ? `${cpvIds.size} kategori${cpvIds.size > 1 ? 'er' : ''}`
                : 'Velg kategori'}
            </span>
          </button>

          {/* Submit button */}
          <button
            type="button"
            onClick={handleSubmit}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-500 text-navy-900 transition-colors hover:bg-accent-400"
            aria-label="Søk"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

        {/* Chips */}
        {(locationChips.length > 0 || cpvChips.length > 0) && (
          <div className="mt-3 flex flex-wrap gap-2">
            {locationChips.map((chip) => (
              <span
                key={`loc-${chip.id}`}
                className="inline-flex items-center gap-1 rounded-full bg-primary-500/20 px-3 py-1 text-xs font-medium text-primary-300"
              >
                <MapPin className="h-3 w-3" />
                {chip.label}
                <button
                  type="button"
                  onClick={() => {
                    const next = new Set(locationIds)
                    next.delete(chip.id)
                    setLocationIds(next)
                  }}
                  className="ml-0.5 hover:text-white"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
            {cpvChips.map((chip) => (
              <span
                key={`cpv-${chip.id}`}
                className="inline-flex items-center gap-1 rounded-full bg-accent-500/20 px-3 py-1 text-xs font-medium text-accent-300"
              >
                <Tag className="h-3 w-3" />
                {chip.label}
                <button
                  type="button"
                  onClick={() => {
                    const next = new Set(cpvIds)
                    next.delete(chip.id)
                    setCpvIds(next)
                  }}
                  className="ml-0.5 hover:text-white"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      {activePicker === 'steder' && (
        <TreePickerModal
          title="Velg sted"
          nodes={stederNodes}
          checkedIds={locationIds}
          onClose={(ids) => {
            setLocationIds(ids)
            setActivePicker(null)
          }}
        />
      )}
      {activePicker === 'cpv' && (
        <TreePickerModal
          title="Velg kategori"
          nodes={cpvNodes}
          checkedIds={cpvIds}
          onClose={(ids) => {
            setCpvIds(ids)
            setActivePicker(null)
          }}
        />
      )}
    </>
  )
}
