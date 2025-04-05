import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useEstimationStore = create(persist((set) => {
  return {
    summary: {},
    list: [],
    saveList: (d) => {
      set(currentState => ({
        ...currentState,
        list: d
      }))
    },
    saveSummary: (d) => {
      set(curState => ({
        ...curState,
        summary: d
      }))
    },
    resetData: () => {
      set({ list: [], summary: {} })
    }
  }
},{
  name: '@estimate-store', // name of the item in the storage (must be unique)
  storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
}))

export default useEstimationStore;