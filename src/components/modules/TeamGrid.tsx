import type { TeamGridSection } from '@/types/sanity'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { SanityImage } from '@/components/ui/SanityImage'

export function TeamGrid({ section }: { section: TeamGridSection }) {
  return (
    <SectionWrapper>
      {section.title && (
        <div className="mb-12 text-center">
          <h2 className="font-display text-3xl font-bold lg:text-4xl">
            {section.title}
          </h2>
          {section.subtitle && (
            <p className="mx-auto mt-4 max-w-2xl text-lg text-navy-600">
              {section.subtitle}
            </p>
          )}
        </div>
      )}

      <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
        {section.persons?.map((person) => (
          <div key={person._id} className="verksted-card bg-white p-6 text-center">
            <div className="mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full ring-2 ring-primary-500/20">
              {person.image?.asset ? (
                <SanityImage
                  image={person.image}
                  width={256}
                  height={256}
                  className="h-full w-full object-cover"
                  sizes="128px"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary-500 to-primary-700 text-3xl font-bold text-white">
                  {person.name?.charAt(0)}
                </div>
              )}
            </div>
            <h3 className="font-display text-lg font-semibold">
              {person.name}
            </h3>
            {person.role && (
              <p className="mt-1 mono-label text-copper-500">{person.role}</p>
            )}
            {person.bio && (
              <p className="mt-2 text-sm leading-relaxed text-navy-500">
                {person.bio}
              </p>
            )}
            {person.linkedIn && (
              <a
                href={person.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-navy-400 transition-colors hover:text-primary-500"
                aria-label={`${person.name} på LinkedIn`}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            )}
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
