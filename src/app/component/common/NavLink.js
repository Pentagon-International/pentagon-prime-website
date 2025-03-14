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
  IconNotification,
  IconPackageExport,
  IconPackages,
  IconPlaneArrival,
  IconPresentationAnalytics,
  IconShip,
  IconSpeedboat,
  IconTruck,
  IconWorldDollar,
} from "@tabler/icons-react";

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
      icon: IconCrane,
      title: "ODC Project Cargo",
      link: "/service/odc-project-cargo",
    },
    {
      icon: IconBuildingWarehouse,
      title: "Warehousing and Storage",
      link: "service/warehousing-and-distribution",
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
  Tools: [
    {
      icon: IconChartPie3,
      title: "Analytics",
      description: "Powerful tools to analyze your business",
    },
    {
      icon: IconNotification,
      title: "Alerts",
      description: "Real-time notifications and updates",
    },
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
            size={12} 
            stroke={1.5} 
            color={COLORS.secondaryColor} 
            style={{ opacity: 0.9 }}
          />
        </ThemeIcon>

        <Anchor
          underline="never"
          href={feature.link}
          size="xs"
          fw={500}
          c={COLORS.secondaryColor}
          style={{
            letterSpacing: '0.1px',
            lineHeight: 1.2
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
      width={600}
      position="bottom"
      radius="md"
      shadow="md"
      withinPortal
    >
      <HoverCardTarget>
        <a
          href={item.links}
          style={{ display: "flex", alignItems: "center", gap: 5 }}
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
        <SimpleGrid cols={3} spacing={10}>
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
