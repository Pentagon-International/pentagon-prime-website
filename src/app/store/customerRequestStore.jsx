import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const useCustomerRequestStore = create(
  persist((set) => ({
      formValues: {},
      setFormValues: (hook) => set({ formValues: hook }),
      _hasHydrated: false,
      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: 'customer-request-store', 
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        formValues: state.formValues,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHasHydrated(true);
        }
      },
    }
  )
);

export default useCustomerRequestStore;