"use client";

import React, { useCallback, useState } from "react";
import {
  ActionIcon,
  Box,
  Center,
  Modal,
  Image,
  SimpleGrid,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconChevronLeft,
  IconChevronRight,
  IconPlayerPlay,
  IconX,
} from "@tabler/icons-react";
import { COLORS } from "@/app/utils/COLORS";
import { TYPOGRAPHY } from "@/app/utils/TYPOGRAPHY";

const ODC_VIDEOS = [
  "/cargo-videos/cargo-video-1.mp4",
  "/cargo-videos/cargo-video-2.mp4",
  "/cargo-videos/cargo-video-3.mp4",
  "/cargo-videos/cargo-video-4.mp4",
  "/cargo-videos/cargo-video-5.mp4",
  "/cargo-videos/cargo-video-6.mp4",
  "/cargo-videos/cargo-video-8.mp4",
];

const BREAK_BULK_IMAGES = [
  { src: "/break-bulk-images/break-bulk-cargo-1.jpeg", alt: "break-bulk-cargo-1" },
  { src: "/break-bulk-images/break-bulk-cargo-2.jpeg", alt: "break-bulk-cargo-2" },
  { src: "/break-bulk-images/break-bulk-cargo-3.jpeg", alt: "break-bulk-cargo-3" },
  { src: "/break-bulk-images/break-bulk-cargo-4.jpeg", alt: "break-bulk-cargo-4" },
  { src: "/break-bulk-images/break-bulk-cargo-5.jpeg", alt: "break-bulk-cargo-5" },
  { src: "/break-bulk-images/break-bulk-cargo-6.jpeg", alt: "break-bulk-cargo-6" },
  { src: "/break-bulk-images/break-bulk-cargo-7.jpeg", alt: "break-bulk-cargo-7" },
  { src: "/break-bulk-images/break-bulk-cargo-8.jpeg", alt: "break-bulk-cargo-8" },
  { src: "/break-bulk-images/break-bulk-cargo-9.jpeg", alt: "break-bulk-cargo-9" },
  { src: "/break-bulk-images/break-bulk-cargo-10.jpeg", alt: "break-bulk-cargo-10" },
  { src: "/break-bulk-images/break-bulk-cargo-11.jpeg", alt: "break-bulk-cargo-11" },
  { src: "/break-bulk-images/break-bulk-cargo-12.jpeg", alt: "break-bulk-cargo-12" },
  { src: "/break-bulk-images/break-bulk-cargo-13.jpeg", alt: "break-bulk-cargo-13" },
  { src: "/break-bulk-images/break-bulk-cargo-14.jpeg", alt: "break-bulk-cargo-14" },
];

const BREAK_BULK_VIDEOS = ["/break-bulk-images/break-bulk-cargo-video-1.mp4"];

const VESSEL_IMAGES = [
  { src: "/vessel-images/vessel-01.jpeg", alt: "vessel-image-1" },
  { src: "/vessel-images/vessel-02.jpeg", alt: "vessel-image-2" },
  { src: "/vessel-images/vessel-03.jpeg", alt: "vessel-image-3" },
  { src: "/vessel-images/vessel-04.jpeg", alt: "vessel-image-4" },
  { src: "/vessel-images/vessel-05.jpeg", alt: "vessel-image-5" },
];

const CHARTERING_IMAGES = [
  { src: "/chartering-coastal-movements/cargo-project-picture-1.jpg", alt: "cargo-project-picture-1" },
  { src: "/chartering-coastal-movements/cargo-project-picture-2.jpg", alt: "cargo-project-picture-2" },
  { src: "/chartering-coastal-movements/cargo-project-picture-5.jpg", alt: "cargo-project-picture-5" },
];

const CHARTERING_VIDEOS = ["/chartering-coastal-movements/cargo-video-7.mp4"];

const sectionTitleStyle = {
  marginBottom: 24,
  fontWeight: 800,
  color: "#00215f",
};

const thumbStyle = {
  aspectRatio: "16/10",
  borderRadius: 8,
  overflow: "hidden",
  position: "relative",
  backgroundColor: COLORS.accordian_background,
  transition: "all 0.2s ease-in-out",
  width: "100%",
  display: "block",
};

const toVideoItems = (sources) =>
  sources.map((src) => ({ type: "video", src, alt: "" }));

const toImageItems = (images) =>
  images.map(({ src, alt }) => ({ type: "image", src, alt }));

const getGridCols = (isSm, isMd) => {
  if (isMd) return 4;
  if (isSm) return 3;
  return 2;
};

