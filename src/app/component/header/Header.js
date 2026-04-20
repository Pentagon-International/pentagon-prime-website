"use client";
import {
  Box,
  Burger,
  Button,
  Collapse,
  Container,
  Drawer,
  Flex,
  Group,
  Image,
  Stack,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState, memo, useMemo, useCallback } from "react";
import { usePathname } from "next/navigation";
import { COLORS } from "@/app/utils/COLORS";
import Images from "@/app/utils/image";
import { featuresMap, NavLink } from "../common/NavLink";
import {
  IconChevronDown,
  IconLayoutDashboard,
  IconLogin,
  IconPhone,
  IconPointFilled,
  IconX,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLoading } from "../common/LoadingContext";
import { TYPOGRAPHY } from "@/app/utils/TYPOGRAPHY";

const navItems = [
  { label: "Home", links: "/", dropdown: false },
  { label: "Solutions", links: "/service", dropdown: true },
  { label: "Resources", links: "/", dropdown: true },
  { label: "Cargo Showcase", links: "/gallery", dropdown: false },
  { label: "About Us", links: "/about", dropdown: false },
];

const DrawerFeatureItem = memo(({ feature, onClose }) => {
  const { startLoading } = useLoading();

  const handleClick = useCallback(() => {
    startLoading();
    onClose();
  }, [startLoading, onClose]);

  return (
    <Box ml="lg" mt={20}>
      <Link
        href={feature.link}
        onClick={handleClick}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Group
          align="flex-start"
          gap="sm"
          wrap="nowrap"
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "rgb(0,33,95)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = COLORS.secondaryColor;
          }}
        >
          {feature.icon && (
            <IconPointFilled
              size={16}
              color={"inherit"}
              style={{ flexShrink: 0, marginTop: 4 }}
            />
          )}

          <div style={{ flex: 1 }}>
            <Text size={TYPOGRAPHY.body.normal} fw={500} c={"inherit"} lh={1.5}>
              {feature.title}
            </Text>

            <Text size={TYPOGRAPHY.body.normal} c="dimmed">
              {feature.description}
            </Text>
          </div>
        </Group>
      </Link>
    </Box>
  );
});

DrawerFeatureItem.displayName = "DrawerFeatureItem";

