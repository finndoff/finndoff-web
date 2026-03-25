import type { ComparisonTableSection } from '@/types/sanity'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { Check, X } from 'lucide-react'

function CellValue({ value }: { value?: string }) {
  if (value === 'true' || value === '✓') {
    return <Check className="mx-auto h-5 w-5 text-accent-500" />
  }
  if (value === 'false' || value === '✗') {
    return <X className="mx-auto h-5 w-5 text-navy-300" />
  }
  return <span className="font-mono text-sm">{value || '-'}</span>
}

export function ComparisonTable({ section }: { section: ComparisonTableSection }) {
  const columns = section.columns || []

  return (
    <SectionWrapper>
      {(section.title || section.subtitle) && (
        <div className="mb-12 text-center">
          {section.title && (
            <h2 className="font-display text-3xl font-bold lg:text-4xl">
              {section.title}
            </h2>
          )}
          {section.subtitle && (
            <p className="mt-4 text-lg text-navy-600">{section.subtitle}</p>
          )}
        </div>
      )}
      <div className="verksted-card overflow-x-auto bg-white p-1">
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="border-b-2 border-navy-200 pb-4 pr-4 pl-4 mono-label text-navy-500" />
              {columns.map((col) => (
                <th
                  key={col._key}
                  className={`border-b-2 pb-4 px-4 text-center font-display text-sm font-semibold ${
                    col.highlighted
                      ? 'border-primary-500 bg-primary-50/50 text-primary-700'
                      : 'border-navy-200 text-navy-700'
                  }`}
                >
                  {col.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {section.rows?.map((row) => (
              <tr key={row._key} className="border-b border-navy-100 transition-colors hover:bg-primary-50/20">
                <td className="py-4 pr-4 pl-4 font-medium text-navy-900">
                  {row.feature}
                </td>
                {columns.map((col, colIndex) => (
                  <td
                    key={col._key}
                    className={`px-4 py-4 text-center text-sm ${
                      col.highlighted ? 'bg-primary-50/50' : ''
                    }`}
                  >
                    <CellValue value={row.values?.[colIndex]} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionWrapper>
  )
}
