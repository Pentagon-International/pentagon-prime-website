import { Skeleton, Text } from "@mantine/core"

const InputLoader = ({ label }) => {
  return (
    <>
      <Text size="md" fw={500}>{label}</Text>
      <Skeleton height={40} radius="sm" />
    </>
  )
}

export default InputLoader;