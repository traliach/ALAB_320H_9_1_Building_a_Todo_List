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

  return (
    <li
      className={[
        'flex items-center gap-3 rounded-xl border p-3',
        isEditing ? 'ring-2 ring-indigo-400/30' : '',
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

      <div className="flex-1">
        {isEditing ? (
          <label className="block">
            <span className="sr-only">Edit todo title</span>
            <input
              value={draftTitle}
              onChange={(e) => setDraftTitle(e.target.value)}
              className="h-10 w-full rounded-lg border border-white/10 bg-black/30 px-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-400/60"
              autoFocus
            />
          </label>
        ) : (
          <span
            className={[
              'block text-sm sm:text-base',
              todo.completed ? 'text-white/60 line-through' : '',
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
            className="rounded-lg bg-indigo-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-400 active:bg-indigo-500"
          >
            Save
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={startEditing}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 hover:bg-white/10"
            >
              Edit
            </button>
            <button
              type="button"
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 hover:bg-white/10 disabled:opacity-40"
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
            <form onSubmit={handleAddTodo} className="flex gap-2">
              <label className="sr-only" htmlFor="new-todo-title">
                New todo title
              </label>
              <input
                id="new-todo-title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Add a new todo..."
                className="h-11 flex-1 rounded-xl border border-white/10 bg-black/30 px-4 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-400/60"
              />
              <button
                type="submit"
                className="h-11 shrink-0 rounded-xl bg-indigo-500 px-4 text-sm font-semibold text-white hover:bg-indigo-400 active:bg-indigo-500 disabled:opacity-50"
                disabled={!newTitle.trim()}
              >
                Add
              </button>
            </form>

            <ul className="mt-4 space-y-2">
              {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} dispatch={dispatch} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