function MediaThumb({ item, onClick, onHover }) {
  return (
    <UnstyledButton
      style={thumbStyle}
      onClick={onClick}
      onMouseEnter={(e) => onHover?.(e, true)}
      onMouseLeave={(e) => onHover?.(e, false)}
    >
      {item.type === "image" ? (
        <Image src={item.src} alt={item.alt} fit="cover" w="100%" h="100%" />
      ) : (
        <>
          <video
            src={item.src}
            preload="metadata"
            muted
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          <Box
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(0,0,0,0.3)",
            }}
          >
            <IconPlayerPlay size={36} color="white" fill="white" />
          </Box>
        </>
      )}
    </UnstyledButton>
  );
}

function ShowMoreCard({ onClick, onHover }) {
  return (
    <UnstyledButton
      style={{
        ...thumbStyle,
        background: "linear-gradient(135deg, #00215f 0%, #0fc9f2 100%)",
      }}
      onClick={onClick}
      onMouseEnter={(e) => onHover?.(e, true)}
      onMouseLeave={(e) => onHover?.(e, false)}
    >
      <Center h="100%">
        <Text c="white" fw={700} size="lg" ta="center">
          Show More
        </Text>
      </Center>
    </UnstyledButton>
  );
}

function GallerySection({ title, items, isMobile, gridCols, onOpenGallery, isFirst = false }) {
  const maxPreviewCount = Math.max(gridCols * 2 - 1, 1);
  const hasMore = items.length > maxPreviewCount;
  const previewItems = hasMore ? items.slice(0, maxPreviewCount) : items;

  const handleThumbHover = (e, active) => {
    e.currentTarget.style.transform = active ? "translateY(-2px)" : "translateY(0)";
    e.currentTarget.style.boxShadow = active
      ? "0 8px 20px rgba(0,0,0,0.35)"
      : "none";
  };

  const openAt = (index) => onOpenGallery(items, index);

  const sectionBoxStyle = {
    backgroundColor: "white",
    padding: "40px 32px",
    borderRadius: 16,
    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
  };

  if (isMobile) {
    return (
      <Box mt={isFirst ? 0 : 40} style={sectionBoxStyle}>
        <Title order={2} mb={24} size={TYPOGRAPHY.h4.desktop} style={sectionTitleStyle}>
          {title}
        </Title>
        <Carousel
          slideSize="85%"
          slideGap="md"
          align="start"
          withControls
          controlSize={32}
          styles={{
            control: {
              backgroundColor: "rgba(0, 33, 95, 0.85)",
              color: "#fff",
              border: "none",
            },
          }}
        >
          {items.map((item, index) => (
            <Carousel.Slide key={`${item.src}-${index}`}>
              <MediaThumb
                item={item}
                onClick={() => openAt(index)}
                onHover={handleThumbHover}
              />
            </Carousel.Slide>
          ))}
        </Carousel>
      </Box>
    );
  }

  return (
    <Box mt={isFirst ? 0 : 40} style={sectionBoxStyle}>
      <Title order={2} mb={24} size={TYPOGRAPHY.h4.desktop} style={sectionTitleStyle}>
        {title}
      </Title>
      <SimpleGrid cols={gridCols} spacing="md" mb={24}>
        {previewItems.map((item, index) => (
          <MediaThumb
            key={`${item.src}-${index}`}
            item={item}
            onClick={() => openAt(index)}
            onHover={handleThumbHover}
          />
        ))}
        {hasMore && (
          <ShowMoreCard
            onClick={() => openAt(maxPreviewCount)}
            onHover={handleThumbHover}
          />
        )}
      </SimpleGrid>
    </Box>
  );
}

