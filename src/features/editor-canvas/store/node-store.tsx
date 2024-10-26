import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { Actions, State } from '../types/node-store'

const initialState: State = {
  googleFile: {},
  slackChannels: [],
  selectedSlackChannels: []
}

export const useNodeStore = create<State & Actions>()(
  immer((set) => ({
    ...initialState,
    setGoogleFile: (googleFile) => set({ googleFile }),
    setSlackChannels: (slackChannels) => set({ slackChannels }),
    setSelectedSlackChannels: (selectedSlackChannels) => set({ selectedSlackChannels })
  }))
)
