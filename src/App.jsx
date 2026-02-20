import { useReducer, useState } from 'react'

const initialTodos = [
  { id: crypto.randomUUID(), title: 'Prepare breakfast (banana pancakes)', completed: false },
  { id: crypto.randomUUID(), title: 'Serve 1 fruit portion', completed: true },
  { id: crypto.randomUUID(), title: 'Cut fruit for snack time', completed: true },
  { id: crypto.randomUUID(), title: 'Make lunch (mac & cheese + veggies)', completed: false },
  { id: crypto.randomUUID(), title: 'Offer water every hour', completed: true },
]

function todosReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO': {
      return [action.todo, ...state]
    }
    case 'TOGGLE_TODO': {
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo,
      )
    }
    case 'DELETE_TODO': {
      return state.filter((todo) => todo.id !== action.id)
    }
    case 'UPDATE_TODO': {
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, title: action.title } : todo,
      )
    }
    default:
      return state
  }
}

function TodoItem({ todo, dispatch }) {
  const [isEditing, setIsEditing] = useState(false)
  const [draftTitle, setDraftTitle] = useState(todo.title)

  function startEditing() {
    setDraftTitle(todo.title)
    setIsEditing(true)
  }

  function saveEdit() {
    const nextTitle = draftTitle.trim()
    if (!nextTitle) return
    dispatch({ type: 'UPDATE_TODO', id: todo.id, title: nextTitle })
    setIsEditing(false)
  }

  function cancelEdit() {
    setDraftTitle(todo.title)
    setIsEditing(false)
  }

  return (
    <li
      className={[
        'flex items-center gap-3 rounded-xl border p-3 transition',
        isEditing ? 'ring-2 ring-sky-300/60' : '',
        todo.completed
          ? 'border-emerald-200/70 bg-emerald-50 text-slate-700'
          : 'border-slate-200 bg-white text-slate-900',
      ].join(' ')}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => dispatch({ type: 'TOGGLE_TODO', id: todo.id })}
        className="h-4 w-4 accent-emerald-500"
      />

      <div className="flex-1">
        {isEditing ? (
          <label className="block">
            <span className="sr-only">Edit todo title</span>
            <input
              value={draftTitle}
              onChange={(e) => setDraftTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') saveEdit()
                if (e.key === 'Escape') cancelEdit()
              }}
              className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-300/60"
              autoFocus
            />
          </label>
        ) : (
          <span
            className={[
              'block text-sm sm:text-base',
              todo.completed ? 'text-slate-500 line-through' : '',
            ].join(' ')}
          >
            {todo.title}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        {isEditing ? (
          <button
            type="button"
            onClick={saveEdit}
            className="rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-400 active:bg-emerald-500"
          >
            Save
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={startEditing}
              className="rounded-lg border border-slate-200 bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700 hover:bg-sky-100"
            >
              Edit
            </button>
            <button
              type="button"
              className="rounded-lg border border-slate-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-100 disabled:opacity-40"
              disabled={!todo.completed}
              title={todo.completed ? 'Delete todo' : 'Complete before deleting'}
              onClick={() => dispatch({ type: 'DELETE_TODO', id: todo.id })}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  )
}

export default function App() {
  const [todos, dispatch] = useReducer(todosReducer, initialTodos)
  const [newTitle, setNewTitle] = useState('')

  function handleAddTodo(e) {
    e.preventDefault()
    const title = newTitle.trim()
    if (!title) return

    dispatch({
      type: 'ADD_TODO',
      todo: { id: crypto.randomUUID(), title, completed: false },
    })
    setNewTitle('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-emerald-100 text-slate-900">
      <div className="mx-auto w-full max-w-2xl px-4 py-10 sm:py-14">
        <div className="rounded-3xl border border-white/60 bg-white/70 p-6 shadow-xl backdrop-blur sm:p-8">
          <header className="space-y-1">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Todo List
            </h1>
            <p className="text-sm text-slate-600">
              For little helpers — one tiny win at a time.
            </p>
          </header>

          <div className="mt-6">
            <form onSubmit={handleAddTodo} className="flex gap-2">
              <label className="sr-only" htmlFor="new-todo-title">
                New todo title
              </label>
              <input
                id="new-todo-title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Add a new todo (ex: brush teeth)"
                className="h-11 flex-1 rounded-xl border border-white/60 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-300/60"
              />
              <button
                type="submit"
                className="h-11 shrink-0 rounded-xl bg-sky-500 px-4 text-sm font-semibold text-white shadow-sm hover:bg-sky-400 active:bg-sky-500 disabled:opacity-50"
                disabled={!newTitle.trim()}
              >
                Add
              </button>
            </form>

            {todos.length === 0 ? (
              <div className="mt-4 rounded-2xl border border-dashed border-white/70 bg-white/60 p-6 text-center">
                <p className="text-sm font-semibold text-slate-800">No todos yet</p>
                <p className="mt-1 text-sm text-slate-600">
                  Add your first one above.
                </p>
              </div>
            ) : (
              <ul className="mt-4 space-y-2">
                {todos.map((todo) => (
                  <TodoItem key={todo.id} todo={todo} dispatch={dispatch} />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
