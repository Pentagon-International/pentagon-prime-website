"use client";
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
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { COLORS } from "@/app/utils/COLORS";
import Images from "@/app/utils/image";
import { featuresMap, NavLink } from "../common/NavLink";
import { IconChevronDown, IconPhone } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

const navItems = [
  { label: "Home", links: "/", dropdown: false },
  // { label: "Products", links: "/product", dropdown: false },
  { label: "Solutions", links: "/service", dropdown: true },
  // { label: "Resources", links: "/", dropdown: true },
  { label: "About Us", links: "/about", dropdown: false },
  // { label: 'Company', links: '/help', dropdown: true },  
];

const Header = () => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const currentPath = usePathname();
  const router = useRouter();
  const [showNav, setShowNav] = useState(false)

  const isAppliedBackground = ["/", "/contact", "/resource"].includes(
    currentPath
  );

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    backgroundColor: isScrolled
      ? "rgba(0, 0, 0, 0.7)"
      : !isAppliedBackground
        ? "#111F40"
        : "transparent",
    transition: "background-color 0.3s ease-in-out",
    backdropFilter: "blur(10px)",
    zIndex: 1000,
    padding: "8px 7%",
    color: COLORS.primaryColor,
  };

  const FeatureItem = ({ feature }) => (
    showNav && (
      <Box ml="lg" mt={20}>
        <a href={feature.link} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Text size="sm" fw={500} color={COLORS.secondaryColor}>
            {feature.title}
          </Text>
          <Text size="xs" color="dimmed">
            {feature.description}
          </Text>
        </a>
      </Box>
    )
  );

  
  return (
    <Container fluid px="7%">
      <Box>
        <header style={headerStyle}>
          <Flex justify="space-between" align="center" h="50">
            <a href="/" style={{ display: "flex", alignItems: "center" }}>
              <Image src={Images.logo} alt="Logo" h={40} />
            </a>
            <Flex h="100%" gap={30} align="center" visibleFrom="sm">
              {navItems.map((item) => (
                <NavLink key={item.label} item={item} />
              ))}
            </Flex>
            <Group visibleFrom="sm">
              <Button
                variant="outline"
                size="md"
                fz={"smx"}
                radius={"md"}
                style={{
                  borderColor: COLORS.primaryColor,
                  color: COLORS.primaryColor,
                }}
                leftSection={<IconPhone stroke={1.5} size={18} />}
                onClick={() => router.push("/contact")}
              >
                Talk to an Expert
              </Button>
            </Group>
            <Burger
              opened={drawerOpened}
              color={COLORS.primaryColor}
              onClick={toggleDrawer}
              hiddenFrom="sm"
            />

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
                    <Text
                      size="md"
                      w="100%"
                      color={COLORS.secondaryColor}
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
                      onClick={(e) => {
                        if (item.dropdown) {
                          e.preventDefault();
                          setShowNav(!showNav);
                        } else {
                          closeDrawer();
                          window.location.href = item.links;
                        }
                      }}
                    >
                      {item.label}
                      {item?.dropdown && (
                        <IconChevronDown
                          color={COLORS.secondaryColor}
                          stroke={1.5}
                        />
                      )}
                    </Text>
                    {item.dropdown &&
                      featuresMap[item.label]?.map((feature) => (
                        <FeatureItem key={feature.title} feature={feature} />
                      ))}
                  </Box>
                ))}

                <Divider my="sm" />
                {/* <Anchor size="md" ta="center" style={{ color: COLORS.portColor, textDecoration: 'underline' }}>
                  Talk to an Expert
                </Anchor> */}
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  style={{
                    borderColor: COLORS.serviceColor,
                    color: COLORS.serviceColor,
                  }}
                  onClick={
                    () => {
                      router.push("/contact")
                      closeDrawer()
                    }
                  }
                >
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
