import {client} from '@/app/api/contentful';
import {COLORS} from '@/app/utils/COLORS';
import {highlightText} from '@/app/utils/highlightText';
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
  container: {fluid: true, px: '7%'},
  title: {fontFamily: 'inherit', fontSize: '36px'},
  text: {maxWidth: 600, color: COLORS.textColor},
  gridCol: {padding: 100, marginTop: 30},
  teamTitle: {
    fontSize: '36px',
    textTransform: 'uppercase',
    fontFamily: 'inherit',
  },
};

const TeamMember = ({image, title, description, reverse}) => (
  <Grid align="center">
    {!reverse && (
      <GridCol mt={30} span={6}>
        <Image src={image} alt={title} />
      </GridCol>
    )}
    <GridCol span={6} style={styles.gridCol}>
      <Title textWrap="balance" style={styles.teamTitle}>
        {highlightText(title)}
      </Title>
      <Text mt={10} style={styles.text}>
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

const LogisticsTeam = async () => {
  const res = await client.getEntries({
    content_type: 'logisticsTeam',
    order: 'sys.createdAt',
  });

  return (
    <Container {...styles.container}>
      <Title style={styles.title}>THINK OF US AS YOUR LOGISTICS TEAM</Title>
      <Text style={styles.text}>
        We deliver scalable and adaptable logistics services to help you focus
        on expanding your company.
      </Text>

      <Flex wrap="wrap" justify="center" mt={50} gap="md">
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
