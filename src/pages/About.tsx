import React from 'react';
import { Row, Col, Div, Container, Text } from 'atomize';

import MarketingHeader from '../components/MarketingHeader';
import Footer from '../components/Footer';

interface IEmployeeProps {
  name: string;
  title: string;
  description: string;
}

const Employee: React.FC<IEmployeeProps> = props => (
  <Col size="4" textAlign="center">
    <Div m={{ t: '2rem' }}>
      <Div
        bgImg="/images/avatar.png"
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

const AboutPage: React.FC = () => {
  return (
    <Div>
      <MarketingHeader bg="144, 19, 254">
        <Div p={{ x: '5rem' }}>
          <Text
            tag="h1"
            textAlign="center"
            textSize="display2"
            textColor="white"
            m={{ b: '1rem' }}
          >
            We're making it easier
            <br />
            for everyone to get stuff done.
          </Text>
          <Text
            tag="p"
            textAlign="center"
            textColor="white"
            textSize="heading"
            m={{ t: '1rem', b: '8rem' }}
          >
            A beautiful To Do app, built on the Midtype platform.
          </Text>
        </Div>
      </MarketingHeader>
      <Div
        bgImg="/images/illustrations/mirage-message-sent.png"
        w="50%"
        h="300px"
        bgSize="contain"
        bgPos="center center"
        bgRepeat="no-repeat"
        m={{ x: 'auto', t: '-12rem' }}
        pos="relative"
        style={{ zIndex: 2 }}
      />
      <Container>
        <Text
          tag="h1"
          textAlign="center"
          textSize="heading"
          m={{ x: 'auto', y: '4rem' }}
          maxW="40rem"
        >
          We started out with a bold vision, and we're growing every day until
          we reach it.
        </Text>
        <Row m={{ b: '10rem' }}>
          <Employee
            name="John H. Smith"
            title="Co-founder, CEO"
            description="John is a great guy. We all love him dearly. He is the co-founder."
          />
          <Employee
            name="Melanie Smith"
            title="Co-founder, CTO"
            description="John is a great guy. We all love him dearly. He is the co-founder."
          />
          <Employee
            name="Adele Smith"
            title="Co-founder, CPO"
            description="John is a great guy. We all love him dearly. He is the co-founder."
          />
        </Row>
      </Container>
      <Footer />
    </Div>
  );
};

export default AboutPage;
