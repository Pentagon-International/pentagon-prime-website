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
    UnstyledButton
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
    IconBook,
    IconCaretDownFilled,
    IconCaretUpFilled,
    IconChartPie3,
    IconCode,
    IconCoin,
    IconFingerprint,
    IconNotification,
    IconPlaneArrival,
    IconShip
} from "@tabler/icons-react";


export const featuresMap = {
    Products: [
        {
            icon: IconPlaneArrival,
            title: 'API Access',
        },
        {
            icon: IconCoin,
            title: 'Pricing',
        },
    ],
    Solutions: [
        {
            icon: IconPlaneArrival,
            title: 'Air Freight Forwarding',
            link : 'service/air-freight-forwarding'
        },
        {
            icon: IconShip,
            title: 'Sea Freight Forwarding',
            link : 'service/sea-freight-forwarding'
        },
        {
            icon: IconBook,
            title: 'Multimodal Transport',
            link : 'service/multimodal-transport'
        },
        {
            icon: IconBook,
            title: 'Cross Country Trade',
            link : 'service/cross-country-trade'
        },
        {
            icon: IconBook,
            title: 'Consolidation Services',
            link : 'service/consolidation-services'
        },
        {
            icon: IconBook,
            title: 'Value Added Services',
            link : 'service/value-added-services'
        },
        {
            icon: IconBook,
            title: 'Custom Clearing',
            link : 'service/custom-clearing'
        },
        {
            icon: IconBook,
            title: 'Break Bulk Cargo Services',
            link : 'service/break-bulk-cargo-services'
        },
        {
            icon: IconBook,
            title: 'ODC Project Cargo',
            link : 'service/odc-project-cargo'
        },
        {
            icon: IconBook,
            title: 'Warehousing and Storage',
            link : 'service/warehousing-and-storage'
        },
        {
            icon: IconBook,
            title: 'Exhibition Cargo',
            link : 'service/exhibition-cargo'
        },
        {
            icon: IconBook,
            title: 'Chartering and Coastal Movements',
            link : 'service/chartering-and-coastal-movements'
        },
        {
            icon: IconBook,
            title: 'First and Last-Mile Delivery',
            link : 'service/first-and-last-mile-delivery'
        }
    ],
    Tools: [
        {
            icon: IconChartPie3,
            title: 'Analytics',
            description: 'Powerful tools to analyze your business',
        },
        {
            icon: IconNotification,
            title: 'Alerts',
            description: 'Real-time notifications and updates',
        },
    ],
    Company: [
        {
            icon: IconBook,
            title: 'About Us',
            description: 'Learn more about our mission and team',
        },
        {
            icon: IconFingerprint,
            title: 'Careers',
            description: 'Join our growing company',
        },
    ],
};

const FeatureItem = ({ feature }) => (
    <UnstyledButton
        style={{
            display: 'block',
            width: '100%',
            borderRadius: '4px',
            transition: 'background-color 0.4s ease-in-out',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#E3E3E3')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
    >
        <Group wrap="nowrap" gap={10} align="center">
            <ThemeIcon size={26} variant="default" radius="md">
                <feature.icon size={18} color={COLORS.secondaryColor} />
            </ThemeIcon>
            <Stack>
                <Anchor underline="none" href={feature.link} size="xs" fw={500} c={COLORS.secondaryColor}>
                    {feature.title}
                </Anchor>
            </Stack>
        </Group>

    </UnstyledButton>
);





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
                    <Text size="14px" color={COLORS.primaryColor}>{item.label}</Text>
                    {opened ? (
                        <IconCaretUpFilled size={16} color={COLORS.primaryColor} />
                    ) : (
                        <IconCaretDownFilled size={16} color={COLORS.primaryColor} />
                    )}
                </a>
            </HoverCardTarget>

            <HoverCardDropdown
                style={{ overflow: "hidden", zIndex: 1100, color: COLORS.primaryColor, padding: '10px 20px' }}
            >
                <Group gap={10} justify="space-between" >
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
            <Text size="14px" color={COLORS.primaryColor}>{item.label}</Text>
        </a>
    );
};
