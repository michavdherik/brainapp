import { create } from 'zustand'

interface ProfileData {
  symptoms: string[]
  triggers: string[]
  activities: string[]
}

interface ProfileState extends ProfileData {
  setSymptoms: (symptoms: string[]) => void
  setTriggers: (triggers: string[]) => void
  setActivities: (activities: string[]) => void
  reset: () => void
}

const localStorageKey = 'profileState'

const getInitialState = (): ProfileData => {
  try {
    const storedState = JSON.parse(
      localStorage.getItem(localStorageKey) || '{}'
    )
    return {
      symptoms: storedState.symptoms || [],
      triggers: storedState.triggers || [],
      activities: storedState.activities || [],
    }
  } catch {
    return { symptoms: [], triggers: [], activities: [] }
  }
}

export const useProfileStore = create<ProfileState>((set) => ({
  ...getInitialState(),
  setSymptoms: (symptoms) => {
    set((state) => {
      const newState = { ...state, symptoms }
      localStorage.setItem(localStorageKey, JSON.stringify(newState))
      return newState
    })
  },
  setTriggers: (triggers) => {
    set((state) => {
      const newState = { ...state, triggers }
      localStorage.setItem(localStorageKey, JSON.stringify(newState))
      return newState
    })
  },
  setActivities: (activities) => {
    set((state) => {
      const newState = { ...state, activities }
      localStorage.setItem(localStorageKey, JSON.stringify(newState))
      return newState
    })
  },
  reset: () => {
    localStorage.removeItem(localStorageKey)
    set({ symptoms: [], triggers: [], activities: [] })
  },
}))
