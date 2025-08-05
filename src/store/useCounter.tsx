import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CounterState {
  count: number
}

interface CounterActions {
  increment: () => void
  decrement: () => void
  reset: () => void
}

type CounterStore = CounterState & CounterActions

const useCounter = create<CounterStore>()(
  persist(
    set => ({
      count: 0,
      increment: () => set(state => ({ count: state.count + 1 })),
      decrement: () => set(state => ({ count: state.count - 1 })),
      reset: () => set({ count: 0 }),
    }),
    {
      name: 'counter-storage', // name of the storage (needs to be unique)
      storage: {
        getItem: name => {
          const item = localStorage.getItem(name)
          return item ? JSON.parse(item) : null
        },
        setItem: (name, value) => localStorage.setItem(name, JSON.stringify(value)),
        removeItem: name => localStorage.removeItem(name),
      },
    },
  ),
)

export default useCounter
