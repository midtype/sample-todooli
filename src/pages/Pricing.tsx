import React from 'react';
import { Row, Col, Div, Container, Text } from 'atomize';

import MarketingHeader from '../components/MarketingHeader';
import Footer from '../components/Footer';

interface IEmployeeProps {
  image: string;
  name: string;
  title: string;
  description: string;
}

const Plan: React.FC<IEmployeeProps> = props => (
  <Col size="6" textAlign="center">
    <Div m={{ t: '2rem', x: 'auto' }} maxW="25rem" shadow="5" p="2rem">
      <Div
        bgImg={props.image}
        w="10rem"
        h="10rem"
        bgSize="contain"
        bgPos="center center"
        bgRepeat="no-repeat"
        m={{ x: 'auto', b: '1rem' }}
        rounded="circle"
      />
      <Text tag="h3" textAlign="center" textSize="heading">
        {props.name}
      </Text>
      <Text textAlign="center" textSize="subheader">
        {props.title}
      </Text>
      <Text textAlign="center">{props.description}</Text>
    </Div>
  </Col>
);

const PricingPage: React.FC = () => {
  return (
    <Div>
      <MarketingHeader bg="1, 142, 245">
        <Div p={{ x: '5rem' }}>
          <Text
            tag="h1"
            textAlign="center"
            textSize="display2"
            textColor="white"
            m={{ b: '1rem' }}
          >
            To do lists for everyone.
          </Text>
          <Text
            tag="p"
            textAlign="center"
            textColor="white"
            textSize="heading"
            maxW="50rem"
            m={{ t: '1rem', b: '8rem', x: 'auto' }}
          >
            Whether you just want something to keep track of tasks or you're a
            cross-functioning team, we have a plan for you.
          </Text>
        </Div>
      </MarketingHeader>
      <Container>
        <Row m={{ b: '10rem' }}>
          <Plan
            image="/images/illustrations/mirage-uploading.png"
            name="Personal"
            title="Free"
            description="John is a great guy. We all love him dearly. He is the co-founder."
          />
          <Plan
            image="/images/illustrations/mirage-upgrade.png"
            name="Professional"
            title="$20/month"
            description="John is a great guy. We all love him dearly. He is the co-founder."
          />
        </Row>
      </Container>
      <Footer />
    </Div>
  );
};

export default PricingPage;
