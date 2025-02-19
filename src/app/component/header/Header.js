// 'use client';

// import {
//   IconBook,
//   IconChartPie3,
//   IconChevronDown,
//   IconCode,
//   IconCoin,
//   IconFingerprint,
//   IconNotification,
// } from '@tabler/icons-react';
// import {
//   Anchor,
//   Box,
//   Burger,
//   Button,
//   Center,
//   Collapse,
//   Container,
//   Divider,
//   Drawer,
//   Flex,
//   Group,
//   HoverCard,
//   Image,
//   ScrollArea,
//   SimpleGrid,
//   Text,
//   ThemeIcon,
//   UnstyledButton,
//   useMantineTheme,
// } from '@mantine/core';
// import {useDisclosure} from '@mantine/hooks';

// import {useEffect, useState} from 'react';
// import {useRouter} from 'next/router';
// import {usePathname} from 'next/navigation';
// import {COLORS} from '@/app/utils/COLORS';
// import Images from '@/app/utils/image';

// const navItems = [
//   {label: 'Products', links: '/product'},
//   {label: 'Solutions', links: '/solution'},
//   {label: 'Tools', links: '/tools'},
//   {label: 'Prime Hub', links: '/primehub', dropdown: false},
//   {label: 'Company', links: '/company'},
// ];

// const featuresMap = {
//   Products: [
//     {
//       icon: IconCode,
//       title: 'API Access',
//       description: 'Seamless API integrations for your products',
//     },
//     {
//       icon: IconCoin,
//       title: 'Pricing',
//       description: 'Transparent and flexible pricing models',
//     },
//   ],
//   Solutions: [
//     {
//       icon: IconFingerprint,
//       title: 'Security',
//       description: 'Enterprise-grade security for your data',
//     },
//     {
//       icon: IconBook,
//       title: 'Case Studies',
//       description: 'Success stories from our customers',
//     },
//   ],
//   Tools: [
//     {
//       icon: IconChartPie3,
//       title: 'Analytics',
//       description: 'Powerful tools to analyze your business',
//     },
//     {
//       icon: IconNotification,
//       title: 'Alerts',
//       description: 'Real-time notifications and updates',
//     },
//   ],
//   Company: [
//     {
//       icon: IconBook,
//       title: 'About Us',
//       description: 'Learn more about our mission and team',
//     },
//     {
//       icon: IconFingerprint,
//       title: 'Careers',
//       description: 'Join our growing company',
//     },
//   ],
// };

// const FeatureItem = ({feature}) => (
//   <UnstyledButton>
//     <Group wrap="nowrap" align="flex-start">
//       <ThemeIcon size={34} variant="default" radius="md">
//         <feature.icon size={22} color={COLORS.secondaryColor} />
//       </ThemeIcon>
//       <div>
//         <Text size="sm" fw={500} style={{color: COLORS.secondaryColor}}>
//           {feature.title}
//         </Text>
//         <Text size="xs" c="dimmed">
//           {feature.description}
//         </Text>
//       </div>
//     </Group>
//   </UnstyledButton>
// );

// const NavLink = ({item}) => {
//   const theme = useMantineTheme();
//   return item.dropdown !== false ? (
//     <HoverCard
//       width={600}
//       position="bottom"
//       radius="md"
//       shadow="md"
//       withinPortal
//     >
//       <HoverCard.Target>
//         <a
//           href={item.links}
//           style={{
//             fontWeight: 500,
//             fontSize: '16px',
//             textDecoration: 'none',
//             color: COLORS.primaryColor,
//           }}
//         >
//           <Center inline>
//             <Box component="span" mr={5}>
//               <Text style={{color: COLORS.primaryColor}}>{item.label}</Text>
//             </Box>
//             <IconChevronDown size={16} color={theme.colors.blue[6]} />
//           </Center>
//         </a>
//       </HoverCard.Target>
//       <HoverCard.Dropdown
//         style={{overflow: 'hidden', zIndex: 1100, color: COLORS.primaryColor}}
//       >
//         <Group justify="space-between" px="md">
//           <Text fw={500} style={{color: COLORS.secondaryColor}}>
//             {item.label}
//           </Text>
//           <Anchor href="#" fz="xs">
//             View all
//           </Anchor>
//         </Group>
//         <Divider my="sm" />
//         <SimpleGrid cols={2} spacing={0} style={{color: COLORS.primaryColor}}>
//           {featuresMap[item.label]?.map((feature) => (
//             <FeatureItem key={feature.title} feature={feature} />
//           ))}
//         </SimpleGrid>
//       </HoverCard.Dropdown>
//     </HoverCard>
//   ) : (
//     <a
//       href={item.links}
//       style={{
//         fontWeight: 500,
//         fontSize: '16px',
//         textDecoration: 'none',
//         color: COLORS.primaryColor,
//       }}
//     >
//       {item.label}
//     </a>
//   );
// };

// const Header = () => {
//   const [drawerOpened, {toggle: toggleDrawer, close: closeDrawer}] =
//     useDisclosure(false);
//   const [linksOpened, {toggle: toggleLinks}] = useDisclosure(false);

//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 0);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const currentPath = usePathname();

//   const isAppliedBackground =
//     currentPath === '/' ||
//     currentPath === '/contact' ||
//     currentPath === '/resource';

