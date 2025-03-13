import { client } from '@/app/api/contentful';
import { COLORS } from '@/app/utils/COLORS';
import {
  Accordion,
  AccordionControl,
  AccordionItem,
  AccordionPanel,
  Container,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

const FAQ = async () => {
  const res = await client.getEntries({
    content_type: 'faq',
    order: 'sys.createdAt',
  });

  return (
    <Container fluid bg={COLORS.accordian_background} px="7%" py={60}>
      <Stack>
        <Title fw={800} tt={'uppercase'} size={'lg'}>
          Frequently Asked Questions
        </Title>
        <Accordion
          chevronPosition="right"
          variant="separated"
          chevron={<IconPlus color={COLORS.secondaryColor} size={18} />}
          transitionDuration={600}
          styles={{
            chevron: {
              backgroundColor: COLORS.primaryColor,
              borderRadius: '50%',
              border: 'none',
              '&[dataRotate]': {
                transform: 'rotate(45deg)',
              },
            },
          }}
        >
          {res.items?.map((item) => {
            const { question, answer, shortvalue } = item.fields || {};
            return (
              <AccordionItem style={{ backgroundColor: COLORS.accordian_background }} key={item.sys.id} value={shortvalue || ''}>
                <AccordionControl style={{ backgroundColor: COLORS.accordian_background }}>
                  <Text size='sm' fw={700}>{question || 'Untitled Question'}</Text>
                </AccordionControl>
                <AccordionPanel style={{ backgroundColor: COLORS.accordian_background, }}>
                  <Text c={COLORS.textColor} size='smx' maw={'75%'} tw="balance">
                    {answer || 'No answer available at the moment.'}
                  </Text>
                </AccordionPanel>
              </AccordionItem>
            );
          })}
        </Accordion>
      </Stack>
    </Container >
  );
};

export default FAQ;
