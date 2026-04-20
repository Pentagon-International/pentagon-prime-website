"use client";

import { useState } from "react";
import { Box, Button, Stack, Text, TextInput } from "@mantine/core";
import {
  DOCUMENT_FILTER_CHIPS,
  pastDocumentRows,
  recentDocumentRows,
} from "../components/documentsData";

function DocRow({ ico, icoBg, name, meta, metaStyle, size, action, actionStyle }) {
  return (
    <Box className="doc-row">
      <Box className="doc-ico" style={{ background: icoBg }}>
        {ico}
      </Box>
      <Box className="doc-info">
        <Box className="doc-name">{name}</Box>
        <Box className="doc-meta" style={metaStyle}>
          {meta}
        </Box>
      </Box>
      <Box className="doc-size">{size}</Box>
      <Button type="button" className="dl-btn" style={actionStyle}>
        {action}
      </Button>
    </Box>
  );
}

export default function DashboardJobsPage() {
  const [docFilter, setDocFilter] = useState("all");

  return (
    <Box id="tab-documents" className="tab-panel active">
      <Box className="dash">
        <Box className="section-head">
          <Box className="section-title">My Documents</Box>
          <Text span className="bdg bdg-blue" style={{ fontSize: "10px", fontWeight: 700, padding: "3px 9px", borderRadius: "20px" }}>
            24 Files
          </Text>
        </Box>

        <Box className="kpi-grid4">
          <Box className="kpi" style={{ "--kc": "var(--blue)", "--ki": "#EBF2FF" }}>
            <Box className="kpi-bar"></Box>
            <Stack gap={2}>
              <Box className="kpi-ico">📋</Box>
              <Box className="kpi-lbl">Bills of Lading</Box>
              <Box className="kpi-val">14</Box>
            </Stack>
            <Box className="kpi-sub">All shipments</Box>
          </Box>
          <Box className="kpi" style={{ "--kc": "var(--teal)", "--ki": "var(--teal-bg)" }}>
            <Box className="kpi-bar"></Box>
            <Stack gap={2}>
              <Box className="kpi-ico" style={{ background: "var(--teal-bg)" }}>
                🏛
              </Box>
              <Box className="kpi-lbl">Customs Docs</Box>
              <Box className="kpi-val">8</Box>
            </Stack>
            <Box className="kpi-sub">Clearance certs</Box>
          </Box>
          <Box className="kpi" style={{ "--kc": "var(--amber)", "--ki": "var(--amber-bg)" }}>
            <Box className="kpi-bar"></Box>
            <Stack gap={2}>
              <Box className="kpi-ico" style={{ background: "var(--amber-bg)" }}>
                📑
              </Box>
              <Box className="kpi-lbl">Packing Lists</Box>
              <Box className="kpi-val">12</Box>
            </Stack>
            <Box className="kpi-sub">All shipments</Box>
          </Box>
          <Box className="kpi" style={{ "--kc": "var(--accent)", "--ki": "var(--accent-soft)" }}>
            <Box className="kpi-bar"></Box>
            <Stack gap={2}>
              <Box className="kpi-ico" style={{ background: "var(--accent-soft)" }}>
                ⚠️
              </Box>
              <Box className="kpi-lbl">Action Required</Box>
              <Box className="kpi-val">1</Box>
            </Stack>
            <Box className="kpi-sub">Upload requested</Box>
          </Box>
        </Box>

        <Box
          style={{
            background: "var(--red-bg)",
            border: "0.5px solid #F0B8B0",
            borderRadius: "var(--radius-sm)",
            padding: "12px 16px",
            marginBottom: "16px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <Text span style={{ fontSize: "18px" }}>
            🔴
          </Text>
          <Box style={{ flex: 1 }}>
            <Box style={{ fontSize: "13px", fontWeight: 600, color: "var(--red)" }}>Document Upload Required — BL-20240888</Box>
            <Box style={{ fontSize: "11px", color: "var(--txt3)", marginTop: "2px" }}>
              CBP New York is requesting Form 7512 (In-Bond Entry). Please upload to prevent further customs delay.
            </Box>
          </Box>
          <Button type="button" className="btn-primary" style={{ fontSize: "11px", padding: "7px 14px" }}>
            Upload Now
          </Button>
        </Box>

        <Box className="search-bar">
          <Text span style={{ fontSize: "15px", color: "var(--txt3)" }}>
            🔍
          </Text>
          <TextInput
            variant="unstyled"
            placeholder="Search documents by name, B/L number, type…"
            styles={{
              root: { flex: 1, minWidth: 0 },
              input: { width: "100%" },
            }}
          />
          {DOCUMENT_FILTER_CHIPS.map((c) => (
            <Button
              key={c.id}
              type="button"
              className={`fbtn${docFilter === c.id ? " sel" : ""}`}
              onClick={() => setDocFilter(c.id)}
            >
              {c.label}
            </Button>
          ))}
        </Box>

        <Box className="g2">
          <Box className="card">
            <Box className="card-head">
              <Box className="card-title">Recent Documents</Box>
              <Text span className="bdg bdg-blue">
                Active Shipments
              </Text>
            </Box>
            {recentDocumentRows.map((row) => (
              <DocRow
                key={row.name}
                ico={row.ico}
                icoBg={row.icoBg}
                name={row.name}
                meta={row.meta}
                metaStyle={row.metaStyle}
                size={row.size}
                action={row.action}
                actionStyle={row.actionStyle}
              />
            ))}
          </Box>

          <Box className="card">
            <Box className="card-head">
              <Box className="card-title">Past Documents (2023–2024)</Box>
              <Text span className="bdg bdg-blue">
                Archive
              </Text>
            </Box>
            {pastDocumentRows.map((row) => (
              <DocRow
                key={row.name}
                ico={row.ico}
                icoBg={row.icoBg}
                name={row.name}
                meta={row.meta}
                size={row.size}
                action={row.action}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
