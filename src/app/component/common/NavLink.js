"use client";
import { COLORS } from "@/app/utils/COLORS";
import { TYPOGRAPHY } from "@/app/utils/TYPOGRAPHY";
import {
  Anchor,
  Divider,
  Group,
  HoverCard,
  HoverCardDropdown,
  HoverCardTarget,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconArrowDown,
  IconBook,
  IconBox,
  IconBuildingWarehouse,
  IconCaretDownFilled,
  IconCaretUpFilled,
  IconChartPie3,
  IconChevronDown,
  IconChevronUp,
  IconClipboard,
  IconCoin,
  IconCrane,
  IconFingerprint,
  IconListCheck,
  IconMapPin2,
  IconNews,
  IconNotification,
  IconPackage,
  IconPackageExport,
  IconPackages,
  IconPlane,
  IconPlaneArrival,
  IconPresentationAnalytics,
  IconSettings,
  IconShip,
  IconSpeakerphone,
  IconSpeedboat,
  IconTool,
  IconTruck,
  IconWorldDollar,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, memo, useMemo, useCallback } from "react";
import { useLoading } from "./LoadingContext";

export const featuresMap = {
  Products: [
    {
      icon: IconPlaneArrival,
      title: "API Access",
    },
    {
      icon: IconCoin,
      title: "Pricing",
    },
  ],
  Solutions: [
    {
      icon: IconPlaneArrival,
      title: "Air Intelligence",
      link: "/service/air-freight-forwarding",
    },
    {
      icon: IconShip,
      title: "Ocean Intelligence",
      link: "/service/sea-freight-forwarding",
    },
    {
      icon: IconTruck,
      title: "Multimodal Transport",
      link: "/service/multimodal-transport",
    },
    {
      icon: IconCrane,
      title: "ODC Project Cargo",
      link: "/service/odc-project-cargo",
    },
    {
      icon: IconWorldDollar,
      title: "Cross Country Trade",
      link: "/service/cross-country-trade",
    },
    {
      icon: IconPackages,
      title: "Consolidation Services",
      link: "/service/consolidation-services",
    },
    {
      icon: IconListCheck,
      title: "Value Added Services",
      link: "/service/value-added-services",
    },
    {
      icon: IconClipboard,
      title: "Custom Clearance",
      link: "/service/customs-clearance",
    },
    {
      icon: IconPackageExport,
      title: "Break Bulk Cargo Services",
      link: "/service/break-bulk-cargo",
    },
    {
      icon: IconBuildingWarehouse,
      title: "Warehousing and Storage",
      link: "/service/warehousing-and-distribution",
    },
    {
      icon: IconPresentationAnalytics,
      title: "Exhibition Cargo",
      link: "/service/exhibition-cargo",
    },
    {
      icon: IconSpeedboat,
      title: "Chartering and Coastal Movements",
      link: "/service/chartering-and-coastal-movements",
    },
    {
      icon: IconMapPin2,
      title: "First and Last-Mile Delivery",
      link: "/service/first-and-last-mile-delivery",
    },
  ],
  Resources: [
    {
      icon: IconNews,
      title: "Blogs",
      link: '/blog'
    },
    {
      icon: IconTool,
      title: "Tools",
      link: '/tools'
    },
    // {
    //   icon: IconSpeakerphone,
    //   title: "Announcements",
    //   link: '/news'
    // },
    {
      icon: IconPackage,
      title: "Inco Terms",
      link: '/inco-terms'
    }, 
    {
      icon: IconBox,
      title: "Shipping Terms",
      link: '/shipping-terms'
    },
     {
      icon: IconShip,
      title: "Shipping Lines",
      link: '/shipping-lines'
    },
    // {
    //   icon: IconPlane,
    //   title: "Air lines",
    //   link: '/air-lines'
    // },
  ],
  Company: [
    {
      icon: IconBook,
      title: "About Us",
      description: "Learn more about our mission and team",
    },
    {
      icon: IconFingerprint,
      title: "Careers",
      description: "Join our growing company",
    },
  ],
};

