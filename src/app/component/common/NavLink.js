import { COLORS } from "@/app/utils/COLORS";
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
      title: "Air Freight Forwarding",
      link: "/service/air-freight-forwarding",
    },
    {
      icon: IconShip,
      title: "Sea Freight Forwarding",
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
      title: "Custom Clearing",
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
    {
      icon: IconSpeakerphone,
      title: "Announcements",
      link: '/news'
    },
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

const FeatureItem = ({ feature }) => {
  return (
    <UnstyledButton
      component={Link}
      href={feature.link}
      style={{
        display: "block",
        width: "100%",
        padding: "6px 10px",
        borderRadius: "4px",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#F5F5F5";
        e.currentTarget.style.transform = "translateX(2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.transform = "translateX(0)";
      }}
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

        <Anchor
          component={Text}
          underline="never"
          href={feature.link}
          fw={500}
          c={COLORS.secondaryColor}
          style={{
            letterSpacing: '0.1px',
            lineHeight: 1.2,
            fontSize: 13,
          }}
        >
          {feature.title}
        </Anchor>
      </Group>
    </UnstyledButton>
  );
};

export const NavLink = ({ item }) => {
  const [opened, { open, close }] = useDisclosure(false);

  return item.dropdown ? (
    <HoverCard
      width={760}
      position="bottom"
      radius="md"
      shadow="md"
      withinPortal
    >
      <HoverCardTarget>
        <a
          href={item.links}
          style={{ display: "flex", alignItems: "center", gap: 5 }}
          onClick={(e) => {
            if (item.links === '/service') {
              e.preventDefault(); // prevent the render of the page (service)
            }
          }}
          onMouseEnter={open}
          onMouseLeave={close}
        >
          <Text size="14px" color={COLORS.primaryColor}>
            {item.label}
          </Text>
          {opened ? (
            <IconChevronUp size={16} color={COLORS.primaryColor} />
          ) : (
            <IconChevronDown size={16} color={COLORS.primaryColor} />
          )}
        </a>

      </HoverCardTarget>

      <HoverCardDropdown
        style={{
          overflow: "hidden",
          zIndex: 1100,
          color: COLORS.primaryColor,
          padding: "10px 20px",
        }}
      >
        <Group gap={10} justify="space-between">
          <Text fw={500} size="14px" color={COLORS.secondaryColor}>
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
    <a href={item.links} style={{ display: "flex", alignItems: "center" }}>
      <Text size="14px" color={COLORS.primaryColor}>
        {item.label}
      </Text>
    </a>
  );
};
