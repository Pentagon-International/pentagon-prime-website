import { Container, Paper, Text, Title } from "@mantine/core";

export default function ForgotPasswordPage() {
  return (
    <Container size="xs" py={60}>
      <Paper withBorder radius="md" p="xl">
        <Title order={2} mb="sm">Forgot Password</Title>
        <Text c="dimmed">Password recovery page placeholder.</Text>
      </Paper>
    </Container>
  );
}
