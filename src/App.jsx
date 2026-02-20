import { useReducer } from 'react'

const initialTodos = [
  { id: crypto.randomUUID(), title: 'Prepare breakfast (banana pancakes)', completed: false },
  { id: crypto.randomUUID(), title: 'Serve 1 fruit portion', completed: true },
  { id: crypto.randomUUID(), title: 'Cut fruit for snack time', completed: true },
  { id: crypto.randomUUID(), title: 'Make lunch (mac & cheese + veggies)', completed: false },
  { id: crypto.randomUUID(), title: 'Offer water every hour', completed: true },
]

function todosReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_TODO': {
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo,
      )
    }
    default:
      return state
  }
}

export default function App() {
  const [todos, dispatch] = useReducer(todosReducer, initialTodos)

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
            <ul className="space-y-2">
              {todos.map((todo) => (
                <li
                  key={todo.id}
                  className={[
                    'flex items-center gap-3 rounded-xl border p-3',
                    todo.completed
                      ? 'border-white/10 bg-white/5 text-white/60'
                      : 'border-white/10 bg-black/20 text-white',
                  ].join(' ')}
                >
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => dispatch({ type: 'TOGGLE_TODO', id: todo.id })}
                    className="h-4 w-4 accent-indigo-400"
                  />

                  <span
                    className={[
                      'flex-1 text-sm sm:text-base',
                      todo.completed ? 'line-through' : '',
                    ].join(' ')}
                  >
                    {todo.title}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 hover:bg-white/10"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 hover:bg-white/10 disabled:opacity-40"
                      disabled={!todo.completed}
                      title={
                        todo.completed ? 'Delete todo' : 'Complete before deleting'
                      }
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
