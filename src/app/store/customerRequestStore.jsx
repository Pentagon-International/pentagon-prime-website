import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const useCustomerRequestStore = create(
  persist((set) => ({
      formValues: {},
      setFormValues: (hook) => set({ formValues: hook }),
    }),
    {
      name: 'customer-request-store', 
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        formValues: state.formValues,
      }),
    }
  )
);

export default useCustomerRequestStore;