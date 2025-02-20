import { client } from '@/app/api/contentful';
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
import { IconPlus, IconMinus } from '@tabler/icons-react';

const FAQ = async () => {
  const res = await client.getEntries({
    content_type: 'faq',
    order: 'sys.createdAt',
  });

  return (
    <Container fluid px="7%" pt="70px">
      <Stack>
        <Title tt={'uppercase'} size={'lgx2'}>
          Frequently Asked Questions
        </Title>
        <Accordion
          chevronPosition="right"
          variant="separated"
          chevron={<IconPlus size={18} />}
        >
          {res.items?.map((item) => {
            const { question, answer, shortvalue } = item.fields || {};
            return (
              <AccordionItem key={item.sys.id} value={shortvalue || ''}>
                <AccordionControl>
                  <Text size='sm' fw={600}>{question || 'Untitled Question'}</Text>
                </AccordionControl>
                <AccordionPanel>
                  <Text size='smx' tw="balance">
                    {answer || 'No answer available at the moment.'}
                  </Text>
                </AccordionPanel>
              </AccordionItem>
            );
          })}
        </Accordion>
      </Stack>
    </Container>
  );
};

export default FAQ;
