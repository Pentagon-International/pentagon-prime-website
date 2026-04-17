import { Box, Container, Paper, Text, Title } from "@mantine/core";

export default function LoginPage() {
  return (
    <Container size="xs" py={60}>
      <Paper withBorder radius="md" p="xl">
        <Title order={2} mb="sm">Login</Title>
        <Text c="dimmed">Login page placeholder for auth flow.</Text>
      </Paper>
    </Container>
  );
}
