"use client";
import { useEffect, useState, useMemo, memo, useCallback, useRef } from "react";
import { COLORS } from "@/app/utils/COLORS";
import { TYPOGRAPHY } from "@/app/utils/TYPOGRAPHY";
import Images from "@/app/utils/image";
import {
  ActionIcon,
  Alert,
  AspectRatio,
  Autocomplete,
  Box,
  Button,
  Container,
  Flex,
  Group,
  Image,
  Select,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import {
  IconArrowNarrowRight,
  IconArrowsDownUp,
  IconArrowsLeftRight,
  IconMapPin,
  IconPlaneInflight,
  IconShip,
} from "@tabler/icons-react";
import { highlightText } from "../utils/highlightText";
import { useQuery } from "@tanstack/react-query";
import { apiCallProtected } from "../api/api";
import { useForm } from "@mantine/form";
import PortComponent from "../component/PortComponent";
import { Notifications, notifications } from "@mantine/notifications";
import { useMediaQuery } from "@mantine/hooks";
import useTransportStore from "../store/transportStore";
import { useRouter } from "next/navigation";
import useCustomerRequestStore from "../store/customerRequestStore";
import values from "lodash/values";
import getEmojiFlag from "../utils/isoMap";

const TransportOption = memo(({ type, icon, activeTransport, onClick }) => (
  <Group
    style={{
      ...styles.groupstyle,
      color: COLORS.primaryColor,
      backgroundColor:
        type === activeTransport ? COLORS.secondaryColor : "transparent",
      cursor: type !== activeTransport ? "pointer" : "default",
    }}
    onClick={() => onClick(type)}
    gap={10}
  >
    {icon}
    <Text size="sm" lh="xs" fw={500}>
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </Text>
  </Group>
));

const Hero = ({ title, content }) => {
  const { seaData, airData, setSeaData, setAirData } = useTransportStore();
  const { setFormValues } = useCustomerRequestStore();
  const router = useRouter();

  // ── Breakpoints ──────────────────────────────────────────────────────────
  const isMobile = useMediaQuery("(max-width: 576px)");
  const isTablet = useMediaQuery("(max-width: 768px)");
  const isTabletOrBelow = useMediaQuery("(max-width: 1024px)");

  const Icon = IconArrowsDownUp;
  const notificationShownRef = useRef(false);
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef(null);

  // ── Video cycle (unchanged logic) ────────────────────────────────────────
  useEffect(() => {
    if (isMobile) return;

    const video = videoRef.current;
    if (!video) return;

    let timer;

    const startCycle = () => {
      setShowVideo(false);
      timer = setTimeout(() => {
        setShowVideo(true);
        video.currentTime = 0;
        video.play();
      }, 4000);
    };

    startCycle();
    video.addEventListener("ended", startCycle);

    return () => {
      clearTimeout(timer);
      video.removeEventListener("ended", startCycle);
    };
  }, [isMobile]);

  // ── Queries (unchanged) ──────────────────────────────────────────────────
  const { data: seaPortData } = useQuery({
    queryKey: [`seaPortData`],
    queryFn: async () => {
      const response = await apiCallProtected.get(`pentagon/seaPortData`);
      return response.data;
    },
    refetchOnWindowFocus: false,
    select: (data) =>
      data?.data?.map((item) => ({
        label: `${item.name} - (${item.code})`,
        value: String(item.id),
        code: item.code,
        name: item.name,
        country: item.country,
        city: item.city || item.name || "",
      })) || [],
  });

  const { data: airPortData } = useQuery({
    queryKey: [`airPortData`],
    queryFn: async () => {
      const response = await apiCallProtected.get(`pentagon/airPortData`);
      return response.data;
    },
    refetchOnWindowFocus: false,
    select: (data) => {
      return (
        data?.data?.map((item) => ({
          label: `${item.name} - (${item.code})`,
          value: String(item.id),
          code: item.code,
          name: item.name,
          country: item.country,
          city: item.city || item.name || "",
        })) || []
      );
    },
  });

  // ── Form state (unchanged) ────────────────────────────────────────────────
  const [formValue, setFormValue] = useState({
    typeOfBooking: "FCL",
    origin: "",
    destination: "",
    code: "",
    activeTransport: "sea",
    transportData: [],
    memoizedTransportData: seaData,
  });

  const [filteredOriginOptions, setFilteredOriginOptions] = useState(
    seaData || [],
  );
  const [filteredDestinationOptions, setFilteredDestinationOptions] = useState(
    seaData || [],
  );

  useEffect(() => {
    if (seaPortData) setSeaData(seaPortData || []);
    if (airPortData) setAirData(airPortData || []);
  }, [seaPortData, airPortData]);

  useEffect(() => {
    if (formValue?.memoizedTransportData) {
      if (formValue?.destination?.destination) {
        const filteredOrigins = formValue.memoizedTransportData.filter(
          (item) => item.value !== formValue.destination.destination,
        );
        setFilteredOriginOptions(filteredOrigins);
      } else {
        setFilteredOriginOptions(formValue.memoizedTransportData);
      }

      if (formValue?.origin?.origin) {
        const filteredDestinations = formValue.memoizedTransportData.filter(
          (item) => item.value !== formValue.origin.origin,
        );
        setFilteredDestinationOptions(filteredDestinations);
      } else {
        setFilteredDestinationOptions(formValue.memoizedTransportData);
      }
    }
  }, [
    formValue?.origin?.origin,
    formValue?.destination?.destination,
    formValue?.memoizedTransportData,
  ]);

  useEffect(() => {
    if (
      formValue?.origin?.origin &&
      formValue?.destination?.destination &&
      formValue.origin.origin === formValue.destination.destination &&
      !notificationShownRef.current
    ) {
      notifications.show({
        title: "Error",
        message: "Origin and destination cannot be the same",
        color: "red",
      });

      notificationShownRef.current = true;

      setFormValue((prev) => ({
        ...prev,
        destination: {
          destination: "",
          port: "",
          name: "",
          code: "",
        },
      }));

      setTimeout(() => {
        notificationShownRef.current = false;
      }, 1000);
    }
  }, [formValue?.origin?.origin, formValue?.destination?.destination]);

  useEffect(() => {
    setFormValue((prev) => ({
      ...prev,
      memoizedTransportData: prev.activeTransport === "sea" ? seaData : airData,
      origin: { origin: null },
      destination: { destination: null },
    }));
    setFilteredOriginOptions(
      formValue.activeTransport === "sea" ? seaData : airData,
    );
    setFilteredDestinationOptions(
      formValue.activeTransport === "sea" ? seaData : airData,
    );
  }, [formValue.activeTransport, seaData, airData]);

  const swapOriginDestination = useCallback(() => {
    if (!formValue?.origin?.origin || !formValue?.destination?.destination) {
      notifications.show({
        title: "Error",
        message: "Both origin and destination must be selected to swap",
        color: "red",
      });
      return;
    }

    setFormValue((prevValues) => ({
      ...prevValues,
      origin: {
        ...prevValues.destination,
        origin: prevValues.destination.destination,
        name: prevValues.destination.name,
        code: prevValues.destination.code,
        country: prevValues.destination.country,
        city: prevValues.destination.city,
      },
      destination: {
        ...prevValues.origin,
        destination: prevValues.origin.origin,
        name: prevValues.origin.name,
        code: prevValues.origin.code,
        country: prevValues.origin.country,
        city: prevValues.origin.city,
      },
    }));
  }, [formValue]);

  const isFormValid = useMemo(() => {
    return (
      formValue?.origin?.origin &&
      formValue?.destination?.destination &&
      formValue.origin.origin !== formValue.destination.destination
    );
  }, [formValue?.origin?.origin, formValue?.destination?.destination]);

  const [formErrors, setFormErrors] = useState({
    origin: false,
    destination: false,
  });

  const handleGetQuote = () => {
    setFormErrors({
      origin: !formValue?.origin?.origin,
      destination: !formValue?.destination?.destination,
    });

    if (!formValue?.origin?.origin || !formValue?.destination?.destination) {
      notifications.show({
        title: "Error",
        message: "Please select both origin and destination",
        color: "red",
      });
      return;
    }

    if (formValue.origin.origin === formValue.destination.destination) {
      notifications.show({
        title: "Error",
        message: "Origin and destination cannot be the same",
        color: "red",
      });
      return;
    }

    const formDataToStore = {
      ...formValue,
      memoizedTransportData:
        formValue.memoizedTransportData ||
        (formValue.activeTransport === "sea" ? seaData : airData),
    };
    setFormValues(formDataToStore);
    setTimeout(() => {
      router.push(`/customer-request-form/`);
    }, 50);
  };

  // ── Derived responsive values ─────────────────────────────────────────────
  // swap icon direction: vertical on desktop (fields stacked), horizontal on mobile row
  const SwapIcon = isMobile ? IconArrowsLeftRight : IconArrowsDownUp;

  // form card max-width: full on mobile, capped on larger screens
  const formCardMaxWidth = isMobile ? "100%" : isTablet ? "100%" : "550px";

  // title size
  const titleSize = isMobile
    ? TYPOGRAPHY.h1.mobile
    : isTabletOrBelow
      ? "36px"
      : "44px";

  return (
    <Box style={styles.heroContainer}>
      {/* overlay */}
      <Box
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(255,255,255,0.70)",
          boxShadow: "inset 0 -8px 20px -8px rgba(0, 0, 0, 0.25)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      <Container
        fluid
        px={isMobile ? "4%" : "2%"}
        mt={isTabletOrBelow ? 50 : 20}
        pt="60px"
        pb={isMobile ? 40 : 20}
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          minHeight: "100vh",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <Flex
          align={isTabletOrBelow ? "center" : "center"}
          justify="space-between"
          gap={isTabletOrBelow ? 24 : 40}
          direction={isTabletOrBelow ? "column" : "row"}
          w="100%"
          mih={!isMobile ? 500 : undefined}
        >
          {/* ── Left: Title + Form ── */}
          <Stack
            h="100%"
            w={isTabletOrBelow ? "100%" : "55%"}
            gap={0}
            justify={isTabletOrBelow ? "center" : "flex-start"}
            align={isTabletOrBelow ? "center" : "flex-start"}
          >
            <Title
              c="rgb(0, 33, 95)"
              style={{ zIndex: 100 }}
              fw={900}
              order={1}
              lh={isMobile ? "md" : "xl"}
              tt="uppercase"
              size={titleSize}
              ta={isTabletOrBelow ? "center" : "left"}
            >
              {highlightText(title)}
            </Title>

            <Box
              w="100%"
              style={{
                display: "flex",
                justifyContent: isTabletOrBelow ? "center" : "flex-start",
              }}
            >
              <Stack
                mt={isMobile ? "6%" : "4.25%"}
                gap={0}
                w="100%"
                p={isMobile ? 14 : 20}
                style={{
                  ...styles.transportOptions,
                  maxWidth: formCardMaxWidth,
                  borderRadius: isMobile ? "16px" : "24px",
                }}
              >
                {/* ── Transport type tabs ── */}
                <Flex gap={8}>
                  <TransportOption
                    type="sea"
                    icon={
                      <IconShip
                        size={isMobile ? 18 : 20}
                        color={COLORS.primaryColor}
                      />
                    }
                    activeTransport={formValue?.activeTransport}
                    onClick={() =>
                      setFormValue((prev) => ({
                        ...prev,
                        typeOfBooking: "FCL",
                        activeTransport: "sea",
                        origin: { origin: null },
                        destination: { destination: null },
                      }))
                    }
                  />
                  <TransportOption
                    type="air"
                    icon={
                      <IconPlaneInflight
                        size={isMobile ? 18 : 20}
                        color={COLORS.primaryColor}
                      />
                    }
                    activeTransport={formValue?.activeTransport}
                    onClick={() =>
                      setFormValue((prev) => ({
                        ...prev,
                        origin: { origin: null },
                        destination: { destination: null },
                        typeOfBooking: "AIR",
                        activeTransport: "air",
                      }))
                    }
                  />
                </Flex>

                {/* ── Origin / Destination + Swap ── */}
                <Flex direction="column" mt={5}>
                  <form>
                    <Flex
                      direction="row"
                      w="100%"
                      align="center"
                      gap={10}
                      justify="space-between"
                    >
                      <Box w="100%">
                        {/* Origin */}
                        <Select
                          placeholder="Origin"
                          size={isMobile ? "md" : "lg"}
                          searchable
                          spellCheck={false}
                          clearable
                          w="100%"
                          limit={5}
                          data={filteredOriginOptions}
                          className="custom-placeholder"
                          radius="md"
                          clearButtonProps={{ style: { color: "#afb1b4" } }}
                          error={
                            formErrors.origin ? "Please Select origin" : null
                          }
                          styles={{
                            input: {
                              fontSize: isMobile
                                ? TYPOGRAPHY.body.normal
                                : TYPOGRAPHY.input.large,
                              backgroundColor: "#ffffff45",
                              color: "#fff",
                              border: "2px solid white",
                              "::placeholder": { color: "#fff", opacity: 1 },
                            },
                            option: {
                              fontSize: TYPOGRAPHY.body.normal,
                              color: "#000",
                            },
                            dropdown: { color: "#fff" },
                            label: {
                              fontSize: TYPOGRAPHY.label.large,
                              fontWeight: "600",
                              color: "#fff",
                            },
                            error: {
                              padding: "10px 0",
                              fontSize: TYPOGRAPHY.caption.normal,
                              color: "red",
                            },
                          }}
                          classNames={{ input: "autocomplete-input" }}
                          autoComplete="off"
                          leftSection={
                            formValue?.origin?.country ? (
                              <img
                                src={`https://flagcdn.com/${getEmojiFlag(formValue?.origin?.country)}.svg`}
                                alt=""
                                style={{ width: 24, height: 20 }}
                              />
                            ) : (
                              <IconMapPin size={20} color="white" />
                            )
                          }
                          value={formValue?.origin?.origin}
                          onChange={(value, opt) =>
                            setFormValue((prev) => ({
                              ...prev,
                              origin: {
                                origin: value,
                                port: value,
                                name: opt?.name || "",
                                code: opt?.code || "",
                                country: opt?.country || "",
                                city: opt?.city || opt?.name || "",
                              },
                            }))
                          }
                        />

                        {/* Destination */}
                        <Select
                          mt={10}
                          placeholder="Destination"
                          searchable
                          spellCheck={false}
                          clearable
                          clearButtonProps={{ style: { color: "#afb1b4" } }}
                          size={isMobile ? "md" : "lg"}
                          limit={5}
                          data={filteredDestinationOptions}
                          radius="md"
                          w="100%"
                          error={
                            formErrors.destination
                              ? "Please select destination"
                              : null
                          }
                          styles={{
                            input: {
                              fontSize: isMobile
                                ? TYPOGRAPHY.body.normal
                                : TYPOGRAPHY.input.large,
                              backgroundColor: "#ffffff45",
                              color: "#fff",
                              border: "2px solid white",
                              textDecoration: "none",
                            },
                            item: { fontSize: TYPOGRAPHY.input.large },
                            option: {
                              fontSize: TYPOGRAPHY.body.normal,
                              color: "#000",
                            },
                            dropdown: { color: "#fff" },
                            label: {
                              fontSize: TYPOGRAPHY.label.large,
                              fontWeight: "600",
                              color: "#fff",
                            },
                            error: {
                              padding: "10px 0",
                              fontSize: TYPOGRAPHY.caption.normal,
                              color: "red",
                            },
                          }}
                          classNames={{ input: "autocomplete-input" }}
                          autoComplete="off"
                          leftSection={
                            formValue?.destination?.country ? (
                              <img
                                src={`https://flagcdn.com/${getEmojiFlag(formValue?.destination?.country)}.svg`}
                                alt=""
                                style={{ width: 24, height: 20 }}
                              />
                            ) : (
                              <IconMapPin size={20} color="white" />
                            )
                          }
                          value={formValue?.destination?.destination}
                          onChange={(value, opt) =>
                            setFormValue((prev) => ({
                              ...prev,
                              destination: {
                                destination: value,
                                port: value,
                                name: opt?.name || "",
                                code: opt?.code || "",
                                country: opt?.country || "",
                                city: opt?.city || opt?.name || "",
                              },
                            }))
                          }
                        />
                      </Box>

                      {/* Swap button */}
                      <ActionIcon
                        variant="default"
                        size={isMobile ? 28 : 32}
                        radius="xl"
                        bg={COLORS.secondaryColor}
                        style={{
                          borderColor: COLORS.secondaryColor,
                          flexShrink: 0,
                        }}
                        onClick={swapOriginDestination}
                        styles={{
                          root: { alignItems: "center" },
                        }}
                      >
                        <SwapIcon
                          size={isMobile ? 16 : 20}
                          color={COLORS.primaryColor}
                        />
                      </ActionIcon>
                    </Flex>

                    {/* Get Quote button */}
                    <Button
                      fullWidth
                      mt={isMobile ? 16 : 25}
                      size={isMobile ? "md" : "lg"}
                      fw={600}
                      styles={{
                        label: { fontSize: TYPOGRAPHY.button.large },
                      }}
                      bg="#0AC1F1"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#09B1D1";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#0AC1F1";
                      }}
                      radius="md"
                      c={COLORS.primaryColor}
                      onClick={handleGetQuote}
                    >
                      Get Quote
                    </Button>
                  </form>
                </Flex>
              </Stack>
            </Box>
          </Stack>

          {/* ── Right: Video / Text card ── */}
          {!isMobile && (
            <Box
              w={isTabletOrBelow ? "100%" : "50%"}
              maw={isTabletOrBelow ? "600px" : 800}
              mx="auto"
              pos="relative"
              style={{
                borderRadius: "16px",
                border: "3px solid #E0E0E0",
              }}
            >
              {/* Text overlay */}
              <Box
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundColor: "#fff",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: showVideo ? 0 : 1,
                  transform: showVideo ? "translateY(-10px)" : "translateY(0)",
                  transition: "opacity 0.8s ease, transform 0.8s ease",
                  pointerEvents: "none",
                  zIndex: 2,
                  padding: isTabletOrBelow ? "20px 16px" : "0 20px",
                  borderRadius: "16px",
                }}
              >
                <Text
                  size={isTabletOrBelow ? "md" : "lg"}
                  tt="uppercase"
                  align="center"
                  c="rgb(0, 33, 95)"
                  fw={700}
                >
                  {highlightText(
                    "#Book your shipment# as easy as booking an airline ticket",
                  )}
                </Text>
              </Box>

              {/* Video */}
              <Box
                style={{
                  width: "100%",
                  opacity: showVideo ? 1 : 0,
                  transition: "opacity 1s ease",
                  borderRadius: "16px",
                  // Ensure card has a minimum height on tablet so it's not collapsed
                  minHeight: isTabletOrBelow ? "220px" : undefined,
                }}
              >
                <video
                  ref={videoRef}
                  muted
                  playsInline
                  preload="metadata"
                  style={{
                    width: "100%",
                    borderRadius: "16px",
                    objectFit: "cover",
                  }}
                >
                  <source src="/Pentagon-Final.mp4" type="video/mp4" />
                </video>
              </Box>
            </Box>
          )}
        </Flex>
      </Container>
    </Box>
  );
};

export default Hero;

const styles = {
  heroContainer: {
    position: "relative",
    minHeight: "100vh",
    backgroundImage: "url(/images/hero_background_3.jpeg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    overflow: "hidden",
  },
  overlayContainer: {
    position: "relative",
    width: "100%",
    maxWidth: "45vw",
    height: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  overlayImage: {
    position: "absolute",
    top: "-100px",
    left: "75%",
    transform: "translate(-50% , 10%)",
    width: "45%",
    objectFit: "contain",
    zIndex: 1,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  transportOptions: {
    color: "#fff",
    borderRadius: "24px",
    backgroundColor: "#222",
    gap: "10px",
  },
  groupstyle: {
    padding: "10px 16px",
    borderRadius: "10px",
  },
};
