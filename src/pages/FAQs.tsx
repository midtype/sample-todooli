import React from 'react';
import { Row, Col, Div, Container, Text } from 'atomize';

import MarketingHeader from '../components/MarketingHeader';
import Footer from '../components/Footer';

import { TOPICS, QUESTIONS } from '../constants/faqs';

const Question: React.FC<any> = props => (
  <>
    <Text tag="h4">{props.question}</Text>
    <Text m={{ b: '1rem' }}>{props.answer}</Text>
  </>
);

const Topic: React.FC<any> = props => (
  <Col size="6">
    <Div shadow="5" rounded="md" p="2rem" m=".5rem">
      <Text tag="h3" textAlign="center" textSize="heading" m={{ b: '1rem' }}>
        {props.displayName}
      </Text>
      {QUESTIONS.filter(question => question.topic === props.id).map(
        question => (
          <Question {...question} />
        )
      )}
    </Div>
  </Col>
);

const AboutPage: React.FC = () => {
  return (
    <Div>
      <MarketingHeader bg="125, 211, 33" />

      <Text tag="h1" textAlign="center" textSize="display2" m={{ b: '1rem' }}>
        Frequently Asked Questions
      </Text>
      <Div m={{ b: '10rem' }}>
        <Container>
          <Row>
            {Object.keys(TOPICS).map(id => (
              <Topic id={id} displayName={TOPICS[id].displayName} />
            ))}
          </Row>
        </Container>
      </Div>
      <Container />
      <Footer />
    </Div>
  );
};

export default AboutPage;
