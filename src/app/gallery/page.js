"use client";

import React, { useState, useCallback } from "react";
import {
  Box,
  Title,
  SimpleGrid,
  Modal,
  Image,
  UnstyledButton,
  Text,
} from "@mantine/core";
import { IconPlayerPlay } from "@tabler/icons-react";
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
};

export default function GalleryPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const openModal = useCallback((type, src, alt = "") => {
    setSelected({ type, src, alt });
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setSelected(null);
  }, []);

  return (
    <Box py={40} pt={100} px="2%" style={{ backgroundColor: COLORS.backgroundColor, minHeight: "60vh" }}>
      <Box mx="auto">
        <Box mb={40} style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
          <Title order={1} ta="center" mb={8} style={{ color: "#0fc9f2", fontWeight: 800 }}>
            Cargo Showcase
          </Title>
          <Text size="sm" style={{fontWeight:600}}>See How we Deliver</Text>
        </Box>

          {/* ODC Project Cargo Videos */}
        <Box style={{backgroundColor:"white", padding:"40px 32px", borderRadius:16, boxShadow:"0 0 10px 0 rgba(0, 0, 0, 0.1)"}}>
          <Title order={2} mb={24} size={TYPOGRAPHY.h4.desktop} style={sectionTitleStyle}>
            ODC Project Cargo
          </Title>

          <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} spacing="md" mb={24}>
            {ODC_VIDEOS.map((src, i) => (
              <UnstyledButton
                key={src}
                style={thumbStyle}
                onClick={() => openModal("video", src)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.35)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <video
                  src={src}
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
              </UnstyledButton>
            ))}
          </SimpleGrid>
        </Box>

        {/* Break Bulk Cargo Images */}
        <Box mt={40} style={{backgroundColor:"white", padding:"40px 32px", borderRadius:16, boxShadow:"0 0 10px 0 rgba(0, 0, 0, 0.1)"}}>
          <Title order={2} mb={24} size={TYPOGRAPHY.h4.desktop} style={sectionTitleStyle}>
            Break Bulk Cargo
          </Title>
          <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} spacing="md" mb={24}>
            {BREAK_BULK_IMAGES.map(({ src, alt }) => (
              <UnstyledButton
                key={src}
                style={thumbStyle}
                onClick={() => openModal("image", src, alt)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.35)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <Image src={src} alt={alt} fit="cover" w="100%" h="100%" />
              </UnstyledButton>
            ))}
          </SimpleGrid>
        </Box>

        {/* Chartering and Coastal Movements */}
        <Box mt={40} style={{backgroundColor:"white", padding:"40px 32px", borderRadius:16, boxShadow:"0 0 10px 0 rgba(0, 0, 0, 0.1)"}}>
          <Title order={2} mb={24} size={TYPOGRAPHY.h4.desktop} style={sectionTitleStyle}>
            Chartering and Coastal Movements
          </Title>
          <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} spacing="md" mb={24}>
            {CHARTERING_IMAGES.map(({ src, alt }) => (
              <UnstyledButton
                key={src}
                style={thumbStyle}
                onClick={() => openModal("image", src, alt)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.35)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <Image src={src} alt={alt} fit="cover" w="100%" h="100%" />
              </UnstyledButton>
            ))}
            {CHARTERING_VIDEOS.map((src) => (
              <UnstyledButton
                key={src}
                style={thumbStyle}
                onClick={() => openModal("video", src)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.35)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <video
                  src={src}
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
              </UnstyledButton>
            ))}
          </SimpleGrid>
        </Box>
      </Box>

      <Modal
        opened={modalOpen}
        onClose={closeModal}
        size="lg"
        centered
        withCloseButton={false}
        title={null}
        padding={0}
      >
        <div style={{ position: "relative" }}>
          {/* Close Button */}
          <button
            onClick={closeModal}
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              zIndex: 10,
              background: "rgba(0,0,0,0.6)",
              color: "white",
              border: "none",
              borderRadius: "50%",
              width: 32,
              height: 32,
              cursor: "pointer",
              fontSize: 18,
            }}
          >
            ×
          </button>

          {selected?.type === "image" && (
            <Image
              src={selected.src}
              alt={selected.alt}
              fit="contain"
              w="100%"
              style={{maxHeight:"70vh",display:"block"}}
            />
          )}

          {selected?.type === "video" && (
            <video
              src={selected.src}
              controls
              autoPlay
              style={{ width: "100%", maxHeight:"70vh", display: "block" }}
            />
          )}
        </div>
      </Modal>
    </Box>
  );
}
