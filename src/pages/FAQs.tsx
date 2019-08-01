import React from 'react';
import styled from 'styled-components';
import { Text } from 'atomize';

import MarketingHeader from '../components/MarketingHeader';
import Container from '../components/MarketingContainer';
import Footer from '../components/Footer';

import { TOPICS, QUESTIONS } from '../constants/faqs';
import * as styles from '../constants/styles';
import * as colors from '../constants/colors';

const Styled = styled.div`
  .topics {
    margin-bottom: 10rem;
  }
  .topic {
    box-shadow: ${styles.BOX_SHADOW};
    border-radius: 10px;
    padding: 2rem;
    margin-bottom: 3rem;
  }
`;

const Question: React.FC<any> = props => (
  <div>
    <Text tag="h4">{props.question}</Text>
    <Text m={{ b: '1rem' }}>{props.answer}</Text>
  </div>
);

const Topic: React.FC<any> = props => (
  <div className="topic">
    <Text tag="h3" textAlign="center" textSize="heading" m={{ b: '1rem' }}>
      {props.displayName}
    </Text>
    {QUESTIONS.filter(question => question.topic === props.id).map(question => (
      <Question key={question.question} {...question} />
    ))}
  </div>
);

const AboutPage: React.FC = () => {
  return (
    <Styled>
      <MarketingHeader bg={colors.GREEN}>
        <Text
          tag="h1"
          textAlign="center"
          textSize="display2"
          textColor="white"
          m={{ b: '6rem' }}
        >
          Frequently Asked Questions
        </Text>
      </MarketingHeader>
      <div className="topics">
        <Container>
          {Object.keys(TOPICS).map(id => (
            <Topic key={id} id={id} displayName={TOPICS[id].displayName} />
          ))}
        </Container>
      </div>
      <Container />
      <Footer />
    </Styled>
  );
};

export default AboutPage;
