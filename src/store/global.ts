import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface GlobalState {
  primaryColor: string
  setColor: (color: string) => void
}

const useGlobalStore = create<GlobalState>()(
  persist(
    set => ({
      primaryColor: '#247fff',
      setColor: (color: string) => set({ primaryColor: color }),
    }),
    {
      name: 'primaryColor',
    },
  ),
)

export default useGlobalStore
