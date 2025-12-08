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
import { useEffect, useState, memo, useMemo, useCallback } from "react";
import { usePathname } from "next/navigation";
import { COLORS } from "@/app/utils/COLORS";
import Images from "@/app/utils/image";
import { featuresMap, NavLink } from "../common/NavLink";
import { IconChevronDown, IconPhone } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLoading } from "../common/LoadingContext";

const navItems = [
  { label: "Home", links: "/", dropdown: false },
  // { label: "Products", links: "/product", dropdown: false },
  { label: "Solutions", links: "/service", dropdown: true },
  { label: "Resources", links: "/", dropdown: true },
  { label: "About Us", links: "/about", dropdown: false },
  // { label: 'Company', links: '/help', dropdown: true },
];

const Header = () => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const currentPath = usePathname();
  const router = useRouter();
  const { startLoading } = useLoading();
  const isContactPage = useMemo(() => currentPath === "/contact/", [currentPath]);

  const isAppliedBackground = useMemo(() => ["/", "/contact", "/resource"].includes(
    currentPath
  ), [currentPath]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerStyle = useMemo(() => ({
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    backgroundColor: "#FFFFFF",
    boxShadow: "0 0 6px 3px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(10px)",
    zIndex: 1000,
    padding: "8px 7%",
    color: COLORS.primaryColor,
  }), []);

  const FeatureItem = memo(({ feature }) => {
    const handleClick = useCallback(() => {
      startLoading();
      closeDrawer();
    }, [startLoading, closeDrawer]);

    return (
      <Box ml="lg" mt={20}>
        <Link
          href={feature.link}
          onClick={handleClick}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Text size="sm" fw={500} c={COLORS.secondaryColor}>
            {feature.title}
          </Text>
          <Text size="xs" c="dimmed">
            {feature.description}
          </Text>
        </Link>
      </Box>
    );
  });

  const handleLogoClick = useCallback(() => {
    startLoading();
  }, [startLoading]);

  const handleContactClick = useCallback(() => {
    startLoading();
    router.push("/contact");
  }, [startLoading, router]);

  const handleDrawerItemClick = useCallback((item) => {
    if (item.dropdown) {
      setOpenDropdown(
        openDropdown === item.label ? null : item.label
      );
    } else {
      closeDrawer();
      startLoading();
      router.push(item.links);
    }
  }, [openDropdown, closeDrawer, startLoading, router]);

  const handleDrawerContactClick = useCallback(() => {
    startLoading();
    router.push("/contact");
    closeDrawer();
  }, [startLoading, router, closeDrawer]);

  const buttonStyle = useMemo(() => ({
    border: "2px solid rgb(0, 33, 95)",
    color: isContactPage ? "white" : "rgb(0, 33, 95)",
    backgroundColor: isContactPage ? "rgb(0, 33, 95)" : "transparent",
    transition: "all 0.25s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  }), [isContactPage]);

  const handleButtonMouseEnter = useCallback((e) => {
    e.currentTarget.style.backgroundColor = "rgb(0, 33, 95)";
    e.currentTarget.style.color = "white";
  }, []);

  const handleButtonMouseLeave = useCallback((e) => {
    if (!isContactPage) {
      e.currentTarget.style.backgroundColor = "transparent";
      e.currentTarget.style.color = "rgb(0, 33, 95)";
    }
  }, [isContactPage]);

  return (
    <Container fluid px="7%">
      <Box>
        <header style={headerStyle}>
          <Flex justify="space-between" align="center" h="50">
            <Link href="/" onClick={handleLogoClick} style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
              <Image src={Images.logo_only} alt="Logo" h={48} mb={5} />
              <Text
                className="logo-font"
                fs="italic"
                fz={22}
                fw={700}
                tw="balance"
                pt={10}
                c="#326b7d"
              >
                Pentagon Prime
              </Text>
            </Link>
            <Flex h="100%" gap={30} align="center" visibleFrom="sm">
              {navItems.map((item) => (
                <NavLink key={item.label} item={item} />
              ))}
            </Flex>
            <Group visibleFrom="sm">
            <Button
              variant="outline"
              size="md"
              fz={"14px"}
              radius={"md"}
              leftSection={<IconPhone stroke={1.5} size={18} />}
              onClick={handleContactClick}
              style={buttonStyle}
              onMouseEnter={handleButtonMouseEnter}
              onMouseLeave={handleButtonMouseLeave}
            >
              Talk to an Expert
            </Button>

            </Group>
            <Burger
              opened={drawerOpened}
              color={COLORS.secondaryColor}
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
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        cursor: "pointer",
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        handleDrawerItemClick(item);
                      }}
                    >
                      {item.label}
                      {item.dropdown && (
                        <IconChevronDown
                          color={COLORS.secondaryColor}
                          stroke={1.5}
                        />
                      )}
                    </Text>

                    {item.dropdown &&
                      openDropdown === item.label &&
                      featuresMap[item.label]?.map((feature) => (
                        <FeatureItem key={feature.title} feature={feature} />
                      ))}
                  </Box>
                ))}

                <Divider my="sm" />

                <Button
                  variant="outline"
                  size="sm"
                  radius={"md"}
                  fullWidth
                  style={{
                    borderColor: COLORS.serviceColor,
                    color: COLORS.serviceColor,
                  }}
                  onClick={handleDrawerContactClick}
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

export default memo(Header);
