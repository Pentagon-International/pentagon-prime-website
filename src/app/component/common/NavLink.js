import { COLORS } from "@/app/utils/COLORS";
import {
    Anchor,
    Divider,
    Group,
    HoverCard,
    HoverCardDropdown,
    HoverCardTarget,
    SimpleGrid,
    Text,
    ThemeIcon,
    UnstyledButton
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
    IconBook,
    IconChartPie3,
    IconChevronDown,
    IconChevronUp,
    IconCode,
    IconCoin,
    IconFingerprint,
    IconNotification
} from "@tabler/icons-react";


export const featuresMap = {
    Products: [
        {
            icon: IconCode,
            title: 'API Access',
            description: 'Seamless API integrations for your products',
        },
        {
            icon: IconCoin,
            title: 'Pricing',
            description: 'Transparent and flexible pricing models',
        },
    ],
    Solutions: [
        {
            icon: IconFingerprint,
            title: 'Security',
            description: 'Enterprise-grade security for your data',
        },
        {
            icon: IconBook,
            title: 'Case Studies',
            description: 'Success stories from our customers',
        },
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

// FeatureItem Component
const FeatureItem = ({ feature }) => (
    <UnstyledButton
        style={{
            display: 'block',
            width: '100%',
            padding: '8px 12px',
            borderRadius: '4px',
            transition: 'background-color 0.2s ease-in-out',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#E3E3E3')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
    >
        <Group wrap="nowrap" gap={10} align="flex-start">
            <ThemeIcon size={26} variant="default" radius="md">
                <feature.icon size={18} color={COLORS.secondaryColor} />
            </ThemeIcon>
            <div>
                <Text size="xs" fw={500} color={COLORS.secondaryColor}>
                    {feature.title}
                </Text>
                <Text size="xs" color="dimmed">
                    {feature.description}
                </Text>
            </div>
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
                    <Text size="sm" color={COLORS.primaryColor}>{item.label}</Text>
                    {opened ? (
                        <IconChevronUp size={16} color={COLORS.primaryColor} />
                    ) : (
                        <IconChevronDown size={16} color={COLORS.primaryColor} />
                    )}
                </a>
            </HoverCardTarget>

            <HoverCardDropdown
                style={{ overflow: "hidden", zIndex: 1100, color: COLORS.primaryColor }}
            >
                <Group justify="space-between" px="md">
                    <Text fw={500} size="xs" color={COLORS.secondaryColor}>
                        {item.label}
                    </Text>
                    {featuresMap[item.label]?.length > 2 && (
                        <Anchor href="#" fz="xs">
                            View all
                        </Anchor>
                    )}
                </Group>
                <Divider my="sm" />
                <SimpleGrid cols={2} spacing={10}>
                    {featuresMap[item.label]?.map((feature) => (
                        <FeatureItem key={feature.title} feature={feature} />
                    ))}
                </SimpleGrid>
            </HoverCardDropdown>
        </HoverCard>
    ) : (
        <a href={item.links} style={{ display: "flex", alignItems: "center" }}>
            <Text size="sm" color={COLORS.primaryColor}>{item.label}</Text>
        </a>
    );
};
