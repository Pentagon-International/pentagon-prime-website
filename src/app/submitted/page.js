"use client";

import { Box, Button, Flex, Image, Text } from "@mantine/core";
import { useRouter } from "next/navigation";

/* CbmCalc-style design */
const panelStyle = {
  background: "rgba(255,255,255,0.12)",
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",
  borderRadius: "22px",
  border: "1px solid rgba(255,255,255,.2)",
  boxShadow: "0 25px 50px rgba(0,0,0,.45)",
  overflow: "hidden",
  color: "#fff",
};
const contentStyle = { padding: "16px 32px" };
const pageWrapperStyle = {
  minHeight: "100vh",
  background:
    'linear-gradient(rgba(8,20,50,.55),rgba(8,20,50,.85)), url("https://images.unsplash.com/photo-1670121180583-39ab653a071c?w=1920")',
  backgroundSize: "cover",
  backgroundPosition: "top",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px 40px",
  fontFamily: "'Inter', sans-serif",
};
const innerContainerStyle = {
  width: "100%",
  maxWidth: "1400px",
  display: "flex",
  flex: 1,
  flexDirection: "column",
};

export default function SubmittedPage() {
  const router = useRouter();

  return (
    <Box component="div" style={pageWrapperStyle}>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <Box style={innerContainerStyle}>
        <Flex mb="md" mt={70} align="center" justify="center" style={{ flex: 1 }}>
          <Box style={panelStyle}>
            <Box style={{ ...contentStyle, textAlign: "center", padding: "32px 48px" }}>
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Yes_Check_Circle.svg/1024px-Yes_Check_Circle.svg.png"
                alt="Success"
                w={100}
                h={100}
                fit="contain"
                style={{ margin: "0 auto" }}
              />

              <Text
                component="h2"
                style={{
                  margin: "20px 0 0 0",
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#fff",
                }}
              >
                Your request has successfully been submitted!
              </Text>

              <Text
                style={{
                  marginTop: "16px",
                  color: "rgba(255,255,255,.85)",
                  fontSize: "14px",
                  maxWidth: "600px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                Thank you for submitting your request! A member of our staff will
                be reaching out to provide assistance. We appreciate your
                patience and look forward to helping you.
              </Text>

              <Button
                variant="filled"
                radius="md"
                size="md"
                style={{ marginTop: "24px" }}
                onClick={() => router.push("/")}
                styles={{
                  root: {
                    background: "linear-gradient(135deg,#00d2ff,#005bea)",
                    border: "none",
                  },
                  label: { fontSize: "14px", color: "#fff" },
                }}
              >
                Go Home
              </Button>
            </Box>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
