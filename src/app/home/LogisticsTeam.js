import { client } from '@/app/api/contentful';
import { COLORS } from '@/app/utils/COLORS';
import { highlightText } from '@/app/utils/highlightText';
import {
  Container,
  Flex,
  Grid,
  GridCol,
  Image,
  Text,
  Title,
} from '@mantine/core';
import React from 'react';

const styles = {
  container: { fluid: true, px: '7%' },
  gridCol: { padding: 100, marginTop: 30 },

};

const TeamMember = ({ image, title, description, reverse }) => (
  <Grid align="center">
    {!reverse && (
      <GridCol mt={'xs'} span={6}>
        <Image src={image} alt={title} />
      </GridCol>
    )}
    <GridCol span={6} style={styles.gridCol}>
      <Title textWrap="balance" tt={'uppercase'} fw={800} lh={'lgx2'} size={'lgx2'} style={styles.teamTitle}>
        {highlightText(title)}
      </Title>
      <Text mt={10} size='sm' lh={'sm'}>
        {description}
      </Text>
    </GridCol>
    {reverse && (
      <GridCol mt={30} span={6}>
        <Image src={image} alt={title} />
      </GridCol>
    )}
  </Grid>
);

const LogisticsTeam = async ({ title, content }) => {
  const res = await client.getEntries({
    content_type: 'logisticsTeam',
    order: 'sys.createdAt',
  });

  return (
    <Container {...styles.container}>
      <Title size={'lg'} lh={'lgx2'} tt={'uppercase'} fw={800}>{title}</Title>
      <Text size='sm' maw={'55%'} fw={500} c={COLORS.textColor}>
        {content}
      </Text>

      <Flex wrap="wrap" justify="center" gap="md">
        {res.items?.map((item, index) => (
          <TeamMember
            key={index}
            image={item.fields.logisticsTeamImage.fields.file.url || ''}
            title={item.fields.teamTitle}
            description={item.fields.teamDescription}
            reverse={index % 2 !== 0}
          />
        ))}
      </Flex>
    </Container>
  );
};

export default LogisticsTeam;
