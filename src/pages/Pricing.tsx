import React from 'react';
import styled from 'styled-components';
import { Text, Icon } from 'atomize';

import MarketingHeader from '../components/MarketingHeader';
import Footer from '../components/Footer';

interface IEmployeeProps {
  image: string;
  name: string;
  title: string;
}

const Styled = styled.div`
  .pricing__plans {
    display: flex;
    justify-content: center;
    margin-bottom: 10rem;
  }
  .pricing__plans__plan {
    display: flex;
    margin: auto;
  }
  .pricing__plans__plan__feature {
    box-shadow: 0 0 1px 0 rgba(8, 11, 14, 0.06),
      0 32px 40px -1px rgba(8, 11, 14, 0.1);
    margin: 1rem;
    padding: 2rem;
    min-width: 20rem;
  }
  .pricing__plans__plan__feature__illustration {
    width: 10rem;
    height: 10rem;
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
    margin: auto;
    margin-bottom: 1rem;
    border-radius: 50%;
  }
`;

const PlanFeature: React.FC = props => (
  <div className="pricing__plans__plan">
    <Icon name="Checked" color="success700" size="20px" m={{ r: '.5rem' }} />
    <Text>{props.children}</Text>
  </div>
);

const Plan: React.FC<IEmployeeProps> = props => (
  <div className="pricing__plans__plan__feature">
    <div
      className="pricing__plans__plan__feature__illustration"
      style={{ backgroundImage: `url('${props.image}')` }}
    />
    <Text tag="h3" textAlign="center" textSize="heading">
      {props.name}
    </Text>
    <Text textAlign="center" textSize="subheader" m={{ b: '2rem' }}>
      {props.title}
    </Text>
    <div>{props.children}</div>
  </div>
);

const PricingPage: React.FC = () => {
  return (
    <Styled>
      <MarketingHeader bg="1, 142, 245">
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
          m={{
            xs: { t: '1rem', b: '8rem', x: 'auto' },
            sm: { t: '1rem', b: '2rem', x: 'auto' }
          }}
        >
          Whether you just want something to keep track of tasks or you're a
          cross-functioning team, we have a plan for you.
        </Text>
      </MarketingHeader>
      <div className="pricing__plans">
        <Plan
          image="/images/illustrations/mirage-uploading.png"
          name="Personal"
          title="Free"
        >
          <PlanFeature>Unlimited Tasks</PlanFeature>
          <PlanFeature>30-Day Archive of Tasks</PlanFeature>
          <PlanFeature>No Projects</PlanFeature>
        </Plan>
        <Plan
          image="/images/illustrations/mirage-upgrade.png"
          name="Professional"
          title="$20/month"
        >
          <PlanFeature>Unlimited Tasks</PlanFeature>
          <PlanFeature>Unlimited Archive of Tasks</PlanFeature>
          <PlanFeature>Unlimited Projects</PlanFeature>
        </Plan>
      </div>
      <Footer />
    </Styled>
  );
};

export default PricingPage;
