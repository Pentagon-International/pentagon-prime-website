import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Create Zustand store with persist
const useTransportStore = create(
  persist(
    (set) => ({
      seaData: [],
      airData: [],

      // Action to set sea data
      setSeaData: (data) => set({ seaData: data }),

      // Action to set air data
      setAirData: (data) => set({ airData: data }),
    }),
    {
      name: '@transport-store', // Key for storage
      storage: createJSONStorage(() => sessionStorage), // Use sessionStorage
    }
  )
);

export default useTransportStore;
