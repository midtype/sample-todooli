import React from 'react';
import styled from 'styled-components';
import { Row, Col, Div, Container, Text } from 'atomize';

const Styled = styled.div`
  width: 100vw;
  background: red;
  padding-top: 3rem;
`;

const IndexPage: React.FC = () => {
  return (
    <Styled>
      <Container>
        <Row>
          <Col size="12">
            <Div p="1rem">
              <Text tag="h1" textSize="display1" m={{ b: '4rem' }}>
                This is h1 of display1 size
              </Text>
            </Div>
          </Col>
        </Row>
      </Container>
    </Styled>
  );
};

export default IndexPage;