//   return (
//     <Container fluid px="7%">
//       <Box>
//         <header
//           style={{
//             position: 'fixed',
//             top: 0,
//             left: 0,
//             width: '100%',
//             backgroundColor: isScrolled
//               ? 'rgba(0, 0, 0, 0.7)'
//               : !isAppliedBackground
//               ? '#111F40'
//               : 'transparent',
//             backdropFilter: 'blur(10px)',
//             zIndex: 1000,
//             padding: '10px 7%',
//             color: COLORS.primaryColor,
//           }}
//         >
//           <Flex justify="space-between" align="center" h="60">
//             <a href="/" style={{display: 'flex', alignItems: 'center'}}>
//               <Image src={Images.logo} alt="Logo" />
//             </a>
//             <Flex h="100%" gap={30} align="center" visibleFrom="sm">
//               {navItems.map((item) => (
//                 <NavLink key={item.label} item={item} />
//               ))}
//             </Flex>
//             <Group visibleFrom="sm">
//               <Anchor
//                 style={{color: COLORS.portColor, textDecoration: 'underline'}}
//               >
//                 Talk to an Expert
//               </Anchor>
//               <Button
//                 variant="outline"
//                 style={{
//                   borderColor: COLORS.primaryColor,
//                   color: COLORS.primaryColor,
//                 }}
//               >
//                 Sign up
//               </Button>
//             </Group>
//             <Burger
//               opened={drawerOpened}
//               onClick={toggleDrawer}
//               hiddenFrom="sm"
//             />
//           </Flex>
//         </header>
//       </Box>
//     </Container>
//   );
// };

// export default Header;

'use client';

import {
  IconBook,
  IconChartPie3,
  IconChevronDown,
  IconCode,
  IconCoin,
  IconFingerprint,
  IconNotification,
} from '@tabler/icons-react';
import {
  Anchor,
  Box,
  Burger,
  Button,
  Center,
  Collapse,
  Container,
  Divider,
  Drawer,
  Flex,
  Group,
  HoverCard,
  Image,
  ScrollArea,
  SimpleGrid,
  Text,
  ThemeIcon,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { COLORS } from '@/app/utils/COLORS';
import Images from '@/app/utils/image';

const navItems = [
  { label: 'Products', links: '/product' },
  { label: 'Solutions', links: '/solution' },
  { label: 'Tools', links: '/tools' },
  { label: 'Prime Hub', links: '/primehub', dropdown: false },
  { label: 'Company', links: '/company' },
];

const featuresMap = {
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

const FeatureItem = ({ feature }) => (
  <UnstyledButton>
    <Group wrap="nowrap" align="flex-start">
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

const NavLink = ({ item }) => {
  const theme = useMantineTheme();

  return item.dropdown !== false ? (
    <HoverCard
      width={600}
      position="bottom"
      radius="md"
      shadow="md"
      withinPortal
    >
      <HoverCard.Target>
        <a href={item.links}>
          <Center inline>
            <Box component="span" mr={5}>
              <Text size='smx' color={COLORS.primaryColor}>{item.label}</Text>
            </Box>
            <IconChevronDown size={16} color={theme.colors.blue[6]} />
          </Center>
        </a>
      </HoverCard.Target>
      <HoverCard.Dropdown
        style={{ overflow: 'hidden', zIndex: 1100, color: COLORS.primaryColor }}
      >
        <Group justify="space-between" px="md">
          <Text fw={500} size="xs" color={COLORS.secondaryColor}>
            {item.label}
          </Text>
          <Anchor href="#" fz="xs">
            View all
          </Anchor>
        </Group>
        <Divider my="sm" />
        <SimpleGrid cols={2} spacing={0}>
          {featuresMap[item.label]?.map((feature) => (
            <FeatureItem key={feature.title} feature={feature} />
          ))}
        </SimpleGrid>
      </HoverCard.Dropdown>
    </HoverCard>
  ) : (
    <a href={item.links}>
      <Text size='smx'>
        {item.label}
      </Text>
    </a>
  );
};

const Header = () => {
  const [drawerOpened, { toggle: toggleDrawer }] = useDisclosure(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const currentPath = usePathname();

  const isAppliedBackground = ['/', '/contact', '/resource'].includes(
    currentPath
  );

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
    backdropFilter: 'blur(10px)',
    zIndex: 1000,
    padding: '8px 7%',
    color: COLORS.primaryColor,
  };

  return (
    <Container fluid px="7%">
      <Box>
        <header style={headerStyle}>
          <Flex justify="space-between" align="center" h="60">
            <a href="/" style={{ display: 'flex', alignItems: 'center' }}>
              <Image src={Images.logo} alt="Logo" />
            </a>
            <Flex h="100%" gap={30} align="center" visibleFrom="sm">
              {navItems.map((item) => (
                <NavLink key={item.label} item={item} />
              ))}
            </Flex>
            <Group visibleFrom="sm">
              <Anchor
                size='smx'
                style={{ color: COLORS.portColor, textDecoration: 'underline' }}
              >
                Talk to an Expert
              </Anchor>
              <Button
                variant="outline"
                size='xs'
                style={{
                  borderColor: COLORS.primaryColor,
                  color: COLORS.primaryColor,
                }}
              >
                Sign up
              </Button>
            </Group>
            <Burger
              opened={drawerOpened}
              onClick={toggleDrawer}
              hiddenFrom="sm"
            />
          </Flex>
        </header>
      </Box>
    </Container>
  );
};

export default Header;
