/**
 * Maps (cargo type, container size) to API unit code for the check-tariff-charges API.
 * Cargo types: GC, OT, FR, FB, TANK, REEF (from container details options).
 * Sizes: 20GP, 40GP, 40HC, 45HC.
 */
const CARGO_SIZE_TO_UNIT = {
  "GC|20GP": "22G0",
  "OT|20GP": "22U1",
  "FR|20GP": "22P1",
  "FB|20GP": "29P0",
  "TANK|20GP": "22T0",
  "REEF|20GP": "22R1",

  "GC|40GP": "42G0",
  "OT|40GP": "42U1",
  "FR|40GP": "42P1",
  "FB|40GP": "49P0",
  "REEF|40GP": "42R1",

  "GC|40HC": "40HC",

  "GC|45HC": "L5G0",
};

/**
 * @param {string} cargoType - Cargo/container type (e.g. "GC", "OT", "REEF")
 * @param {string} size - Container size from form (e.g. "20GP", "40HC")
 * @returns {string|null} API unit code, or null if either argument is missing; falls back to size if no mapping
 */
export function getUnitCode(cargoType, size) {
  if (!cargoType || !size) return size ?? null;
  const key = `${cargoType}|${size}`;
  return CARGO_SIZE_TO_UNIT[key] ?? size;
}
