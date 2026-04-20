"use client";

import { useMemo, useState } from "react";
import { Box, Button, Table, Text, TextInput } from "@mantine/core";
import {
  allShips,
  filterShipments,
  modalStatusLabel,
  shipProgressColors,
  shipTableStatusPill,
} from "../components/shipmentsData";

const FILTER_TABS = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "transit", label: "In Transit" },
  { id: "delayed", label: "Delayed" },
  { id: "customs", label: "At Customs" },
  { id: "delivered", label: "Delivered" },
  { id: "past", label: "Past (2023)" },
];

export default function DashboardShipmentsPage() {
  const [sFilter, setSFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedBl, setSelectedBl] = useState(null);

  const filtered = useMemo(
    () => filterShipments(allShips, sFilter, search),
    [sFilter, search],
  );

  const selected = useMemo(
    () => (selectedBl ? allShips.find((s) => s.bl === selectedBl) : null),
    [selectedBl],
  );

  const openModal = (bl) => setSelectedBl(bl);
  const closeModal = () => setSelectedBl(null);

  return (
    <Box id="tab-shipments" className="tab-panel active">
      <Box className="dash">
        <Box className="section-head">
          <Box className="section-title">My Shipments — All Time</Box>
        </Box>

        {/* KPIs — same DOM order as pentagon_prime_client_portal.html (tab-shipments) */}
        <Box className="kpi-grid4">
          <Box className="kpi" style={{ "--kc": "var(--blue)", "--ki": "#EBF2FF" }}>
            <Box className="kpi-bar"></Box>
            <Box className="kpi-ico">📦</Box>
            <Box className="kpi-lbl">Total Shipments</Box>
            <Box className="kpi-val">312</Box>
            <Box className="kpi-sub">Since 2018</Box>
          </Box>
          <Box className="kpi" style={{ "--kc": "var(--teal)", "--ki": "var(--teal-bg)" }}>
            <Box className="kpi-bar"></Box>
            <Box className="kpi-ico" style={{ background: "var(--teal-bg)" }}>
              ✅
            </Box>
            <Box className="kpi-lbl">Delivered</Box>
            <Box className="kpi-val">292</Box>
            <Box className="kpi-sub">
              <Text span className="kpi-up">
                93.6%
              </Text>{" "}
              on time
            </Box>
          </Box>
          <Box className="kpi" style={{ "--kc": "var(--blue-mid)", "--ki": "#EBF2FF" }}>
            <Box className="kpi-bar"></Box>
            <Box className="kpi-ico">🚢</Box>
            <Box className="kpi-lbl">Active Now</Box>
            <Box className="kpi-val">14</Box>
            <Box className="kpi-sub">Sea + Air + Multi</Box>
          </Box>
          <Box className="kpi" style={{ "--kc": "var(--amber)", "--ki": "var(--amber-bg)" }}>
            <Box className="kpi-bar"></Box>
            <Box className="kpi-ico" style={{ background: "var(--amber-bg)" }}>
              ⏳
            </Box>
            <Box className="kpi-lbl">Delayed / Issue</Box>
            <Box className="kpi-val">2</Box>
            <Box className="kpi-sub">Action required</Box>
          </Box>
        </Box>

        {/* Filter + Search — single .search-bar row like the HTML sample */}
        <Box className="search-bar">
          <Text span style={{ fontSize: "15px", color: "var(--txt3)" }}>
            🔍
          </Text>
          <TextInput
            id="sh-search"
            variant="unstyled"
            placeholder="Search B/L number, vessel, destination, commodity…"
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
            styles={{
              root: { flex: 1, minWidth: 0 },
              input: { width: "100%" },
            }}
          />
          {FILTER_TABS.map((t) => (
            <Button
              key={t.id}
              type="button"
              className={`fbtn${sFilter === t.id ? " sel" : ""}`}
              onClick={() => setSFilter(t.id)}
            >
              {t.label}
            </Button>
          ))}
        </Box>

        <Box className="card" style={{ padding: 0, overflow: "auto", marginBottom: "16px" }}>
          <Table className="tbl">
            <thead>
              <tr>
                <th>B/L Number</th>
                <th>Origin</th>
                <th>Destination</th>
                <th>Commodity</th>
                <th>Mode</th>
                <th>Weight / CBM</th>
                <th>ETD</th>
                <th>ETA</th>
                <th>Status</th>
                <th>Progress</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody id="sh-tbody">
              {filtered.map((r) => {
                const pill = shipTableStatusPill[r.status];
                const bar = shipProgressColors[r.status];
                return (
                  <tr
                    key={r.bl}
                    title="Click for shipment detail"
                    onClick={() => openModal(r.bl)}
                    style={{ cursor: "pointer" }}
                  >
                    <td style={{ fontWeight: 700, color: "var(--blue)", fontSize: "11px" }}>{r.bl}</td>
                    <td style={{ fontSize: "11px" }}>{r.origin}</td>
                    <td style={{ fontSize: "11px" }}>{r.dest}</td>
                    <td style={{ fontSize: "11px" }}>{r.commodity}</td>
                    <td style={{ whiteSpace: "nowrap", fontSize: "11px" }}>{r.mode}</td>
                    <td style={{ fontSize: "11px", color: "var(--txt3)" }}>{r.weight}</td>
                    <td style={{ color: "var(--txt3)", fontSize: "11px" }}>{r.etd}</td>
                    <td style={{ fontWeight: 600, fontSize: "11px" }}>{r.eta}</td>
                    <td>
                      <Text span className={pill.className}>
                        {pill.label}
                      </Text>
                    </td>
                    <td style={{ minWidth: "72px" }}>
                      <Box
                        style={{
                          height: "4px",
                          background: "var(--bg2)",
                          borderRadius: "2px",
                          overflow: "hidden",
                        }}
                      >
                        <Box
                          style={{
                            height: "100%",
                            width: `${r.prog}%`,
                            background: bar,
                            borderRadius: "2px",
                          }}
                        />
                      </Box>
                      <Box style={{ fontSize: "9px", color: "var(--txt3)", marginTop: "2px" }}>{r.prog}%</Box>
                    </td>
                    <td>
                      <Button
                        type="button"
                        className="dl-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          openModal(r.bl);
                        }}
                      >
                        Details
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Box>

        <Box className="g2">
          <Box className="card">
            <Box className="card-head">
              <Box className="card-title">Shipments Needing Attention</Box>
              <Text span className="bdg bdg-warn">
                Action Required
              </Text>
            </Box>
            <Box className="al-row">
              <Box className="al-ico i-warn">⚠</Box>
              <Box className="al-body">
                <Box className="al-title">BL-20240892 — Hamburg Congestion Delay</Box>
                <Box className="al-sub">FCL 40' · New ETA Apr 14 (was Apr 12) · MSC Gulsun vessel</Box>
              </Box>
              <Box className="al-time">2h</Box>
            </Box>
            <Box className="al-row">
              <Box className="al-ico i-red">🛃</Box>
              <Box className="al-body">
                <Box className="al-title">BL-20240888 — Customs Documentation Required</Box>
                <Box className="al-sub">New York CBP requesting Form 7512 · Please upload via Documents tab</Box>
              </Box>
              <Box className="al-time">5h</Box>
            </Box>
          </Box>
          <Box className="card">
            <Box className="card-head">
              <Box className="card-title">Recently Delivered</Box>
              <Text span className="bdg bdg-live">
                This Month
              </Text>
            </Box>
            <Box className="al-row">
              <Box className="al-ico i-ok">✓</Box>
              <Box className="al-body">
                <Box className="al-title">BL-20240885 · Chennai → Sydney</Box>
                <Box className="al-sub">Delivered Apr 07 · 3 days early · Auto parts · 18T</Box>
              </Box>
              <Box className="al-time">3d</Box>
            </Box>
            <Box className="al-row">
              <Box className="al-ico i-ok">✓</Box>
              <Box className="al-body">
                <Box className="al-title">BL-20240882 · JNPT → Hamburg</Box>
                <Box className="al-sub">Delivered Apr 05 · On schedule · Flat steel · 24T</Box>
              </Box>
              <Box className="al-time">5d</Box>
            </Box>
            <Box className="al-row">
              <Box className="al-ico i-ok">✓</Box>
              <Box className="al-body">
                <Box className="al-title">BL-20240871 · Mumbai → Singapore</Box>
                <Box className="al-sub">Delivered Apr 02 · 1 day early · Wire rods · 12T</Box>
              </Box>
              <Box className="al-time">8d</Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Shipment detail modal — behavior aligned with sample `openModal` / global #modal */}
      <Box id="modal" className={`modal-overlay${selected ? " open" : ""}`} onClick={closeModal}>
        <Box className="modal" onClick={(e) => e.stopPropagation()}>
          {selected && (
            <>
              <Box className="modal-head">
                <Box className="modal-title" id="modal-title">
                  {selected.bl} — Shipment Detail
                </Box>
                <Button type="button" className="modal-close" onClick={closeModal}>
                  ✕
                </Button>
              </Box>
              <Box className="modal-body" id="modal-body">
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

                <Box className="modal-grid">
                  <Box className="modal-field">
                    <Box className="modal-field-lbl">Origin</Box>
                    <Box className="modal-field-val">{selected.origin}</Box>
                  </Box>
                  <Box className="modal-field">
                    <Box className="modal-field-lbl">Destination</Box>
                    <Box className="modal-field-val">{selected.dest}</Box>
                  </Box>
                  <Box className="modal-field">
                    <Box className="modal-field-lbl">Mode</Box>
                    <Box className="modal-field-val">{selected.mode}</Box>
                  </Box>
                  <Box className="modal-field">
                    <Box className="modal-field-lbl">Commodity</Box>
                    <Box className="modal-field-val">{selected.commodity}</Box>
                  </Box>
                  <Box className="modal-field">
                    <Box className="modal-field-lbl">Weight / CBM</Box>
                    <Box className="modal-field-val">{selected.weight}</Box>
                  </Box>
                  <Box className="modal-field">
                    <Box className="modal-field-lbl">HS Code</Box>
                    <Box className="modal-field-val">{selected.hs}</Box>
                  </Box>
                  <Box className="modal-field">
                    <Box className="modal-field-lbl">Vessel / Flight</Box>
                    <Box className="modal-field-val">{selected.vessel}</Box>
                  </Box>
                  <Box className="modal-field">
                    <Box className="modal-field-lbl">Carrier</Box>
                    <Box className="modal-field-val">{selected.carrier}</Box>
                  </Box>
                  <Box className="modal-field">
                    <Box className="modal-field-lbl">ETD</Box>
                    <Box className="modal-field-val">{selected.etd}</Box>
                  </Box>
                  <Box className="modal-field">
                    <Box className="modal-field-lbl">ETA</Box>
                    <Box className="modal-field-val">{selected.eta}</Box>
                  </Box>
                </Box>

                <Box className="journey">
                  <Box className="journey-title">Shipment Journey</Box>
                  <Box className="journey-steps">
                    {selected.steps.slice(0, selected.step).map((step, i) => (
                      <Box key={`done-${i}`} className="j-step">
                        <Box className="j-dot done"></Box>
                        <Box className="j-label done">{step}</Box>
                      </Box>
                    ))}
                    {selected.step < selected.steps.length && (
                      <Box className="j-step">
                        <Box className="j-dot active"></Box>
                        <Box className="j-label active">{selected.steps[selected.step]}</Box>
                      </Box>
                    )}
                    {selected.steps.slice(selected.step + 1).map((step, i) => (
                      <Box key={`left-${i}`} className="j-step">
                        <Box className="j-dot"></Box>
                        <Box className="j-label">{step}</Box>
                      </Box>
                    ))}
                  </Box>
                </Box>

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
                  <Box className="doc-row">
                    <Box className="doc-ico" style={{ background: "var(--blue-light)" }}>
                      📋
                    </Box>
                    <Box className="doc-info">
                      <Box className="doc-name">Bill of Lading — {selected.bl}</Box>
                      <Box className="doc-meta">Auto-generated by PRIME AI · Validated</Box>
                    </Box>
                    <Button type="button" className="dl-btn">
                      ↓ PDF
                    </Button>
                  </Box>
                  <Box className="doc-row">
                    <Box className="doc-ico" style={{ background: "var(--teal-bg)" }}>
                      🏛
                    </Box>
                    <Box className="doc-info">
                      <Box className="doc-name">Commercial Invoice</Box>
                      <Box className="doc-meta">HS {selected.hs} · Validated by PRIME</Box>
                    </Box>
                    <Button type="button" className="dl-btn">
                      ↓ PDF
                    </Button>
                  </Box>
                  <Box className="doc-row">
                    <Box className="doc-ico" style={{ background: "var(--amber-bg)" }}>
                      📑
                    </Box>
                    <Box className="doc-info">
                      <Box className="doc-name">Packing List</Box>
                      <Box className="doc-meta">{selected.weight}</Box>
                    </Box>
                    <Button type="button" className="dl-btn">
                      ↓ PDF
                    </Button>
                  </Box>
                </Box>

                <Box style={{ display: "flex", gap: "10px", marginTop: "18px" }}>
                  <Button type="button" className="btn-primary" style={{ flex: 1 }}>
                    📞 Contact Account Manager
                  </Button>
                  <Button
                    type="button"
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
        </Box>
      </Box>
    </Box>
  );
}
