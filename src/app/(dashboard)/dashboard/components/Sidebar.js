"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Box } from "@mantine/core";
import { navLinks } from "./mockData";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <Box className="nav-tabs">
      {navLinks.map((item) => {
        const isActive =
          item.href === "/dashboard"
            ? pathname === "/dashboard/" // exact match only
            : pathname === item.href || pathname.startsWith(item.href + "/");

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
  );
}
