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
import { TYPOGRAPHY } from "@/app/utils/TYPOGRAPHY";

const navItems = [
  { label: "Home", links: "/", dropdown: false },
  // { label: "Products", links: "/product", dropdown: false },
  { label: "Solutions", links: "/service", dropdown: true },
  { label: "Resources", links: "/", dropdown: true },
  { label: "Gallery", links: "/gallery", dropdown: false },
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
    zIndex: 9999,
    padding: "8px 1%",
    color: COLORS.primaryColor,
    height: "75px",
    display:'flex',
    alignItems:'center',
    justifyContent:'space-between',
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
          <Text size={TYPOGRAPHY.body.normal} fw={500} c={COLORS.secondaryColor}>
            {feature.title}
          </Text>
          <Text size={TYPOGRAPHY.body.normal} c="dimmed">
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
    <Container fluid px="2%">
      <Box>
        <header style={headerStyle}>
          <Flex justify="space-between" align="center" h="50" w="100%">
            <Link href="/" onClick={handleLogoClick} style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 5}}>
              <Image src={Images.logo_only} alt="Logo" h={48} />
              <Flex align="center" justify="center" style={{textDecoration: "none", flexDirection: "column", alignSelf: "flex-end"}}>
                <Text
                  className="logo-font"
                  fs="italic"
                  fz={22}
                  fw={700}
                  tw="balance"
                  c="#326b7d"
                >
                  Pentagon Prime
                </Text>
                <Text size="xs" fw={500} c="rgb(0, 33, 95)" style={{alignSelf: 'flex-start'}}>
                  Logistics.Automated
                </Text>
              </Flex>
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
              fz={TYPOGRAPHY.body.normal}
              radius={"md"}
              leftSection={<IconPhone stroke={1.5} size={18} />}
              onClick={handleContactClick}
              style={buttonStyle}
              onMouseEnter={handleButtonMouseEnter}
              onMouseLeave={handleButtonMouseLeave}
            >
              Talk to Prime
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
                      size={TYPOGRAPHY.body.normal}
                      fw={500}
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
                  styles={{
                    label: {
                      fontSize: TYPOGRAPHY.body.normal,
                    },
                  }}
                  style={{
                    borderColor: COLORS.serviceColor,
                    color: COLORS.serviceColor,
                  }}
                  onClick={handleDrawerContactClick}
                >
                  Talk to Prime
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
