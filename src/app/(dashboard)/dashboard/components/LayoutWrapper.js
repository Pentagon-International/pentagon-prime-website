import Link from "next/link";
import Images from "@/app/utils/image";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Box, Button, Flex, Group, Image, Text, Title } from "@mantine/core";
import { IconMail, IconPhone, IconUser, IconUserFilled } from "@tabler/icons-react";

export default function LayoutWrapper({ children }) {
  return (
    <Box className="dashboard-app-shell">
      <Box component="nav" className="topnav">
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 5,
            width: "100%",
            padding: "10px 2%",
          }}
        >
          <Link
            href="/"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 5,
            }}
          >
            <Image src={Images.logo_only} alt="Logo" h={48} />
            <Flex
              align="center"
              justify="center"
              style={{
                textDecoration: "none",
                flexDirection: "column",
                alignSelf: "flex-end",
              }}
            >
              <Text
                className="logo-font"
                fs="italic"
                fz={22}
                fw={700}
                tw="balance"
                c="#326b7d"
              >
                Pentagon Prime
              </Text>
              <Text
                size="xs"
                fw={500}
                c="rgb(0, 33, 95)"
                style={{ alignSelf: "flex-start" }}
              >
                Logistics.Automated
              </Text>
            </Flex>
          </Link>
          <Sidebar />
          <Topbar />
        </Box>
      </Box>
      <Box className="dashboard-scroll-region">
        <Box className="welcome-bar">
          <Box className="welcome-inner">
            <Box className="welcome-left">
              <Title order={2}>
                Welcome back, <span>Tata Steel Ltd.</span> 👋
              </Title>
              <Group spacing={2} mt={4} gap={4} justify="flex-start">
                <IconUserFilled size={16} color="#5FA0F8" />
                <Text>Account Manager - Priya Sharma</Text>
              </Group>
              <Group justify="between" mt={2} align="flex-start">
                <Group spacing={2} gap={4} justify="flex-start">
                  <IconMail size={16} color="#fff" />
                  <Text>priya.sharma@pentagonprime.com</Text>
                </Group>
                <Group spacing={2} gap={4} justify="flex-start">
                  <IconPhone size={16} color="#fff" />
                  <Text>+91 98200 45678</Text>
                </Group>
              </Group>
            </Box>
            <Box className="welcome-stats">
              <Box className="ws">
                <Box className="ws-val" id="ws-active">
                  14
                </Box>
                <Box className="ws-lbl">Active Shipments</Box>
              </Box>
              <Box className="ws-div" />
              <Box className="ws">
                <Box className="ws-val">2</Box>
                <Box className="ws-lbl">Need Attention</Box>
              </Box>
              <Box className="ws-div" />
              <Box className="ws">
                <Box className="ws-val">3</Box>
                <Box className="ws-lbl">Pending Invoices</Box>
              </Box>
              <Box className="ws-div" />
              <Box className="ws">
                <Box className="ws-val">₹12.4L</Box>
                <Box className="ws-lbl">Outstanding</Box>
              </Box>
            </Box>
            <Box style={{ display: "flex", gap: "10px" }}>
              <Button component={Link} className="btn-outline" href={"/dashboard/tracking"}>
                Track Shipment
              </Button>
              <Button component={Link} className="btn-primary" href={"/dashboard/settings"}>
                Get Quote
              </Button>
            </Box>
          </Box>
        </Box>
        <Box>{children}</Box>
      </Box>
      <Box className="dash-footer">
        <span>
          © 2026 Pentagon Prime · Client Portal · Tata Steel Ltd. · Data secure
          &amp; encrypted · Support: +91 22 4080 9999
        </span>
        <Box className="cert-strip">
          <Text className="cert">ISO</Text>
          <Text className="cert">AEO</Text>
          <Text className="cert">IATA</Text>
          <Text className="cert">FIATA</Text>
          <Text className="cert">Lognet</Text>
          <Text className="cert">MTO</Text>
        </Box>
      </Box>
    </Box>
  );
}
