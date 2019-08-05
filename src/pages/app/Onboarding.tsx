import React from 'react';
import styled from 'styled-components';

import AppHeader from '../../components/AppHeader';
import Container from '../../components/MarketingContainer';
import PaymentForm from '../../components/elements/PaymentForm';

import * as colors from '../../constants/colors';

const Styled = styled.div`
  padding-top: 5rem;
  height: 100vh;
  background: ${colors.GRAY_1()};

  .payment {
    width: 30rem;
    margin: 5rem auto;
    padding: 2rem;
    border-radius: 10px;
    background: white;
    box-shadow: 0 0 1px 0 rgba(8, 11, 14, 0.06),
      0 32px 40px -1px rgba(8, 11, 14, 0.1);
  }
`;

const OnboardingPage: React.FC = () => {
  return (
    <Styled>
      <AppHeader />
      <Container className="container">
        <PaymentForm description="Select a plan and enter your billing information to begin using Todooli." />
      </Container>
    </Styled>
  );
};

export default OnboardingPage;
