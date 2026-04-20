"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Select,
  Stack,
  Table,
  Text,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import {
  issueTypeOptions,
  pastServiceRequestRows,
} from "../components/supportData";

const inputStyles = {
  input: {
    width: "100%",
    border: "0.5px solid var(--border)",
    borderRadius: "8px",
    padding: "9px 12px",
    fontFamily: "var(--font)",
    fontSize: "13px",
    outline: "none",
    background: "var(--bg)",
  },
};

const labelStyle = {
  fontSize: "10px",
  fontWeight: 600,
  color: "var(--txt3)",
  textTransform: "uppercase",
  letterSpacing: ".06em",
  display: "block",
  marginBottom: "5px",
};

const sectionLabelStyle = {
  fontSize: "10px",
  fontWeight: 600,
  color: "var(--txt3)",
  textTransform: "uppercase",
  letterSpacing: ".06em",
  marginBottom: "5px",
};

export default function DashboardSettingsPage() {
  const [quoteType, setQuoteType] = useState("fcl");
  const [priority, setPriority] = useState("medium");

  return (
    <Box id="tab-support" className="tab-panel active">
      <Box className="dash">
        <Box className="section-head">
          <Box className="section-title">Support & New Bookings</Box>
        </Box>

        <Box className="g3">
          {/* Request a Quote */}
          <Box className="card">
            <Box className="card-head">
              <Box className="card-title">Request a Quote</Box>
              <Text span className="bdg bdg-ai">
                ⚡ PRIME AI
              </Text>
            </Box>
            <Box
              style={{ display: "flex", flexDirection: "column", gap: "20px", justifyContent: "space-between" }}
            >
              <Stack gap={2}>
                <Box>
                  <Box style={sectionLabelStyle}>Shipment Type</Box>
                  <Box style={{ display: "flex", gap: "6px" }}>
                    <Button
                      type="button"
                      className={`fbtn${quoteType === "fcl" ? " sel" : ""}`}
                      style={{ flex: 1 }}
                      onClick={() => setQuoteType("fcl")}
                    >
                      🚢 Sea FCL
                    </Button>
                    <Button
                      type="button"
                      className={`fbtn${quoteType === "lcl" ? " sel" : ""}`}
                      style={{ flex: 1 }}
                      onClick={() => setQuoteType("lcl")}
                    >
                      🚢 Sea LCL
                    </Button>
                    <Button
                      type="button"
                      className={`fbtn${quoteType === "air" ? " sel" : ""}`}
                      style={{ flex: 1 }}
                      onClick={() => setQuoteType("air")}
                    >
                      ✈️ Air
                    </Button>
                  </Box>
                </Box>
                <Box>
                  <Text component="label" style={labelStyle}>
                    Origin
                  </Text>
                  <TextInput
                    placeholder="e.g. Mumbai, JNPT"
                    styles={inputStyles}
                  />
                </Box>
                <Box>
                  <Text component="label" style={labelStyle}>
                    Destination
                  </Text>
                  <TextInput
                    placeholder="e.g. Hamburg, Germany"
                    styles={inputStyles}
                  />
                </Box>
                <Box
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "8px",
                  }}
                >
                  <Box>
                    <Text component="label" style={labelStyle}>
                      Weight (kg)
                    </Text>
                    <TextInput
                      type="number"
                      placeholder="e.g. 24000"
                      styles={inputStyles}
                    />
                  </Box>
                  <Box>
                    <Text component="label" style={labelStyle}>
                      Commodity
                    </Text>
                    <TextInput
                      placeholder="e.g. Flat steel"
                      styles={inputStyles}
                    />
                  </Box>
                </Box>
                <Box>
                  <Text component="label" style={labelStyle}>
                    Preferred Readiness Date
                  </Text>
                  <TextInput type="date" styles={inputStyles} />
                </Box>
              </Stack>
              <Stack gap={2}>
                <Button
                  type="button"
                  className="btn-primary"
                  style={{ width: "100%", padding: "11px", fontSize: "13px" }}
                >
                  ⚡ Get PRIME AI Quote (under 10s)
                </Button>
                <Box
                  style={{
                    fontSize: "10px",
                    color: "var(--txt3)",
                    textAlign: "center",
                  }}
                >
                  PRIME AI scans 50+ carriers and returns ranked options
                  instantly
                </Box>
              </Stack>
            </Box>
          </Box>

          {/* Raise a Support Ticket */}
          <Box className="card">
            <Box className="card-head">
              <Box className="card-title">Raise a Support Ticket</Box>
              <Text span className="bdg bdg-blue">
                24/7
              </Text>
            </Box>
            <Box
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <Stack gap={2}>
                <Box>
                  <Box style={sectionLabelStyle}>Issue Type</Box>
                  <Select
                    data={issueTypeOptions}
                    defaultValue={issueTypeOptions[0]}
                    styles={{
                      input: {
                        width: "100%",
                        border: "0.5px solid var(--border)",
                        borderRadius: "8px",
                        padding: "9px 12px",
                        fontFamily: "var(--font)",
                        fontSize: "13px",
                        color: "var(--txt)",
                        outline: "none",
                        background: "var(--bg)",
                      },
                    }}
                  />
                </Box>
                <Box>
                  <Text component="label" style={labelStyle}>
                    Related B/L Number (optional)
                  </Text>
                  <TextInput
                    placeholder="e.g. BL-20240901"
                    styles={inputStyles}
                  />
                </Box>
                <Box>
                  <Text component="label" style={labelStyle}>
                    Description
                  </Text>
                  <Textarea
                    minRows={4}
                    placeholder="Describe your issue clearly…"
                    styles={{
                      input: {
                        width: "100%",
                        border: "0.5px solid var(--border)",
                        borderRadius: "8px",
                        padding: "9px 12px",
                        fontFamily: "var(--font)",
                        fontSize: "13px",
                        color: "var(--txt)",
                        outline: "none",
                        background: "var(--bg)",
                        resize: "vertical",
                      },
                    }}
                  />
                </Box>
                <Box>
                  <Text component="label" style={labelStyle}>
                    Priority
                  </Text>
                  <Box style={{ display: "flex", gap: "6px" }}>
                    <Button
                      type="button"
                      className={`fbtn${priority === "low" ? " sel" : ""}`}
                      style={{ flex: 1 }}
                      onClick={() => setPriority("low")}
                    >
                      🟢 Low
                    </Button>
                    <Button
                      type="button"
                      className={`fbtn${priority === "medium" ? " sel" : ""}`}
                      style={{ flex: 1 }}
                      onClick={() => setPriority("medium")}
                    >
                      🟡 Medium
                    </Button>
                    <Button
                      type="button"
                      className={`fbtn${priority === "high" ? " sel" : ""}`}
                      style={{ flex: 1 }}
                      onClick={() => setPriority("high")}
                    >
                      🔴 High
                    </Button>
                  </Box>
                </Box>
              </Stack>
              <Button
                type="button"
                className="btn-primary"
                style={{ width: "100%", padding: "11px" }}
              >
                Submit Ticket
              </Button>
            </Box>
          </Box>

          {/* Dedicated team + Open Tickets */}
          <Box
            style={{ display: "flex", flexDirection: "column", gap: "14px" }}
          >
            <Box className="support-card">
              <Title order={4}>Your Dedicated Team</Title>
              <Text component="p">
                Pentagon Prime support for Tata Steel Ltd.
              </Text>
              <Box className="support-contact">
                <Box className="sc-item">
                  👤{" "}
                  <Box>
                    <strong>Priya Sharma</strong> — Account Manager
                    <br />
                    <Text span style={{ fontSize: "10px", opacity: 0.6 }}>
                      +91 98200 45678 · priya@pentagonprime.com
                    </Text>
                  </Box>
                </Box>
                <Box className="sc-item">
                  👤{" "}
                  <Box>
                    <strong>Rohan Desai</strong> — Ops Coordinator
                    <br />
                    <Text span style={{ fontSize: "10px", opacity: 0.6 }}>
                      +91 98765 12340 · rohan@pentagonprime.com
                    </Text>
                  </Box>
                </Box>
                <Box className="sc-item">
                  📞{" "}
                  <Box>
                    <strong>24/7 Helpdesk</strong>
                    <br />
                    <Text span style={{ fontSize: "10px", opacity: 0.6 }}>
                      +91 22 4080 9999
                    </Text>
                  </Box>
                </Box>
                <Box className="sc-item">
                  💬 <strong>WhatsApp:</strong> +91 98200 45678
                </Box>
              </Box>
            </Box>

            <Box className="card" style={{ flex: 1 }}>
              <Box className="card-head">
                <Box className="card-title">Open Tickets</Box>
                <Text span className="bdg bdg-warn">
                  2 Open
                </Text>
              </Box>
              <Box className="al-row">
                <Box className="al-ico i-warn">🎫</Box>
                <Box className="al-body">
                  <Box className="al-title">TKT-2024-0089 — Customs Delay</Box>
                  <Box className="al-sub">
                    BL-20240888 · New York · Medium priority
                  </Box>
                </Box>
                <Box
                  className="al-time"
                  style={{
                    background: "var(--amber-bg)",
                    color: "var(--amber)",
                    padding: "2px 7px",
                    borderRadius: "10px",
                    fontWeight: 600,
                  }}
                >
                  Open
                </Box>
              </Box>
              <Box className="al-row">
                <Box className="al-ico i-info">🎫</Box>
                <Box className="al-body">
                  <Box className="al-title">TKT-2024-0082 — Rate Query</Box>
                  <Box className="al-sub">
                    Q2 contract rates JNPT–Hamburg · In review
                  </Box>
                </Box>
                <Box
                  className="al-time"
                  style={{
                    background: "var(--blue-light)",
                    color: "var(--blue)",
                    padding: "2px 7px",
                    borderRadius: "10px",
                    fontWeight: 600,
                  }}
                >
                  Review
                </Box>
              </Box>
              <Box
                style={{
                  marginTop: "14px",
                  paddingTop: "14px",
                  borderTop: "0.5px solid var(--border)",
                }}
              >
                <Box
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "var(--txt3)",
                    marginBottom: "6px",
                  }}
                >
                  Rate This Interaction
                </Box>
                <Box
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <Box className="stars">★★★★★</Box>
                  <Text span style={{ fontSize: "11px", color: "var(--txt3)" }}>
                    4.8 / 5.0 &nbsp;·&nbsp; 24 reviews
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box className="card">
          <Box className="card-head">
            <Box className="card-title">Past Service Requests</Box>
            <Text span className="bdg bdg-blue">
              2024
            </Text>
          </Box>
          <Box style={{ overflowX: "auto" }}>
            <Table className="tbl">
              <thead>
                <tr>
                  <th>Ticket No.</th>
                  <th>Type</th>
                  <th>B/L Reference</th>
                  <th>Description</th>
                  <th>Raised</th>
                  <th>Resolved</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {pastServiceRequestRows.map((r) => (
                  <tr key={r.ticket}>
                    <td style={{ color: "var(--blue)", fontWeight: 600 }}>
                      {r.ticket}
                    </td>
                    <td>{r.type}</td>
                    <td>{r.bl}</td>
                    <td>{r.description}</td>
                    <td>{r.raised}</td>
                    <td>{r.resolved}</td>
                    <td>
                      <Text span className="pill p-green">
                        Resolved
                      </Text>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
