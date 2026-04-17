import { Container, Paper, Text, Title } from "@mantine/core";

export default function RegisterPage() {
  return (
    <Container size="xs" py={60}>
      <Paper withBorder radius="md" p="xl">
        <Title order={2} mb="sm">Register</Title>
        <Text c="dimmed">Registration page placeholder for auth flow.</Text>
      </Paper>
    </Container>
  );
}
