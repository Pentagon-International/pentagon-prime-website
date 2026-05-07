"use client";

import { useMemo, useState } from "react";
import { Box, Button, Modal, Text, TextInput } from "@mantine/core";
import {
  allShips,
  filterTrackingShips,
  modalStatusLabel,
  shipProgressColors,
  trackingCardPillClass,
  trackingCardStatusLabel,
} from "../components/shipmentsData";

const TRK_FILTERS = [
  { id: "all", label: "All Active" },
  { id: "sea", label: "Sea" },
  { id: "air", label: "Air" },
  { id: "delayed", label: "Delayed" },
];

function TrackShipmentCard({ row, onOpen }) {
  const pillClass = trackingCardPillClass[row.status];
  const bar = shipProgressColors[row.status];
  const statusText = trackingCardStatusLabel[row.status];

  return (
    <Box
      className="card tracking-shipment-card"
      onClick={() => onOpen(row.bl)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onOpen(row.bl);
      }}
    >
      <Box className="tracking-card-head">
        <Box>
          <Box
            style={{
              fontFamily: "var(--font-head)",
              fontSize: "15px",
              fontWeight: 800,
              color: "var(--blue)",
              letterSpacing: ".04em",
            }}
          >
            {row.bl}
          </Box>
          <Box className="tracking-card-route" style={{ fontSize: "11px", color: "var(--txt3)", marginTop: "2px" }}>
            {`${row.origin} → ${row.dest}\u00a0·\u00a0${row.mode}\u00a0·\u00a0${row.commodity}`}
          </Box>
        </Box>
        <Box className="tracking-card-meta">
          <Text span className={pillClass}>
            {statusText}
          </Text>
          <Box style={{ fontSize: "11px", color: "var(--txt3)", marginTop: "4px" }}>
            ETA: <strong>{row.eta}</strong>
          </Box>
        </Box>
      </Box>
      <Box className="tracking-card-vessel">
        🚢 Vessel: <strong style={{ color: "var(--txt2)" }}>{row.vessel}</strong>
        {"\u00a0·\u00a0"}
        Carrier: <strong style={{ color: "var(--txt2)" }}>{row.carrier}</strong>
      </Box>
      <Box style={{ height: "6px", background: "var(--bg2)", borderRadius: "3px", overflow: "hidden", marginBottom: "6px" }}>
        <Box
          style={{
            height: "100%",
            width: `${row.prog}%`,
            background: bar,
            borderRadius: "3px",
            transition: "width 1s ease",
          }}
        />
      </Box>
      <Box className="journey-steps" style={{ margin: "10px 0 4px" }}>
        {row.steps.slice(0, row.step).map((s, i) => (
          <Box key={`d-${i}`} className="j-step">
            <Box className="j-dot done"></Box>
            <Box className="j-label done">{s}</Box>
          </Box>
        ))}
        {row.step < row.steps.length && (
          <Box className="j-step">
            <Box className="j-dot active"></Box>
            <Box className="j-label active">{row.steps[row.step]}</Box>
          </Box>
        )}
        {row.steps.slice(row.step + 1).map((s, i) => (
          <Box key={`l-${i}`} className="j-step">
            <Box className="j-dot"></Box>
            <Box className="j-label">{s}</Box>
          </Box>
        ))}
      </Box>
      <Box style={{ fontSize: "10px", color: "var(--txt3)", marginTop: "6px" }}>
        Click to view full details, documents & milestones
      </Box>
    </Box>
  );
}

