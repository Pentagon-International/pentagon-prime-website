
import {Container, Grid, Image, Text, Title} from '@mantine/core';
import { client } from '../api/contentful';
import { COLORS } from '../utils/COLORS';
import Images from '../utils/image';
import ServiceCard from '../component/common/ServiceCard';


const Retail = async () => {
  const res = await client.getEntries({
    content_type: 'itworks',
    order: 'sys.createdAt',
  });

  return (
    <Container fluid px={'7%'} py={'70px'}>
      <Title tt={'uppercase'} maw={'70%'} tw="balance">
        We handle everything from{' '}
        <span style={{color: COLORS.serviceColor}}> factory floor </span>
        to{' '}
        <span style={{color: COLORS.serviceColor}}>
          customer door or retail store.{' '}
        </span>
      </Title>
      <Text mt={10} c={COLORS.textColor} w={'35vw'}>
        Unlike other 3PLs, Flexport manages and automates every point of your
        supply chain including international freight, domestic freight, storage,
        prep, kitting, replenishment, ecommerce fulfillment, B2B fulfillment,
        parcel, and returns.
      </Text>
      <Image src={Images.prime_network} alt="prime_network" />
      <Title mt={10} tt={'uppercase'} textWrap="balance">
        How it works
      </Title>
      <Text c={COLORS.textColor}>
        This is how you can control business expenses & Reduce spending
      </Text>
      <Grid columns={12} mt="xl">
        {res.items.map((item) => (
          <ServiceCard key={item.sys.id} item={item} />
        ))}
      </Grid>
    </Container>
  );
};

export default Retail;
