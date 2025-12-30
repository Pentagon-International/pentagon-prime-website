'use client'
import { Button, Container, Image, Text, Title } from "@mantine/core";
import { useRouter } from "next/navigation";
import { TYPOGRAPHY } from "../utils/TYPOGRAPHY";

const page = async () => {
    const router = useRouter();

    return (
        <>
            <Container
                fluid px={'7%'} my={150}
                size="sm"
                style={{
                    textAlign: 'center',
                    padding: '60px 20px',
                    marginTop: '60px',
                    backgroundColor: '#fff',
                    borderRadius: '12px',
                }}
            >
                <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Yes_Check_Circle.svg/1024px-Yes_Check_Circle.svg.png"
                    alt="Success"
                    width={100}
                    h={100}
                    fit={'contain'}
                    style={{ margin: '0 auto' }}
                />

                <Title
                    order={2}
                    style={{
                        marginTop: '20px',
                        color: 'green',
                        fontWeight: 700,
                    }}
                >
                    Your request has successfully been submitted!
                </Title>

                <Text
                    style={{
                        marginTop: '16px',
                        color: '#555',
                        fontSize: TYPOGRAPHY.body.normal,
                        maxWidth: '600px',
                        margin: '16px auto',
                    }}
                >
                    Thank you for submitting your request! A member of our staff will be reaching out to
                    provide assistance. We appreciate your patience and look forward to helping you.
                </Text>

                <Button
                    variant="outline"
                    color="blue"
                    radius="md"
                    size="md"
                    style={{ marginTop: '24px' }}
                    onClick={() => router.push('/')}
                >
                    Go Home
                </Button>
            </Container>
        </>
    );
};

export default page;