export default function DashboardTrackingPage() {
  const [search, setSearch] = useState("");
  const [trkFilter, setTrkFilter] = useState("all");
  const [selectedBl, setSelectedBl] = useState(null);

  const filtered = useMemo(
    () => filterTrackingShips(allShips, trkFilter, search),
    [trkFilter, search],
  );

  const selected = useMemo(
    () => (selectedBl ? allShips.find((s) => s.bl === selectedBl) : null),
    [selectedBl],
  );

  const openModal = (bl) => setSelectedBl(bl);
  const closeModal = () => setSelectedBl(null);

  return (
    <Box id="tab-tracking" className="tab-panel active">
      <Box className="dash">
        <Box className="section-head">
          <Box className="section-title">Live Shipment Tracking</Box>
        </Box>

        <Box className="card tracking-search-card" style={{ marginBottom: "16px" }}>
          <Box className="tracking-search-wrap">
            <Box className="tracking-search-main">
              <Box
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "var(--txt3)",
                  textTransform: "uppercase",
                  letterSpacing: ".07em",
                  marginBottom: "6px",
                }}
              >
                Enter B/L Number or Booking Reference
              </Box>
              <Box className="tracking-search-input-row">
                <TextInput
                  id="track-input"
                  type="text"
                  placeholder="e.g. BL-20240901"
                  value={search}
                  onChange={(e) => setSearch(e.currentTarget.value)}
                  styles={{
                    root: { flex: 1, minWidth: 0 },
                    input: {
                      border: "0.5px solid var(--border)",
                      borderRadius: "8px",
                      padding: "10px 14px",
                      fontFamily: "var(--font)",
                      fontSize: "13px",
                      color: "var(--txt)",
                      outline: "none",
                      background: "var(--bg)",
                    },
                  }}
                />
                <Button type="button" className="btn-primary">
                  Track
                </Button>
              </Box>
            </Box>
            <Box className="tracking-filter-chips">
              {TRK_FILTERS.map((t) => (
                <Button
                  key={t.id}
                  type="button"
                  className={`fbtn${trkFilter === t.id ? " sel" : ""}`}
                  onClick={() => setTrkFilter(t.id)}
                >
                  {t.label}
                </Button>
              ))}
            </Box>
          </Box>
        </Box>

        <Box className="g2-1">
          <Box id="track-list" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {filtered.length === 0 ? (
              <Box className="card" style={{ textAlign: "center", color: "var(--txt3)", padding: "40px" }}>
                No shipments match your search.
              </Box>
            ) : (
              filtered.map((r) => <TrackShipmentCard key={r.bl} row={r} onOpen={openModal} />)
            )}
          </Box>

          <Box className="tracking-side-stack">
            <Box className="card" style={{ padding: 0, overflow: "hidden" }}>
              <Box style={{ padding: "16px 18px 10px" }}>
                <Box className="card-head" style={{ marginBottom: "6px" }}>
                  <Box className="card-title">Route Map</Box>
                  <Text span className="bdg bdg-live">
                    Live
                  </Text>
                </Box>
              </Box>
              <svg className="track-map-svg" viewBox="0 0 380 220" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <rect width="380" height="220" fill="#D6E8F5" />
                <path
                  d="M20 55 L90 44 L120 60 L132 82 L138 108 L130 132 L120 155 L108 175 L96 185 L82 195 L60 195 L46 180 L34 165 L24 148 L18 128 L18 100 L20 78Z"
                  fill="#C0D4EC"
                  stroke="#AABDDC"
                  strokeWidth="0.7"
                />
                <path
                  d="M168 38 L195 32 L210 40 L218 54 L217 68 L207 78 L192 80 L178 76 L166 66 L162 52Z"
                  fill="#C0D4EC"
                  stroke="#AABDDC"
                  strokeWidth="0.7"
                />
                <path
                  d="M220 50 L248 44 L272 46 L298 50 L318 58 L330 70 L332 84 L324 96 L308 103 L288 106 L268 104 L250 100 L232 96 L220 88 L215 74 L216 60Z"
                  fill="#C0D4EC"
                  stroke="#AABDDC"
                  strokeWidth="0.7"
                />
                <path
                  d="M252 108 L272 104 L284 112 L287 128 L282 144 L272 154 L258 158 L246 155 L238 144 L236 130 L240 116Z"
                  fill="#C0D4EC"
                  stroke="#AABDDC"
                  strokeWidth="0.7"
                />
                <path
                  d="M296 145 L330 138 L355 145 L362 160 L356 175 L340 182 L320 183 L304 178 L296 165 L294 153Z"
                  fill="#C0D4EC"
                  stroke="#AABDDC"
                  strokeWidth="0.7"
                />
                <path
                  d="M258 116 Q220 50 182 58"
                  fill="none"
                  stroke="#2E78F0"
                  strokeWidth="2"
                  strokeDasharray="7 3"
                  opacity="0.9"
                >
                  <animate attributeName="stroke-dashoffset" from="0" to="-40" dur="2s" repeatCount="indefinite" />
                </path>
                <circle cx="225" cy="76" r="7" fill="#2E78F0" opacity="0.2" />
                <circle cx="225" cy="76" r="4" fill="#2E78F0" stroke="white" strokeWidth="1.5" />
                <circle cx="258" cy="118" r="4.5" fill="#E8541A" stroke="white" strokeWidth="1.5" />
                <text
                  x="258"
                  y="132"
                  textAnchor="middle"
                  fontSize="7.5"
                  fill="#A03010"
                  fontFamily="Barlow,sans-serif"
                  fontWeight="700"
                >
                  Mumbai
                </text>
                <circle cx="182" cy="58" r="4" fill="#2E78F0" stroke="white" strokeWidth="1.5" />
                <text
                  x="182"
                  y="50"
                  textAnchor="middle"
                  fontSize="7.5"
                  fill="#1045A0"
                  fontFamily="Barlow,sans-serif"
                  fontWeight="700"
                >
                  Hamburg
                </text>
                <rect x="8" y="198" width="160" height="17" rx="4" fill="white" opacity="0.8" />
                <circle cx="18" cy="206" r="3" fill="#2E78F0" />
                <text x="25" y="210" fontSize="7.5" fill="#3D5070" fontFamily="Barlow,sans-serif">
                  Sea route
                </text>
                <circle cx="80" cy="206" r="3" fill="#E8541A" />
                <text x="87" y="210" fontSize="7.5" fill="#3D5070" fontFamily="Barlow,sans-serif">
                  Origin
                </text>
                <circle cx="130" cy="206" r="3" fill="#2E78F0" />
                <text x="137" y="210" fontSize="7.5" fill="#3D5070" fontFamily="Barlow,sans-serif">
                  Vessel
                </text>
              </svg>
              <Box style={{ padding: "10px 18px", display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
                <Box
                  style={{
                    background: "var(--navy)",
                    color: "rgba(255,255,255,.8)",
                    fontSize: "10px",
                    fontWeight: 600,
                    borderRadius: "24px",
                    padding: "4px 12px",
                  }}
                >
                  <Text span size="xs" style={{ color: "#5FA0F8" }}>
                    BL-20240901
                  </Text>{" "}
                  · MSC Gulsun
                </Box>
                <Box
                  style={{
                    background: "var(--navy)",
                    color: "rgba(255,255,255,.8)",
                    fontSize: "10px",
                    fontWeight: 600,
                    borderRadius: "24px",
                    padding: "4px 12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  60% complete
                </Box>
                <Box
                  style={{
                    background: "var(--navy)",
                    color: "rgba(255,255,255,.8)",
                    fontSize: "10px",
                    fontWeight: 600,
                    borderRadius: "24px",
                    padding: "4px 12px",
                  }}
                >
                  ETA:{" "}
                  <Text span size="xs" style={{ color: "#5FA0F8" }}>
                    Apr 23
                  </Text>
                </Box>
              </Box>
            </Box>

            <Box className="card">
              <Box className="card-head">
                <Box className="card-title">Last 15-Min Updates</Box>
                <Text span className="bdg bdg-live">
                  Auto-refresh
                </Text>
              </Box>
              <Box className="al-row">
                <Box className="al-ico i-info">📡</Box>
                <Box className="al-body">
                  <Box className="al-title">BL-20240901 — Position Updated</Box>
                  <Box className="al-sub">48.2°N, 14.5°W · North Atlantic · Speed 18.4kn</Box>
                </Box>
                <Box className="al-time">2m</Box>
              </Box>
              <Box className="al-row">
                <Box className="al-ico i-warn">⚠</Box>
                <Box className="al-body">
                  <Box className="al-title">BL-20240892 — Port Congestion Alert</Box>
                  <Box className="al-sub">Hamburg ETA revised +2 days due to berth wait</Box>
                </Box>
                <Box className="al-time">14m</Box>
              </Box>
              <Box className="al-row">
                <Box className="al-ico i-ok">✓</Box>
                <Box className="al-body">
                  <Box className="al-title">BL-20240900 — Departed Dubai</Box>
                  <Box className="al-sub">Air India Cargo · On schedule · Expected Delhi 18:40</Box>
                </Box>
                <Box className="al-time">1h</Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Modal
        opened={!!selected}
        onClose={closeModal}
        centered
        size="lg"
        overlayProps={{ blur: 3 }}
        title={
          selected ? (
            <Box className="modal-title">
              {selected.bl} — Shipment Detail
            </Box>
          ) : null
        }
      >
        {selected && (
          <>
            {/* Body */}
            <Box className="modal-body">
              {/* Progress */}
              <Box
                style={{
                  marginBottom: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <Text
                  span
                  style={{
                    fontFamily: "var(--font-head)",
                    fontSize: "18px",
                    fontWeight: 800,
                    color: shipProgressColors[selected.status],
                  }}
                >
                  {modalStatusLabel[selected.status]}
                </Text>

                <Box
                  style={{
                    height: "6px",
                    flex: 1,
                    background: "var(--bg2)",
                    borderRadius: "3px",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    style={{
                      height: "100%",
                      width: `${selected.prog}%`,
                      background: shipProgressColors[selected.status],
                      borderRadius: "3px",
                    }}
                  />
                </Box>

                <Text span style={{ fontSize: "12px", fontWeight: 700, color: "var(--txt2)" }}>
                  {selected.prog}%
                </Text>
              </Box>

              {/* Grid */}
              <Box className="modal-grid">
                {[
                  ["Origin", selected.origin],
                  ["Destination", selected.dest],
                  ["Mode", selected.mode],
                  ["Commodity", selected.commodity],
                  ["Weight / CBM", selected.weight],
                  ["HS Code", selected.hs],
                  ["Vessel / Flight", selected.vessel],
                  ["Carrier", selected.carrier],
                  ["ETD", selected.etd],
                  ["ETA", selected.eta],
                ].map(([label, value]) => (
                  <Box className="modal-field" key={label}>
                    <Box className="modal-field-lbl">{label}</Box>
                    <Box className="modal-field-val">{value}</Box>
                  </Box>
                ))}
              </Box>

              {/* Journey */}
              <Box className="journey">
                <Box className="journey-title">Shipment Journey</Box>

                <Box className="journey-steps">
                  {selected.steps.slice(0, selected.step).map((step, i) => (
                    <Box key={`done-${i}`} className="j-step">
                      <Box className="j-dot done" />
                      <Box className="j-label done">{step}</Box>
                    </Box>
                  ))}

                  {selected.step < selected.steps.length && (
                    <Box className="j-step">
                      <Box className="j-dot active" />
                      <Box className="j-label active">
                        {selected.steps[selected.step]}
                      </Box>
                    </Box>
                  )}

                  {selected.steps.slice(selected.step + 1).map((step, i) => (
                    <Box key={`left-${i}`} className="j-step">
                      <Box className="j-dot" />
                      <Box className="j-label">{step}</Box>
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Documents */}
              <Box
                style={{
                  borderTop: "0.5px solid var(--border)",
                  paddingTop: "16px",
                  marginTop: "4px",
                }}
              >
                <Box
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--txt3)",
                    marginBottom: "10px",
                  }}
                >
                  Documents
                </Box>

                {[
                  {
                    icon: "📋",
                    bg: "var(--blue-light)",
                    name: `Bill of Lading — ${selected.bl}`,
                    meta: "Auto-generated by PRIME AI · Validated",
                  },
                  {
                    icon: "🏛",
                    bg: "var(--teal-bg)",
                    name: "Commercial Invoice",
                    meta: `HS ${selected.hs} · Validated by PRIME`,
                  },
                  {
                    icon: "📑",
                    bg: "var(--amber-bg)",
                    name: "Packing List",
                    meta: selected.weight,
                  },
                ].map((doc, i) => (
                  <Box className="doc-row" key={i}>
                    <Box className="doc-ico" style={{ background: doc.bg }}>
                      {doc.icon}
                    </Box>

                    <Box className="doc-info">
                      <Box className="doc-name">{doc.name}</Box>
                      <Box className="doc-meta">{doc.meta}</Box>
                    </Box>

                    <Button className="dl-btn">↓ PDF</Button>
                  </Box>
                ))}
              </Box>

              {/* Actions */}
              <Box style={{ display: "flex", gap: "10px", marginTop: "18px" }}>
                <Button className="btn-primary" style={{ flex: 1 }}>
                  📞 Contact Account Manager
                </Button>

                <Button
                  className="btn-outline"
                  style={{
                    flex: 1,
                    color: "var(--txt)",
                    borderColor: "var(--border)",
                    background: "var(--bg)",
                  }}
                  onClick={closeModal}
                >
                  Close
                </Button>
              </Box>
            </Box>
          </>
        )}
      </Modal>
    </Box>
  );
}
