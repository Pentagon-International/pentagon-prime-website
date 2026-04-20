"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Box, Button, Stack, Table, Text, Title } from "@mantine/core";
import {
  overviewActiveShipments,
  spendChartColumns,
  statusPillMap,
  progressColorMap,
} from "./components/overviewData";

function getLastUpdatedText() {
  const d = new Date();
  return `${d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" })} · ${d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}`;
}

export default function DashboardPage() {
  const [lastUpdated, setLastUpdated] = useState("—");

  useEffect(() => {
    setLastUpdated(getLastUpdatedText());
    const id = setInterval(() => setLastUpdated(getLastUpdatedText()), 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <Box id="tab-overview" className="tab-panel active">
      <Box className="dash">
        <Box className="section-head">
          <Box className="section-title">My Shipment Summary</Box>
          <Box style={{ fontSize: "12px", color: "var(--txt3)" }}>
            Last updated:{" "}
            <Text span id="last-updated" fw={500} c="var(--txt)" size={"xs"}>
              {lastUpdated}
            </Text>
          </Box>
        </Box>

        <Box className="kpi-grid5">
          <Box
            className="kpi"
            style={{ "--kc": "var(--blue)", "--ki": "#EBF2FF" }}
          >
            <Box className="kpi-bar"></Box>
            <Stack gap={2}>
              <Box className="kpi-ico">🚢</Box>
              <Box className="kpi-lbl">Active Shipments</Box>
              <Box className="kpi-val">14</Box>
            </Stack>
            <Box className="kpi-sub">
              <Text span className="kpi-up" c={"var(--blue)"}>
                ↑3
              </Text>{" "}
              from last month
            </Box>
          </Box>
          <Box
            className="kpi"
            style={{ "--kc": "var(--teal)", "--ki": "var(--teal-bg)" }}
          >
            <Box className="kpi-bar"></Box>
            <Stack gap={2}>
              <Box className="kpi-ico" style={{ background: "var(--teal-bg)" }}>
                ✅
              </Box>
              <Box className="kpi-lbl">Delivered (MTD)</Box>
              <Box className="kpi-val">8</Box>
            </Stack>
            <Box className="kpi-sub">
              <Text span className="kpi-up">
                100%
              </Text>{" "}
              on time
            </Box>
          </Box>
          <Box
            className="kpi"
            style={{ "--kc": "var(--amber)", "--ki": "var(--amber-bg)" }}
          >
            <Box className="kpi-bar"></Box>
            <Stack gap={2}>
              <Box
                className="kpi-ico"
                style={{ background: "var(--amber-bg)" }}
              >
                ⚠️
              </Box>
              <Box className="kpi-lbl">Need Attention</Box>
              <Box className="kpi-val">2</Box>
            </Stack>
            <Box className="kpi-sub">Delay + Customs</Box>
          </Box>
          <Box
            className="kpi"
            style={{ "--kc": "var(--accent)", "--ki": "var(--accent-soft)" }}
          >
            <Box className="kpi-bar"></Box>
            <Stack gap={2}>
              <Box
                className="kpi-ico"
                style={{ background: "var(--accent-soft)" }}
              >
                💰
              </Box>
              <Box className="kpi-lbl">Freight Spend (MTD)</Box>
              <Box className="kpi-val">
                ₹{" "}
                <Text span size="sm" fw={600}>
                  28.4L
                </Text>
              </Box>
            </Stack>
            <Box className="kpi-sub">
              <Text span className="kpi-up" c={"var(--accent)"}>
                ↑8%
              </Text>{" "}
              vs last month
            </Box>
          </Box>
          <Box
            className="kpi"
            style={{ "--kc": "var(--purple)", "--ki": "var(--purple-bg)" }}
          >
            <Box className="kpi-bar"></Box>
            <Stack gap={2}>
              <Box
                className="kpi-ico"
                style={{ background: "var(--purple-bg)" }}
              >
                📄
              </Box>
              <Box className="kpi-lbl">Pending Invoices</Box>
              <Box className="kpi-val">3</Box>
            </Stack>
            <Box className="kpi-sub">
              <Text span className="kpi-up" c={"var(--purple)"}>
                ₹12.4L
              </Text>{" "}
              outstanding
            </Box>
          </Box>
        </Box>

        <Box className="g2-1">
          <Box className="card">
            <Box className="card-head">
              <Box className="card-title">My Active Shipments</Box>
              <Text span className="bdg bdg-live">
                ● Live
              </Text>
            </Box>
            <Box style={{ overflowX: "auto" }}>
              <Table className="tbl" id="ov-table">
                <thead>
                  <tr>
                    <th>B/L No.</th>
                    <th>Route</th>
                    <th>Mode</th>
                    <th>ETA</th>
                    <th>Status</th>
                    <th>Progress</th>
                  </tr>
                </thead>
                <tbody id="ov-tbody">
                  {overviewActiveShipments.map((r) => {
                    const pill = statusPillMap[r.status];
                    const bar = progressColorMap[r.status];
                    return (
                      <tr key={r.bl} title="Click for details">
                        <td
                          style={{
                            fontWeight: 700,
                            color: "var(--blue)",
                            fontSize: "11px",
                          }}
                        >
                          {r.bl}
                        </td>
                        <td style={{ fontSize: "11px" }}>
                          {r.origin} → {r.dest}
                        </td>
                        <td style={{ whiteSpace: "nowrap", fontSize: "11px" }}>
                          {r.mode}
                        </td>
                        <td style={{ fontWeight: 600, fontSize: "11px" }}>
                          {r.eta}
                        </td>
                        <td>
                          <Text span className={pill.className}>
                            {pill.label}
                          </Text>
                        </td>
                        <td style={{ minWidth: "80px" }}>
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
                          <Box
                            style={{
                              fontSize: "9px",
                              color: "var(--txt3)",
                              marginTop: "2px",
                            }}
                          >
                            {r.prog}%
                          </Box>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Box>
            <Box style={{ marginTop: "12px", textAlign: "right" }}>
              <Button
                component={Link}
                href="/dashboard/shipments"
                className="fbtn sel"
              >
                View All Shipments →
              </Button>
            </Box>
          </Box>

          <Box
            style={{ display: "flex", flexDirection: "column", gap: "14px" }}
          >
            <Box className="card">
              <Box className="card-head">
                <Box className="card-title">Alerts For You</Box>
                <Text span className="bdg bdg-warn">
                  2 Actions
                </Text>
              </Box>
              <Box className="al-row">
                <Box className="al-ico i-warn">⚠</Box>
                <Box className="al-body">
                  <Box className="al-title">BL-20240892 — Delayed</Box>
                  <Box className="al-sub">
                    Hamburg congestion · New ETA: Apr 14 (+2 days)
                  </Box>
                </Box>
                <Box className="al-time">2h</Box>
              </Box>
              <Box className="al-row">
                <Box className="al-ico i-red">🛃</Box>
                <Box className="al-body">
                  <Box className="al-title">BL-20240888 — Customs Hold</Box>
                  <Box className="al-sub">
                    Additional docs required at New York
                  </Box>
                </Box>
                <Box className="al-time">5h</Box>
              </Box>
              <Box className="al-row">
                <Box className="al-ico i-ok">✓</Box>
                <Box className="al-body">
                  <Box className="al-title">BL-20240885 — Delivered</Box>
                  <Box className="al-sub">Chennai → Sydney · 3 days early</Box>
                </Box>
                <Box className="al-time">1d</Box>
              </Box>
              <Box className="al-row">
                <Box className="al-ico i-info">📄</Box>
                <Box className="al-body">
                  <Box className="al-title">Invoice #INV-2024-0312 Due</Box>
                  <Box className="al-sub">₹4.2L due in 5 days</Box>
                </Box>
                <Box className="al-time">1d</Box>
              </Box>
            </Box>

            <Box className="card">
              <Box className="card-head">
                <Box className="card-title">Quick Actions</Box>
              </Box>
              <Box className="qa-grid">
                <Link
                  href="/dashboard/tracking"
                  className="qa-btn"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Box
                    className="qa-ico"
                    style={{ background: "var(--blue-light)" }}
                  >
                    🔍
                  </Box>
                  <Box>
                    <Box className="qa-lbl">Track Shipment</Box>
                    <Box className="qa-sub">Enter B/L number</Box>
                  </Box>
                </Link>
                <Link
                  href="/dashboard/jobs"
                  className="qa-btn"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Box
                    className="qa-ico"
                    style={{ background: "var(--teal-bg)" }}
                  >
                    📁
                  </Box>
                  <Box>
                    <Box className="qa-lbl">My Documents</Box>
                    <Box className="qa-sub">BLs, certificates</Box>
                  </Box>
                </Link>
                <Link
                  href="/dashboard/accounts"
                  className="qa-btn"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Box
                    className="qa-ico"
                    style={{ background: "var(--accent-soft)" }}
                  >
                    💳
                  </Box>
                  <Box>
                    <Box className="qa-lbl">Pay Invoice</Box>
                    <Box className="qa-sub">3 pending</Box>
                  </Box>
                </Link>
                <Link
                  href="/dashboard/settings"
                  className="qa-btn"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Box
                    className="qa-ico"
                    style={{ background: "var(--purple-bg)" }}
                  >
                    💬
                  </Box>
                  <Box>
                    <Box className="qa-lbl">Get a Quote</Box>
                    <Box className="qa-sub">New booking</Box>
                  </Box>
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box className="g3-w">
          <Box className="card">
            <Box className="card-head">
              <Box className="card-title">My Monthly Freight Spend</Box>
              <Text span className="bdg bdg-blue">
                ₹ Lakhs
              </Text>
            </Box>
            <Box className="spend-bars" id="spend-chart">
              {spendChartColumns.map((col) => (
                <Box
                  key={col.month}
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "3px",
                  }}
                >
                  <Box
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      gap: "1px",
                      height: "108px",
                    }}
                  >
                    <Box
                      style={{
                        borderRadius: "2px 2px 0 0",
                        background: "var(--teal)",
                        height: `${col.mh}px`,
                      }}
                    />
                    <Box
                      style={{
                        background: "var(--accent)",
                        height: `${col.ah}px`,
                      }}
                    />
                    <Box
                      style={{
                        background: "var(--blue-mid)",
                        height: `${col.sh}px`,
                      }}
                    />
                  </Box>
                  <Box style={{ fontSize: "8px", color: "var(--txt3)" }}>
                    {col.month}
                  </Box>
                </Box>
              ))}
            </Box>
            <Box style={{ display: "flex", gap: "14px", marginTop: "4px" }}>
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  fontSize: "10px",
                  color: "var(--txt2)",
                }}
              >
                <Box
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "2px",
                    background: "var(--blue-mid)",
                  }}
                />
                Sea
              </Box>
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  fontSize: "10px",
                  color: "var(--txt2)",
                }}
              >
                <Box
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "2px",
                    background: "var(--accent)",
                  }}
                />
                Air
              </Box>
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  fontSize: "10px",
                  color: "var(--txt2)",
                }}
              >
                <Box
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "2px",
                    background: "var(--teal)",
                  }}
                />
                Multimodal
              </Box>
            </Box>
          </Box>

          <Box className="card">
            <Box className="card-head">
              <Box className="card-title">My Top Routes</Box>
              <Text span className="bdg bdg-blue">
                Lifetime
              </Text>
            </Box>
            <Box>
              <Box className="lbl-row">
                <Text span className="lbl-name">
                  🚢 Mumbai → Hamburg
                </Text>
                <Text span className="lbl-val">
                  84 shipments
                </Text>
              </Box>
              <Box className="bar-bg">
                <Box
                  className="bar-fill"
                  style={{ width: "90%", background: "var(--blue-mid)" }}
                />
              </Box>
              <Box className="lbl-row">
                <Text span className="lbl-name">
                  ✈️ Delhi → Dubai
                </Text>
                <Text span className="lbl-val">
                  62 shipments
                </Text>
              </Box>
              <Box className="bar-bg">
                <Box
                  className="bar-fill"
                  style={{ width: "68%", background: "var(--accent)" }}
                />
              </Box>
              <Box className="lbl-row">
                <Text span className="lbl-name">
                  🚢 JNPT → Los Angeles
                </Text>
                <Text span className="lbl-val">
                  48 shipments
                </Text>
              </Box>
              <Box className="bar-bg">
                <Box
                  className="bar-fill"
                  style={{ width: "52%", background: "var(--blue-mid)" }}
                />
              </Box>
              <Box className="lbl-row">
                <Text span className="lbl-name">
                  🚢 Chennai → Singapore
                </Text>
                <Text span className="lbl-val">
                  31 shipments
                </Text>
              </Box>
              <Box className="bar-bg" style={{ marginBottom: 0 }}>
                <Box
                  className="bar-fill"
                  style={{ width: "34%", background: "var(--teal)" }}
                />
              </Box>
            </Box>
          </Box>

          <Box
            style={{ display: "flex", flexDirection: "column", gap: "14px" }}
          >
            <Box className="card">
              <Box className="card-head">
                <Box className="card-title">My CO₂ Footprint</Box>
                <Text span className="bdg bdg-eco">
                  Green
                </Text>
              </Box>
              <Box
                style={{ display: "flex", alignItems: "center", gap: "16px" }}
              >
                <svg width="68" height="68" viewBox="0 0 68 68" aria-hidden>
                  <circle
                    cx="34"
                    cy="34"
                    r="26"
                    fill="none"
                    stroke="#E5F5F0"
                    strokeWidth="8"
                  />
                  <circle
                    cx="34"
                    cy="34"
                    r="26"
                    fill="none"
                    stroke="#0E8A6E"
                    strokeWidth="8"
                    strokeDasharray="163.4"
                    strokeDashoffset="114.4"
                    strokeLinecap="round"
                    transform="rotate(-90 34 34)"
                  />
                  <text
                    x="34"
                    y="32"
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="800"
                    fill="#0A1628"
                    fontFamily="Barlow Condensed,sans-serif"
                  >
                    30%
                  </text>
                  <text
                    x="34"
                    y="44"
                    textAnchor="middle"
                    fontSize="7"
                    fill="#7A8EA8"
                    fontFamily="Barlow,sans-serif"
                  >
                    vs sea-only
                  </text>
                </svg>
                <Box>
                  <Box
                    style={{
                      fontSize: "10px",
                      color: "var(--txt3)",
                      textTransform: "uppercase",
                      letterSpacing: ".06em",
                      marginBottom: "3px",
                    }}
                  >
                    CO₂ This Month
                  </Box>
                  <Box
                    style={{
                      fontFamily: "var(--font-head)",
                      fontSize: "22px",
                      fontWeight: 800,
                      color: "var(--txt)",
                    }}
                  >
                    12.8
                    <Text span style={{ fontSize: "13px", opacity: 0.5 }}>
                      {" "}
                      T
                    </Text>
                  </Box>
                  <Box
                    style={{
                      fontSize: "11px",
                      color: "var(--teal)",
                      fontWeight: 600,
                      marginTop: "4px",
                    }}
                  >
                    ↓ 2.1T vs last month
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box className="support-card" style={{ flex: 1 }}>
              <Title order={4}>Your Account Manager</Title>
              <Text component="p">Dedicated support for Tata Steel Ltd.</Text>
              <Box className="support-contact">
                <Box className="sc-item">
                  👤 <strong>Priya Sharma</strong>
                </Box>
                <Box className="sc-item">
                  📞 <strong>+91 98200 45678</strong>
                </Box>
                <Box className="sc-item">
                  ✉️ <strong>priya@pentagonprime.com</strong>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
