'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const sidebarItems = [
  {
    title: "Getting Started",
    items: [
      {
        title: "Introduction",
        href: "/docs/getting-started",
      },
      {
        title: "Installation",
        href: "/docs/installation",
      },
      {
        title: "Project Structure",
        href: "/docs/project-structure",
      },
    ],
  },
  {
    title: "Features",
    items: [
      {
        title: "Chat Interface",
        href: "/docs/features/chat",
      },
      {
        title: "Code Generation",
        href: "/docs/features/code-generation",
      },
      {
        title: "Artifact Management",
        href: "/docs/features/artifacts",
      },
    ],
  },
  {
    title: "API Reference",
    items: [
      {
        title: "Chat API",
        href: "/docs/api/chat",
      },
      {
        title: "Code Generation API",
        href: "/docs/api/code-generation",
      },
      {
        title: "Artifact API",
        href: "/docs/api/artifacts",
      },
    ],
  },
  {
    title: "Contributing",
    items: [
      {
        title: "How to Contribute",
        href: "/docs/contributing",
      },
      {
        title: "Code of Conduct",
        href: "/docs/code-of-conduct",
      },
      {
        title: "Development Guide",
        href: "/docs/development",
      },
    ],
  },
]

interface DocsSidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DocsSidebar({ className, ...props }: DocsSidebarProps) {
  const pathname = usePathname()

  return (
    <div className={cn("pb-12", className)} {...props}>
      <div className="space-y-4">
        {sidebarItems.map((item) => (
          <div key={item.title} className="py-2">
            <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-medium">
              {item.title}
            </h4>
            {item?.items?.length && (
              <div className="grid grid-flow-row auto-rows-max text-sm">
                {item.items.map((subItem) => (
                  <Link
                    key={subItem.href}
                    href={subItem.href}
                    className={cn(
                      "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline",
                      pathname === subItem.href
                        ? "font-medium text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {subItem.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

