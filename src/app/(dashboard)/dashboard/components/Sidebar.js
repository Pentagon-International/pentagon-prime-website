"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Box,
  Burger,
  Drawer,
  Group,
  Stack,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconFileText,
  IconHeadset,
  IconLayoutDashboard,
  IconMapPin,
  IconPackage,
  IconReceipt,
  IconX,
} from "@tabler/icons-react";
import { navLinks } from "./mockData";

function normalizePath(path) {
  if (!path) return "/";
  if (path === "/") return "/";
  return path.replace(/\/+$/, "");
}

const drawerIconMap = {
  "My Dashboard": IconLayoutDashboard,
  "My Shipments": IconPackage,
  "Live Tracking": IconMapPin,
  Documents: IconFileText,
  Invoices: IconReceipt,
  Support: IconHeadset,
};

export default function Sidebar() {
  const pathname = usePathname();
  const currentPath = normalizePath(pathname);
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  return (
    <>
      <Box className="nav-tabs dashboard-nav-desktop">
        {navLinks.map((item) => {
          const itemPath = normalizePath(item.href);
          const isActive =
            itemPath === "/dashboard"
              ? currentPath === "/dashboard"
              : currentPath === itemPath ||
                currentPath.startsWith(itemPath + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-btn${isActive ? " active" : ""}`}
            >
              {item.label}
            </Link>
          );
        })}
      </Box>

      <Burger
        opened={drawerOpened}
        onClick={toggleDrawer}
        aria-label="Toggle dashboard navigation menu"
        className="dashboard-nav-burger"
      />

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        withCloseButton={false}
        padding={0}
        size="80%"
        position="right"
        className="dashboard-nav-drawer"
        styles={{
          content: {
            maxWidth: 300,
            width: "80%",
          },
        }}
      >
        <Box className="dashboard-drawer-head">
          <Box component="span" className="dashboard-drawer-title">
            Menu
          </Box>
          <UnstyledButton
            onClick={closeDrawer}
            aria-label="Close dashboard menu"
          >
            <IconX size={22} stroke={2} color="#374151" />
          </UnstyledButton>
        </Box>

        <Stack gap={6} p={16}>
          {navLinks.map((item) => {
            const itemPath = normalizePath(item.href);
            const Icon = drawerIconMap[item.label];
            const isActive =
              itemPath === "/dashboard"
                ? currentPath === "/dashboard"
                : currentPath === itemPath ||
                  currentPath.startsWith(itemPath + "/");

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`dashboard-drawer-link${isActive ? " active" : ""}`}
                onClick={closeDrawer}
              >
                <Group gap={8} wrap="nowrap">
                  {Icon ? <Icon size={16} stroke={1.8} /> : null}
                  <span>{item.label}</span>
                </Group>
              </Link>
            );
          })}
        </Stack>
      </Drawer>
    </>
  );
}
