import Link from "next/link";

const notes = [
  {
    section: "Go / Gin",
    items: [
      {
        slug: "/golang",
        tag: "golang",
        title: "Go notes",
        desc: "basics, control flow, data structures, core",
      },
      {
        slug: "/gin",
        tag: "gin",
        title: "Gin notes",
        desc: "boilerplate, middleware, routing, request binding",
      },
    ],
  },
  {
    section: "Docker",
    items: [
      {
        slug: "/docker",
        tag: "docker",
        title: "Docker notes",
        desc: "containerization, orchestration, networking",
      },
    ],
  },
  {
    section: "Git",
    items: [
      {
        slug: "/git",
        tag: "git",
        title: "Git commands",
        desc: "branching, remotes, undoing things, pr strategies",
      },
    ],
  },
  {
    section: "Devops",
    items: [
      {
        slug: "/devops",
        tag: "devops",
        title: "Devops notes",
        desc: "CI/CD, infrastructure as code, monitoring, best practices",
      },
    ],
  },
  {
    section: "Architecture",
    items: [
      {
        slug: "/architecture",
        tag: "architecture",
        title: "Architecture notes",
        desc: "core architecture patterns, design principles, best practices",
      },
    ],
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-cx text-cx-fg px-8 py-12 max-w-4xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-light tracking-tight text-cx-fg mb-2">
          my dev <span className="font-medium text-cx-heading">notes</span>
        </h1>
        <p className="font-mono text-[13px] text-cx-muted">
          {"//"} things i figured out, written down
        </p>
      </div>

      <div className="space-y-10">
        {notes.map((group) => (
          <div key={group.section}>
            <p className="font-mono text-[10px] text-cx-dim tracking-[0.2em] uppercase mb-3 pb-2 border-b border-cx-border">
              {group.section}
            </p>
            <div
              className={`grid gap-px bg-cx-border border border-cx-border rounded-lg overflow-hidden ${
                group.items.length === 1
                  ? "grid-cols-1"
                  : "grid-cols-1 sm:grid-cols-2"
              }`}
            >
              {group.items.map((item) => (
                <Link
                  key={item.slug}
                  href={item.slug}
                  className="group bg-cx hover:bg-cx-hover p-5 transition-colors duration-150"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[10px] text-cx-dim bg-cx-tag border border-cx-border-subtle px-2 py-0.5 rounded-sm">
                      {item.tag}
                    </span>
                    <span className="text-cx-faint group-hover:text-cx-body text-xs transition-colors duration-150">
                      ↗
                    </span>
                  </div>
                  <p className="text-sm font-medium text-cx-title group-hover:text-cx-fg mb-1 transition-colors duration-150">
                    {item.title}
                  </p>
                  <p className="font-mono text-[12px] text-cx-dim">
                    {item.desc}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="font-mono text-[11px] text-cx-footer mt-12">
        {"//"} more notes coming as i build things
      </p>
    </main>
  );
}
