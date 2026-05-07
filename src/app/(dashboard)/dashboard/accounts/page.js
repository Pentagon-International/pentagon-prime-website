import { Box, Button, Stack, Table, Text } from "@mantine/core";
import {
  paymentHistoryRows,
  pendingInvoiceRows,
  spendByServiceRows,
  statementRows,
} from "../components/invoicesData";

export default function DashboardAccountsPage() {
  return (
    <Box id="tab-invoices" className="tab-panel active">
      <Box className="dash">
        <Box className="section-head">
          <Box className="section-title">My Invoices & Payments</Box>
        </Box>

        <Box className="kpi-grid4">
          <Box className="kpi" style={{ "--kc": "var(--red)", "--ki": "var(--red-bg)" }}>
            <Box className="kpi-bar"></Box>
            <Stack gap={2}>
              <Box className="kpi-ico" style={{ background: "var(--red-bg)" }}>
                💳
              </Box>
              <Box className="kpi-lbl">Outstanding</Box>
              <Box className="kpi-val">
                ₹<Text span component="small">12.4L</Text>
              </Box>
            </Stack>
            <Box className="kpi-sub">3 invoices pending</Box>
          </Box>
          <Box className="kpi" style={{ "--kc": "var(--teal)", "--ki": "var(--teal-bg)" }}>
            <Box className="kpi-bar"></Box>
            <Stack gap={2}>
              <Box className="kpi-ico" style={{ background: "var(--teal-bg)" }}>
                ✅
              </Box>
              <Box className="kpi-lbl">Paid (MTD)</Box>
              <Box className="kpi-val">
                ₹<Text span component="small">16L</Text>
              </Box>
            </Stack>
            <Box className="kpi-sub">4 invoices cleared</Box>
          </Box>
          <Box className="kpi" style={{ "--kc": "var(--amber)", "--ki": "var(--amber-bg)" }}>
            <Box className="kpi-bar"></Box>
            <Stack gap={2}>
              <Box className="kpi-ico" style={{ background: "var(--amber-bg)" }}>
                ⏰
              </Box>
              <Box className="kpi-lbl">Due in 7 Days</Box>
              <Box className="kpi-val">
                ₹<Text span component="small">4.2L</Text>
              </Box>
            </Stack>
            <Box className="kpi-sub">INV-2024-0312</Box>
          </Box>
          <Box className="kpi" style={{ "--kc": "var(--blue)", "--ki": "#EBF2FF" }}>
            <Box className="kpi-bar"></Box>
            <Stack gap={2}>
              <Box className="kpi-ico">📊</Box>
              <Box className="kpi-lbl">Total Paid (YTD)</Box>
              <Box className="kpi-val">
                ₹<Text span component="small">1.8Cr</Text>
              </Box>
            </Stack>
            <Box className="kpi-sub">Since Jan 2024</Box>
          </Box>
        </Box>

        <Box className="section-head" style={{ marginTop: "4px" }}>
          <Box className="section-title">Pending Invoices</Box>
        </Box>
        <Box className="card" style={{ padding: 0, overflow: "auto", marginBottom: "16px" }}>
          <Table className="tbl">
            <thead>
              <tr>
                <th>Invoice No.</th>
                <th>B/L Reference</th>
                <th>Service</th>
                <th>Amount</th>
                <th>Issue Date</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingInvoiceRows.map((r) => (
                <tr key={r.invoice}>
                  <td style={{ fontWeight: 700, color: "var(--blue)", minWidth:"120px" }}>{r.invoice}</td>
                  <td style={{minWidth:"120px"}}>{r.bl}</td>
                  <td style={{minWidth:"180px"}}>{r.service}</td>
                  <td style={{ fontWeight: 700 }}>{r.amount}</td>
                  <td style={{minWidth:"80px"}}>{r.issueDate}</td>
                  <td style={{...r.dueStyle, minWidth:"80px"}}>{r.dueDate}</td>
                  <td style={{minWidth:"120px"}}>
                    <Text span className={r.statusClass}>
                      {r.statusLabel}
                    </Text>
                  </td>
                  <td>
                    <Button type="button" className="dl-btn" style={r.payBtnStyle}>
                      Pay Now
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Box>

        <Box className="g2">
          <Box className="card">
            <Box className="card-head">
              <Box className="card-title">Payment History</Box>
              <Text span className="bdg bdg-blue">
                2024
              </Text>
            </Box>
            <Box style={{ overflowX: "auto" }}>
              <Table className="tbl">
                <thead>
                  <tr>
                    <th>Invoice</th>
                    <th>Service</th>
                    <th>Amount</th>
                    <th>Paid On</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentHistoryRows.map((r) => (
                    <tr key={r.invoice}>
                      <td style={{ color: "var(--blue)", fontWeight: 600, minWidth:"120px" }}>{r.invoice}</td>
                      <td style={{minWidth:"180px"}}>{r.service}</td>
                      <td style={{ fontWeight: 700 }}>{r.amount}</td>
                      <td style={{ minWidth:"80px" }}>{r.paidOn}</td>
                      <td>
                        <Text span className="pill p-green">
                          Paid
                        </Text>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Box>
          </Box>

          <Box style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <Box className="card">
              <Box className="card-head">
                <Box className="card-title">Spend By Service</Box>
                <Text span className="bdg bdg-blue">
                  YTD
                </Text>
              </Box>
              {spendByServiceRows.map((row, i) => (
                <Box key={row.name}>
                  <Box className="lbl-row">
                    <Text span className="lbl-name">
                      {row.name}
                    </Text>
                    <Text span className="lbl-val">
                      {row.val}
                    </Text>
                  </Box>
                  <Box className="bar-bg" style={{ marginBottom: row.barMarginBottom }}>
                    <Box className="bar-fill" style={{ width: row.width, background: row.bg }} />
                  </Box>
                </Box>
              ))}
            </Box>

            <Box className="card" style={{ flex: 1 }}>
              <Box className="card-head">
                <Box className="card-title">Statements</Box>
              </Box>
              {statementRows.map((s) => (
                <Box key={s.name} className="doc-row">
                  <Box className="doc-ico" style={{ background: s.icoBg }}>
                    {s.ico}
                  </Box>
                  <Box className="doc-info">
                    <Box className="doc-name">{s.name}</Box>
                    <Box className="doc-meta">{s.meta}</Box>
                  </Box>
                  <Button type="button" className="dl-btn">
                    ↓ PDF
                  </Button>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
