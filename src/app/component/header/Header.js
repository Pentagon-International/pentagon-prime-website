'use client';
import {
  Anchor,
  Box,
  Burger,
  Button,
  Container,
  Divider,
  Drawer,
  Flex,
  Group,
  Image,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { COLORS } from '@/app/utils/COLORS';
import Images from '@/app/utils/image';
import { featuresMap, NavLink } from '../common/NavLink';
import { IconPhone } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';



const navItems = [
  { label: 'Products', links: '/product', dropdown: false },
  { label: 'Solutions', links: '/service', dropdown: true },
  // { label: 'Tools', links: '/contact', dropdown: true },
  { label: 'About', links: '/about', dropdown: false },
  // { label: 'Company', links: '/help', dropdown: true },
];


const Header = () => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const currentPath = usePathname();
  const router = useRouter();


  const isAppliedBackground = ['/', '/contact', '/resource'].includes(currentPath);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    backgroundColor: isScrolled
      ? 'rgba(0, 0, 0, 0.7)'
      : !isAppliedBackground
        ? '#111F40'
        : 'transparent',
    transition: 'background-color 0.3s ease-in-out',
    backdropFilter: 'blur(10px)',
    zIndex: 1000,
    padding: '8px 7%',
    color: COLORS.primaryColor,
  };

  const FeatureItem = ({ feature }) => (
    <Box>
      <Text size="sm" fw={500} color={COLORS.secondaryColor}>
        {feature.title}
      </Text>
      <Text size="xs" color="dimmed">
        {feature.description}
      </Text>
    </Box>
  );

  return (
    <Container fluid px="7%">
      <Box>
        <header style={headerStyle}>
          <Flex justify="space-between" align="center" h="50">
            <a href="/" style={{ display: 'flex', alignItems: 'center' }}>
              <Image src={Images.logo} alt="Logo" />
            </a>
            <Flex h="100%" gap={30} align="center" visibleFrom="sm">
              {navItems.map((item) => (
                <NavLink key={item.label} item={item} />
              ))}
            </Flex>
            <Group visibleFrom="sm">
              {/* <Anchor size="smx" style={{ color: COLORS.portColor, textDecoration: 'underline' }}>
                Talk to an Expert
              </Anchor> */}
              <Button
                variant="outline"
                size="md"
                fz={'smx'}
                // p={'12px 32px'}
                style={{
                  borderColor: COLORS.primaryColor,
                  color: COLORS.primaryColor,
                }}
                leftSection={<IconPhone />}
                onClick={() => router.push('/contact')}
              >
                Talk to an Expert
              </Button>
            </Group>
            <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />

            <Drawer
              opened={drawerOpened}
              onClose={closeDrawer}
              title="Menu"
              padding="xl"
              size="75%"
              zIndex={1200}
            >
              <Flex direction="column" gap="md">
                {navItems.map((item) => (
                  <Box key={item.label}>
                    <a href={item.links} onClick={closeDrawer}>
                      <Text size="md" color={COLORS.serviceColor}>{item.label}</Text>
                    </a>
                    {item.dropdown && featuresMap[item.label]?.map((feature) => (
                      <FeatureItem key={feature.title} feature={feature} />
                    ))}
                  </Box>
                ))}
                <Divider my="sm" />
                {/* <Anchor size="md" ta="center" style={{ color: COLORS.portColor, textDecoration: 'underline' }}>
                  Talk to an Expert
                </Anchor> */}
                <Button variant="outline" size="md" fullWidth style={{ borderColor: COLORS.serviceColor, color: COLORS.serviceColor }} onClick={() => router.push('/contact')}>
                  Talk to an Expert
                </Button>
              </Flex>
            </Drawer>

          </Flex>
        </header>
      </Box>
    </Container>
  );
};

export default Header;
