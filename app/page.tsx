import Link from "next/link";

const notes = [
  {
    section: "Docker",
    items: [
      {
        slug: "/docker/local-postgres",
        tag: "docker",
        title: "Local Postgres with Docker",
        desc: "spin up, connect, migrate",
      },
      {
        slug: "/docker/compose-setup",
        tag: "docker",
        title: "docker-compose basics",
        desc: "define services, stop typing long cmds",
      },
    ],
  },
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
    section: "Linux / Tooling",
    items: [
      {
        slug: "/linux/appimage-setup",
        tag: "linux",
        title: "AppImage setup on GNOME",
        desc: "chmod, desktop files, no-sandbox",
      },
      {
        slug: "/linux/bruno",
        tag: "linux",
        title: "Bruno for API testing",
        desc: "postman alternative, git-friendly",
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
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0d0d0d] text-[#e8e8e8] px-8 py-12 max-w-4xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-light tracking-tight text-[#e8e8e8] mb-2">
          my dev <span className="font-medium text-white">notes</span>
        </h1>
        <p className="font-mono text-[13px] text-[#555]">
          {"//"} things i figured out, written down
        </p>
      </div>

      <div className="space-y-10">
        {notes.map((group) => (
          <div key={group.section}>
            <p className="font-mono text-[10px] text-[#444] tracking-[0.2em] uppercase mb-3 pb-2 border-b border-[#1a1a1a]">
              {group.section}
            </p>
            <div
              className={`grid gap-px bg-[#1a1a1a] border border-[#1a1a1a] rounded-lg overflow-hidden ${
                group.items.length === 1
                  ? "grid-cols-1"
                  : "grid-cols-1 sm:grid-cols-2"
              }`}
            >
              {group.items.map((item) => (
                <Link
                  key={item.slug}
                  href={item.slug}
                  className="group bg-[#0d0d0d] hover:bg-[#111] p-5 transition-colors duration-150"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[10px] text-[#444] bg-[#141414] border border-[#1e1e1e] px-2 py-0.5 rounded-sm">
                      {item.tag}
                    </span>
                    <span className="text-[#333] group-hover:text-[#666] text-xs transition-colors duration-150">
                      ↗
                    </span>
                  </div>
                  <p className="text-sm font-medium text-[#ccc] group-hover:text-[#e8e8e8] mb-1 transition-colors duration-150">
                    {item.title}
                  </p>
                  <p className="font-mono text-[12px] text-[#444]">
                    {item.desc}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="font-mono text-[11px] text-[#2a2a2a] mt-12">
        {"//"} more notes coming as i build things
      </p>
    </main>
  );
}
