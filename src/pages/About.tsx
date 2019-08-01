import React from 'react';
import styled from 'styled-components';
import { Text } from 'atomize';

import MarketingHeader from '../components/MarketingHeader';
import Container from '../components/MarketingContainer';
import Footer from '../components/Footer';

interface IEmployeeProps {
  name: string;
  title: string;
  description: string;
}

const Styled = styled.div`
  .employee {
    margin-top: 2rem;
    text-align: center;
  }
  .illustration,
  .employee__avatar {
    width: 10rem;
    height: 10rem;
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
    margin: auto;
    margin-bottom: 1rem;
    border-radius: 50%;
  }
  .illustration {
    background-image: url('/images/illustrations/mirage-message-sent.png');
    position: relative;
    z-index: 2;
    width: 100%;
    height: 20rem;
    margin-top: -12rem;
  }
  .promo-1__employees {
    margin: 5rem 0;
    margin-bottom: 10rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 2rem;
  }
`;

const Employee: React.FC<IEmployeeProps> = props => (
  <div className="employee">
    <div
      className="employee__avatar"
      style={{ backgroundImage: `url('/images/avatar.png')` }}
    />
    <Text tag="h3" textAlign="center" textSize="heading">
      {props.name}
    </Text>
    <Text textAlign="center" textSize="subheader">
      {props.title}
    </Text>
    <Text textAlign="center">{props.description}</Text>
  </div>
);

const AboutPage: React.FC = () => {
  return (
    <Styled>
      <MarketingHeader bg="144, 19, 254">
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
      </MarketingHeader>
      <div className="illustration" />
      <Container className="promo-1">
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
        <div className="promo-1__employees">
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
        </div>
      </Container>
      <Footer />
    </Styled>
  );
};

export default AboutPage;
