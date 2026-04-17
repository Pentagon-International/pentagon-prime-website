"use client";

import { AppShell, Burger, Group, NavLink, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { usePathname } from "next/navigation";

const dashboardLinks = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/jobs", label: "Jobs" },
  { href: "/dashboard/shipments", label: "Shipments" },
  { href: "/dashboard/accounts", label: "Accounts" },
  { href: "/dashboard/tracking", label: "Tracking" },
  { href: "/dashboard/settings", label: "Settings" },
];

export default function DashboardLayout({ children }) {
  const [opened, { toggle }] = useDisclosure();
  const pathname = usePathname();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 260, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Text fw={700}>Dashboard</Text>
          </Group>
          <Text size="sm" c="dimmed">Pentagon Prime</Text>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="sm">
        {dashboardLinks.map((item) => (
          <NavLink
            key={item.href}
            component={Link}
            href={item.href}
            label={item.label}
            active={pathname === item.href}
          />
        ))}
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
