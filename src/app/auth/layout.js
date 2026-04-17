import { Box } from "@mantine/core";

export default function AuthLayout({ children }) {
  return (
    <Box component="main" style={{ minHeight: "100vh" }}>
      {children}
    </Box>
  );
}