const FeatureItem = memo(({ feature }) => {
  const { startLoading } = useLoading();
  const router = useRouter();

  const handleClick = useCallback((e) => {
    if (feature.link) {
      e.preventDefault();
      startLoading();
      router.push(feature.link);
    } else {
      startLoading();
    }
  }, [startLoading, router, feature.link]);

  const handleMouseEnter = useCallback((e) => {
    e.currentTarget.style.backgroundColor = "#F5F5F5";
  }, []);

  const handleMouseLeave = useCallback((e) => {
    e.currentTarget.style.backgroundColor = "transparent";
  }, []);

  return (
    <UnstyledButton
      component={Link}
      href={feature.link}
      onClick={handleClick}
      style={{
        display: "block",
        width: "100%",
        padding: "6px 10px",
        borderRadius: "4px",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Group wrap="nowrap" gap={8} align="center">
        <ThemeIcon
          size={22}
          variant="light"
          radius="sm"
          style={{
            backgroundColor: '#F8F9FA',
            border: `1px solid ${COLORS.secondaryColor}15`
          }}
        >
          <feature.icon
            size={16}
            stroke={1.5}
            color={COLORS.secondaryColor}
            style={{ opacity: 0.9 }}
          />
        </ThemeIcon>

        <Text
          fw={500}
          c={COLORS.secondaryColor}
          style={{
            letterSpacing: '0.1px',
            lineHeight: 1.2,
            fontSize: TYPOGRAPHY.body.small,
            textDecoration: 'none',
          }}
        >
          {feature.title}
        </Text>
      </Group>
    </UnstyledButton>
  );
});

export const NavLink = memo(({ item }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [isHovered, setIsHovered] = useState(false);
  const { startLoading } = useLoading();
  const router = useRouter();
  const activeColor = "rgb(0, 33, 95)";
  const pathname = usePathname();

  // Define groups clearly
  const solutionsPaths = useMemo(() => ['/service'], []);
  const resourcesPaths = useMemo(() => [
    '/blog/',
    '/tools/',
    '/inco-terms/',
    '/shipping-terms/',
    '/shipping-lines/',
  ], []);

  const isHome = useMemo(() => pathname === '/', [pathname]);
  const isSolutions = useMemo(() => pathname.startsWith('/service/'), [pathname]);
  const isResources = useMemo(() => resourcesPaths.includes(pathname), [pathname, resourcesPaths]);
  const isAbout = useMemo(() => pathname.startsWith('/about'), [pathname]);
  const isGallery = useMemo(() => pathname.startsWith('/gallery'), [pathname]);

  // Now map menu item → active logic
  const isActive = useMemo(() =>
    (item.label === 'Home' && isHome) ||
    (item.label === 'Solutions' && isSolutions) ||
    (item.label === 'Resources' && isResources) ||
    (item.label === 'Cargo Showcase' && isGallery) ||
    (item.label === 'About Us' && isAbout),
    [item.label, isHome, isSolutions, isResources, isGallery, isAbout]
  );

  const linkStyles = useMemo(() => ({
    display: "flex",
    alignItems: "center",
    gap: 5,
    textDecoration: "none",
    fontSize: TYPOGRAPHY.body.normal,
    fontWeight: 900,
    padding: "8px 16px",
    borderRadius: "20px",
    backgroundColor: isActive ? activeColor : "transparent",
    transition: "all 0.2s ease",
  }), [isActive, activeColor]);

  const textColor = useMemo(() => {
    if (isActive) return "white";
    if (isHovered) return activeColor;
    return COLORS.secondaryColor;
  }, [isActive, isHovered, activeColor]);

  const iconColor = useMemo(() => {
    if (isActive) return "white";
    if (isHovered || opened) return activeColor;
    return COLORS.secondaryColor;
  }, [isActive, isHovered, opened, activeColor]);

  const handleLinkClick = useCallback((e) => {
    if (item.links === '/service') {
      e.preventDefault();
    } else {
      startLoading();
    }
  }, [item.links, startLoading]);

  const handleMouseEnter = useCallback(() => {
    open();
    setIsHovered(true);
  }, [open]);

  const handleMouseLeave = useCallback(() => {
    close();
    setIsHovered(false);
  }, [close]);

  const handleNonDropdownClick = useCallback((e) => {
    e.preventDefault();
    startLoading();
    router.push(item.links);
  }, [startLoading, router, item.links]);

  const handleNonDropdownMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleNonDropdownMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return item.dropdown ? (
    <HoverCard
      width={760}
      position="bottom"
      radius="md"
      shadow="md"
      withinPortal
    >
      <HoverCardTarget>
        <Link
          href={item.links}
          style={linkStyles}
          onClick={handleLinkClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Text 
            size={TYPOGRAPHY.body.normal} 
            fw={500}
            style={{ 
              color: textColor,
            }}
          >
            {item.label}
          </Text>
          {opened ? (
            <IconChevronUp 
              size={16} 
              style={{ 
                color: iconColor
              }} 
            />
          ) : (
            <IconChevronDown 
              size={16} 
              style={{ 
                color: iconColor
              }} 
            />
          )}
        </Link>

      </HoverCardTarget>

      <HoverCardDropdown
        style={{
          overflow: "hidden",
          zIndex: 10000,
          color: COLORS.primaryColor,
          padding: "10px 20px",
        }}
      >
        <Group gap={10} justify="space-between">
          <Text
            fw={500}
            size={TYPOGRAPHY.body.normal}
            color={COLORS.secondaryColor}
          >
            {item.label}
          </Text>
        </Group>
        <Divider my="sm" />
        <SimpleGrid cols={3} spacing={6}>
          {featuresMap[item.label]?.map((feature) => (
            <FeatureItem key={feature.title} feature={feature} />
          ))}
        </SimpleGrid>
      </HoverCardDropdown>
    </HoverCard>
  ) : (
    <Link 
      href={item.links} 
      style={linkStyles}
      onClick={handleNonDropdownClick}
      onMouseEnter={handleNonDropdownMouseEnter}
      onMouseLeave={handleNonDropdownMouseLeave}
    >
      <Text 
        size={TYPOGRAPHY.body.normal} 
        fw={500}
        style={{ 
          color: textColor,
        }}
      >
        {item.label}
      </Text>
    </Link>
  );
});
