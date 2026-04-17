import { Container, Paper, Text, Title } from "@mantine/core";

export default function ResetPasswordPage() {
  return (
    <Container size="xs" py={60}>
      <Paper withBorder radius="md" p="xl">
        <Title order={2} mb="sm">Reset Password</Title>
        <Text c="dimmed">Reset password page placeholder.</Text>
      </Paper>
    </Container>
  );
}
