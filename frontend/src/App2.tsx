import { useState } from 'react'
import './App.css'
import { AppShell } from './shared/components'

export function App() {
  const [count, setCount] = useState(0)

  return (
    <AppShell>
      <h1>Hello World</h1>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </AppShell>
  )
}
