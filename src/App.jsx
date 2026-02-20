export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-950 to-indigo-950 text-white">
      <div className="mx-auto w-full max-w-2xl px-4 py-10 sm:py-14">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur sm:p-8">
          <header className="space-y-1">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Todo List
            </h1>
            <p className="text-sm text-white/70">
              Tiny checklist, big peace of mind.
            </p>
          </header>

          <div className="mt-6">
            <div className="rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-white/70">
              Next: add the “Add todo” input and list rows.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