function GalleryModal({ opened, items, initialIndex, onClose }) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  React.useEffect(() => {
    if (opened) setActiveIndex(initialIndex);
  }, [opened, initialIndex]);

  const goPrev = () => {
    setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const current = items[activeIndex];
  const modalButtonStyle = {
    backgroundColor: "rgb(0, 33, 95)",
    color: "#fff",
    border: "none",
  };
  const mediaViewportStyle = {
    height: "min(380px, 60vh)",
    minHeight: "min(380px, 60vh)",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    overflow: "hidden",
  };
  const mediaFillStyle = {
    width: "100%",
    height: "100%",
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain",
    objectPosition: "center",
    display: "block",
    backgroundColor: "#ffffff",
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      withCloseButton={false}
      padding={0}
      styles={{
        inner: {
          alignItems: "flex-start",
          justifyContent: "center",
          paddingTop: 100,
          paddingBottom: 24,
        },
        content: {
          backgroundColor: "#ffffff",
          width: "70vw",
          maxWidth: "70vw",
          minWidth: "min(70vw, calc(100vw - 24px))",
          flex: "0 0 70vw",
          "--modal-size": "70vw",
          marginTop: 0,
        },
        body: { padding: 0, backgroundColor: "#ffffff", width: "100%" },
      }}
    >
      <Box
        w="100%"
        style={{ position: "relative", backgroundColor: "#ffffff" }}
      >
        <ActionIcon
          onClick={onClose}
          aria-label="Close gallery"
          variant="filled"
          radius="xl"
          size="lg"
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            zIndex: 20,
            ...modalButtonStyle,
          }}
        >
          <IconX size={18} color="#fff" />
        </ActionIcon>

        {items.length > 1 && (
          <>
            <ActionIcon
              onClick={goPrev}
              aria-label="Previous"
              variant="filled"
              radius="xl"
              size="xl"
              style={{
                position: "absolute",
                left: 12,
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 20,
                ...modalButtonStyle,
              }}
            >
              <IconChevronLeft size={22} color="#fff" />
            </ActionIcon>
            <ActionIcon
              onClick={goNext}
              aria-label="Next"
              variant="filled"
              radius="xl"
              size="xl"
              style={{
                position: "absolute",
                right: 12,
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 20,
                ...modalButtonStyle,
              }}
            >
              <IconChevronRight size={22} color="#fff" />
            </ActionIcon>
          </>
        )}

        <Box w="100%" pt={50} pb="sm" px={0}>
          <Box style={mediaViewportStyle}>
            {current?.type === "image" && (
              <Box
                component="img"
                src={current.src}
                alt={current.alt}
                style={mediaFillStyle}
              />
            )}
            {current?.type === "video" && (
              <video
                key={current.src}
                src={current.src}
                controls
                autoPlay
                style={mediaFillStyle}
              />
            )}
          </Box>
        </Box>

        {items.length > 1 && (
          <Text ta="center" c="rgb(0, 33, 95)" size="sm" pb="md" fw={600}>
            {activeIndex + 1} / {items.length}
          </Text>
        )}
      </Box>
    </Modal>
  );
}

export default function GalleryPage() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isSm = useMediaQuery("(min-width: 576px)");
  const isMd = useMediaQuery("(min-width: 992px)");
  const gridCols = getGridCols(isSm, isMd);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalItems, setModalItems] = useState([]);
  const [modalIndex, setModalIndex] = useState(0);

  const openGallery = useCallback((items, index = 0) => {
    setModalItems(items);
    setModalIndex(index);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setModalItems([]);
    setModalIndex(0);
  }, []);

  const odcItems = toVideoItems(ODC_VIDEOS);
  const vesselItems = toImageItems(VESSEL_IMAGES);
  const breakBulkItems = [
    ...toVideoItems(BREAK_BULK_VIDEOS),
    ...toImageItems(BREAK_BULK_IMAGES),
  ];
  const charteringItems = [
    ...toVideoItems(CHARTERING_VIDEOS),
    ...toImageItems(CHARTERING_IMAGES),
  ];

  return (
    <Box
      py={40}
      pt={100}
      px="2%"
      style={{ backgroundColor: COLORS.backgroundColor, minHeight: "60vh" }}
    >
      <Box mx="auto">
        <Box
          mb={40}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Title order={1} ta="center" mb={8} style={{ color: "#0fc9f2", fontWeight: 800 }}>
            Cargo Movements
          </Title>
          <Text size="sm" style={{ fontWeight: 600 }}>
            See How we Deliver
          </Text>
        </Box>

        <GallerySection
          title="ODC Project Cargo"
          items={odcItems}
          isMobile={isMobile}
          gridCols={gridCols}
          onOpenGallery={openGallery}
          isFirst
        />
        <GallerySection
          title="Our Fleet / Vessels"
          items={vesselItems}
          isMobile={isMobile}
          gridCols={gridCols}
          onOpenGallery={openGallery}
        />
        <GallerySection
          title="Break Bulk Cargo"
          items={breakBulkItems}
          isMobile={isMobile}
          gridCols={gridCols}
          onOpenGallery={openGallery}
        />
        <GallerySection
          title="Chartering and Coastal Movements"
          items={charteringItems}
          isMobile={isMobile}
          gridCols={gridCols}
          onOpenGallery={openGallery}
        />
      </Box>

      <GalleryModal
        opened={modalOpen}
        items={modalItems}
        initialIndex={modalIndex}
        onClose={closeModal}
      />
    </Box>
  );
}
