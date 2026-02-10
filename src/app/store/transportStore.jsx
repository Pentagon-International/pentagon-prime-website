import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useTransportStore = create(
  persist(
    (set) => ({
      seaData: [],
      airData: [],

      // Maps auto-generated
      seaPortMap: {},
      airPortMap: {},

      // ✔ Do not change functionality BUT add map generation inside
      setSeaData: (data) =>
        set((state) => {
          const map = {};
          data.forEach((item) => {
            map[item.code] = {
              code: item.code,
              city: item.city,
              country: item.country,
              name: item.name,
            };
          });

          return {
            seaData: data,
            seaPortMap: map, // auto update
          };
        }),

      // ✔ Automatically create map when setting airData
      setAirData: (data) =>
        set((state) => {
          const map = {};
          data.forEach((item) => {
            if (!map[item.code]) {
              map[item.code] = {
                code: item.code,
                city: item.city,
                country: item.country,
                name: item.name,
              };
            }
          });

          return {
            airData: data,
            airPortMap: map, // auto update
          };
        }),
    }),
    {
      name: "@transport-store",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useTransportStore;
