import { Container, Flex, Group, Image, Stack, Text, Title } from '@mantine/core';
import Images from '../utils/image';

const Seafright = () => {
  return (
    <Container fluid px={'7%'} py={'70px'}>
      <Title tt={'uppercase'} w={'60%'} size={'lg'}>
        All the <span style={{ color: '#0E53F2' }}> sea freight forwarding </span>
        boxes are checked.
      </Title>
      <Flex justify={'space-between'}>
        <Group>
          <Stack spacing={0}>
            <Text size='smx'>
              Manage all your freight forwarding requirements with our strategic
              alliances around the globe
            </Text>
            <Text size='smx'>Sail Smoothly with Pentagon Prime’s Ocean Freight</Text>
            <Text size='smx'>
              Pentagon Prime is your steadfast companion for navigating the vast
              expanse of global trade. Our ocean freight services deliver
              unparalleled efficiency, reliability, and cost-effectiveness.
              Whether your cargo demands the precision of a Full Container Load
              (FCL) or the flexibility of a Less Than Container Load (LCL), we
              have the solution
            </Text>
            <Text size='smx'>
              Our extensive network of trusted carriers ensures your cargo
              reaches its destination with the speed and care it deserves. From
              meticulous documentation to seamless customs clearance, we handle
              every facet of your sea cargo transport journey. Our commitment to
              transparency is underscored by advanced technology, providing
              real-time visibility into your shipment’s progress
            </Text>
            <Text size='smx'>
              Beyond mere transportation, we offer strategic guidance. Our team
              of seasoned logistics experts analyzes your unique requirements to
              recommend the optimal shipping solution. With a focus on building
              enduring partnerships, we are dedicated to exceeding your
              expectations.
            </Text>
            <Text size='smx'>
              Experience the Pentagon Prime difference. Let us transform your
              supply chain into a competitive advantage.
            </Text>
          </Stack>
        </Group>
        <Image src={Images.pentagon} alt="Sea Freight Forwarding" />
      </Flex>
    </Container>
  );
};

export default Seafright;