const Header = () => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const currentPath = usePathname();
  const router = useRouter();
  const { startLoading } = useLoading();

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const authTarget = isLoggedIn ? "/dashboard" : "/auth/login";
  const authLabel = isLoggedIn ? "Dashboard" : "Log";

  const isAuthTargetPage = useMemo(
    () => currentPath === authTarget || currentPath === `${authTarget}/`,
    [currentPath, authTarget],
  );

  const isContactPage = useMemo(
    () => currentPath === "/contact" || currentPath === "/contact/",
    [currentPath],
  );

  /* close drawer on route change */
  useEffect(() => {
    closeDrawer();
  }, [currentPath]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hasSession =
      Boolean(window.localStorage.getItem("token")) ||
      Boolean(window.localStorage.getItem("authToken"));
    setIsLoggedIn(hasSession);
  }, []);

  const headerStyle = useMemo(
    () => ({
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
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }),
    [],
  );

  const handleLogoClick = useCallback(() => {
    startLoading();
  }, [startLoading]);

  const handleAuthClick = useCallback(() => {
    startLoading();
    router.push(authTarget);
  }, [startLoading, router, authTarget]);

  const handleTalkToPrimeClick = useCallback(() => {
    startLoading();
    router.push("/contact");
  }, [startLoading, router]);

  const handleDrawerTalkToPrimeClick = useCallback(() => {
    startLoading();
    router.push("/contact");
    closeDrawer();
  }, [startLoading, router, closeDrawer]);

  const handleDrawerItemClick = useCallback(
    (item) => {
      if (item.dropdown) {
        setOpenDropdown(openDropdown === item.label ? null : item.label);
      } else {
        closeDrawer();
        startLoading();
        router.push(item.links);
      }
    },
    [openDropdown, closeDrawer, startLoading, router],
  );

  const handleDrawerAuthClick = useCallback(() => {
    startLoading();
    router.push(authTarget);
    closeDrawer();
  }, [startLoading, router, closeDrawer, authTarget]);

  const buttonStyle = useMemo(
    () => ({
      border: "2px solid rgb(0, 33, 95)",
      color: isAuthTargetPage ? "white" : "rgb(0, 33, 95)",
      backgroundColor: isAuthTargetPage ? "rgb(0, 33, 95)" : "transparent",
      transition: "all 0.25s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
    }),
    [isAuthTargetPage],
  );

  const talkToPrimeButtonStyle = useMemo(
    () => ({
      border: "2px solid rgb(0, 33, 95)",
      color: isContactPage ? "white" : "rgb(0, 33, 95)",
      backgroundColor: isContactPage ? "rgb(0, 33, 95)" : "transparent",
      transition: "all 0.25s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
    }),
    [isContactPage],
  );

  const handleButtonMouseEnter = useCallback((e) => {
    e.currentTarget.style.backgroundColor = "rgb(0, 33, 95)";
    e.currentTarget.style.color = "white";
  }, []);

  const handleButtonMouseLeave = useCallback(
    (e) => {
      if (!isAuthTargetPage) {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = "rgb(0, 33, 95)";
      }
    },
    [isAuthTargetPage],
  );

  const handleTalkToPrimeMouseEnter = useCallback((e) => {
    e.currentTarget.style.backgroundColor = "rgb(0, 33, 95)";
    e.currentTarget.style.color = "white";
  }, []);

  const handleTalkToPrimeMouseLeave = useCallback(
    (e) => {
      if (!isContactPage) {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = "rgb(0, 33, 95)";
      }
    },
    [isContactPage],
  );

  return (
    <Container fluid px="2%">
      <Box>
        <header style={headerStyle}>
          <Flex justify="space-between" align="center" h="50" w="100%">
            {/* ── Logo ── */}
            <Link
              href="/"
              onClick={handleLogoClick}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 5,
              }}
            >
              <Image src={Images.logo_only} alt="Logo" h={48} />
              <Flex
                align="center"
                justify="center"
                style={{
                  textDecoration: "none",
                  flexDirection: "column",
                  alignSelf: "flex-end",
                }}
              >
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
                <Text
                  size="xs"
                  fw={500}
                  c="rgb(0, 33, 95)"
                  style={{ alignSelf: "flex-start" }}
                >
                  Logistics.Automated
                </Text>
              </Flex>
            </Link>

            {/* ── Desktop nav ── */}
            <Flex
              h="100%"
              gap={30}
              align="center"
              visibleFrom="md"
              style={{ flex: 1, justifyContent: "center" }}
            >
              {navItems.map((item) => (
                <NavLink key={item.label} item={item} />
              ))}
            </Flex>

            {/* ── Desktop CTA (Talk to Prime + Login/Dashboard, grouped at end) ── */}
            <Group
              gap="sm"
              wrap="nowrap"
              visibleFrom="md"
              style={{ flexShrink: 0, minWidth: "fit-content" }}
            >
              <Button
                variant="outline"
                size="md"
                fz={TYPOGRAPHY.body.normal}
                radius="md"
                leftSection={<IconPhone stroke={1.5} size={18} />}
                onClick={handleTalkToPrimeClick}
                style={talkToPrimeButtonStyle}
                onMouseEnter={handleTalkToPrimeMouseEnter}
                onMouseLeave={handleTalkToPrimeMouseLeave}
              >
                Talk to Prime
              </Button>
              <Button
                variant="outline"
                size="md"
                fz={TYPOGRAPHY.body.normal}
                radius="md"
                leftSection={
                  isLoggedIn ? (
                    <IconLayoutDashboard stroke={1.5} size={18} />
                  ) : (
                    <IconLogin stroke={1.5} size={18} />
                  )
                }
                onClick={handleAuthClick}
                style={buttonStyle}
                onMouseEnter={handleButtonMouseEnter}
                onMouseLeave={handleButtonMouseLeave}
              >
                {authLabel}
              </Button>
            </Group>

            {/* ── Burger ── */}
            <Burger
              opened={drawerOpened}
              color={COLORS.secondaryColor}
              onClick={toggleDrawer}
              hiddenFrom="md"
              aria-label="Toggle navigation menu"
            />
          </Flex>
        </header>
      </Box>

      {/* ── Mobile / Tablet Drawer ── */}
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        withCloseButton={false}
        padding={0}
        size="80%"
        position="right"
        zIndex={10000}
        hiddenFrom="md"
        styles={{
          body: {
            padding: 0,
            height: "100%",
            display: "flex",
            flexDirection: "column",
          },
          content: { borderRadius: "0 0 0 16px" },
          overlay: { backdropFilter: "blur(4px)" },
        }}
      >
        {/* Drawer header row */}
        <Flex
          align="center"
          justify="space-between"
          px={20}
          py={16}
          style={{ borderBottom: "1px solid #f0f0f0", flexShrink: 0 }}
        >
          <Link
            href="/"
            onClick={handleLogoClick}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 5,
            }}
          >
            <Image src={Images.logo_only} alt="Logo" h={48} />
            <Flex
              align="center"
              justify="center"
              style={{
                textDecoration: "none",
                flexDirection: "column",
                alignSelf: "flex-end",
              }}
            >
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
              <Text
                size="xs"
                fw={500}
                c="rgb(0, 33, 95)"
                style={{ alignSelf: "flex-start" }}
              >
                Logistics.Automated
              </Text>
            </Flex>
          </Link>
          <UnstyledButton
            onClick={closeDrawer}
            aria-label="Close menu"
            style={{ display: "flex", padding: 4 }}
          >
            <IconX size={22} stroke={2} color="#374151" />
          </UnstyledButton>
        </Flex>

        {/* Drawer nav items */}
        <Box px={20} py={8} style={{ flex: 1, overflowY: "auto" }}>
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
                  padding: "12px 0",
                  borderBottom: "1px solid #f0f0f0",
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
                    style={{
                      transition: "transform 0.2s ease",
                      transform:
                        openDropdown === item.label
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                    }}
                  />
                )}
              </Text>

              {item.dropdown && featuresMap[item.label] && (
                <Collapse in={openDropdown === item.label}>
                  <Box py={4} pb={12}>
                    {featuresMap[item.label].map((feature) => (
                      <DrawerFeatureItem
                        key={feature.title}
                        feature={feature}
                        onClose={closeDrawer}
                      />
                    ))}
                  </Box>
                </Collapse>
              )}
            </Box>
          ))}
        </Box>

        {/* Drawer footer CTA — Talk to Prime + Login/Dashboard */}
        <Stack
          gap="sm"
          px={20}
          py={20}
          style={{ borderTop: "1px solid #f0f0f0", flexShrink: 0 }}
        >
          <Button
            variant="outline"
            size="md"
            radius="md"
            fullWidth
            leftSection={<IconPhone stroke={1.5} size={18} />}
            styles={{
              label: { fontSize: TYPOGRAPHY.body.normal },
            }}
            style={{
              border: "2px solid rgb(0, 33, 95)",
              color: "rgb(0, 33, 95)",
              height: "48px",
            }}
            onClick={handleDrawerTalkToPrimeClick}
          >
            Talk to Prime
          </Button>
          <Button
            variant="filled"
            size="md"
            radius="md"
            fullWidth
            leftSection={
              isLoggedIn ? (
                <IconLayoutDashboard stroke={1.5} size={18} />
              ) : (
                <IconLogin stroke={1.5} size={18} />
              )
            }
            styles={{
              label: { fontSize: TYPOGRAPHY.body.normal },
            }}
            style={{
              backgroundColor: "rgb(0, 33, 95)",
              color: "white",
              height: "48px",
            }}
            onClick={handleDrawerAuthClick}
          >
            {authLabel}
          </Button>
        </Stack>
      </Drawer>
    </Container>
  );
};

export default memo(Header);
