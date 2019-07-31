import React from 'react';
import styled from 'styled-components';
import { Row, Col, Div, Container, Text, Image, Button, Icon } from 'atomize';

import Footer from '../components/Footer';
import MarketingHeader from '../components/MarketingHeader';

const Styled = styled.div`
  width: 100vw;

  hr {
    width: 50px;
    height: 2px;
    border: none;
    box-shadow: none;
    margin: 0;
  }

  .promo-0 h1,
  .promo-0 p {
    color: white;
  }

  .promo-1__customers img {
    width: 100px;
    margin: 0 2rem;
  }
`;

interface IFeatureProps {
  image: string;
  title: string;
  description: string;
}

const Feature: React.FC<IFeatureProps> = props => (
  <Col size="3" textAlign="center">
    <Div
      bgImg={props.image}
      w="200px"
      h="200px"
      bgSize="contain"
      bgPos="center center"
      bgRepeat="no-repeat"
      m={{ x: 'auto', b: '2rem' }}
    />
    <Text tag="h3" textSize="subheader" textAlign="center">
      {props.title}
    </Text>
    <Text textSize="subheader" textAlign="center">
      {props.description}
    </Text>
  </Col>
);

const Tool: React.FC<IFeatureProps> = props => (
  <Col size="6">
    <Div m={{ b: '2rem' }}>
      <Icon name={props.image} size="20px" />
      <Text tag="h4">{props.title}</Text>
      <Text>{props.description}</Text>
    </Div>
  </Col>
);

const IndexPage: React.FC = () => {
  return (
    <Styled>
      <MarketingHeader bg="1, 142, 245">
        <Container>
          <Row>
            <Col size="4">
              <Text
                tag="h1"
                textSize="display3"
                m={{ b: '1rem' }}
                textColor="white"
              >
                Get Stuff Done
              </Text>
              <hr style={{ background: 'yellow' }} />
              <Text
                tag="p"
                textSize="heading"
                m={{ t: '1rem' }}
                textColor="white"
              >
                A beautiful To Do app, built on the Midtype platform.
              </Text>
              <Button
                m={{ t: '2rem' }}
                h="3rem"
                p={{ x: '1.5rem' }}
                bg="white"
                textColor="info700"
                textSize="title"
                suffix={
                  <Icon
                    name="LongRight"
                    size="32px"
                    color="info700"
                    m={{ l: '.5rem' }}
                  />
                }
                shadow="3"
                hoverShadow="4"
              >
                Sign Up
              </Button>
            </Col>
            <Col size="1" />
            <Col size="7">
              <Image
                rounded="md"
                overflow="hidden"
                shadow="5"
                src="/images/sample-screenshot.png"
                alt="Sample screenshot of our application."
              />
            </Col>
          </Row>
        </Container>
      </MarketingHeader>
      <Div className="promo-1">
        <Container>
          <Text
            m={{ b: '3rem' }}
            textAlign="center"
            textTransform="uppercase"
            style={{ letterSpacing: '2px' }}
          >
            Trusted By
          </Text>
          <Container textAlign="center" className="promo-1__customers">
            <Image src="/images/customers/twitch.png" alt="Twitch" />
            <Image src="/images/customers/ideo.png" alt="Ideo" h="auto" />
            <Image src="/images/customers/workfront.png" alt="Workfront" />
          </Container>
        </Container>{' '}
      </Div>
      <Div className="promo-2" m={{ t: '5rem' }} bg="gray100" p={{ y: '3rem' }}>
        <Container>
          <Text
            m={{ b: '2rem' }}
            tag="h2"
            textSize="heading"
            textAlign="center"
          >
            What Can Todooli Do?
          </Text>
          <hr
            style={{ margin: '1rem auto', background: 'rgba(1, 142, 245, 1)' }}
          />
          <Row
            m={{ t: '3rem' }}
            className="promo-2__features"
            justify="space-between"
          >
            <Feature
              title="Keep Track of To Dos"
              image="/images/illustrations/mirage-list-is-empty.png"
              description="Ridiculously easy to create and complete your
          tasks. Keep track of everything on your plate, in one place."
            />
            <Feature
              title="Feel Like a Boss"
              image="/images/illustrations/mirage-success.png"
              description="Feel like a boss every time you check off a task. Getting used to that feeling? Check off some more!"
            />
            <Feature
              title="Budget Time Efficiently"
              image="/images/illustrations/mirage-done.png"
              description="Know exactly what you need to do for the day so that you can budget your time across tasks with confidence."
            />
          </Row>
        </Container>
      </Div>
      <Div className="promo-3" m={{ y: '10rem' }}>
        <Container>
          <Row m={{ t: '3rem' }}>
            <Col size="6" pos="relative">
              <Image
                rounded="md"
                overflow="hidden"
                shadow="5"
                w="80%"
                m={{ t: '10rem' }}
                pos="absolute"
                src="/images/sample-screenshot.png"
                alt="Sample screenshot of our application."
                style={{ transform: 'rotate(20deg)' }}
              />
              <Image
                rounded="md"
                overflow="hidden"
                shadow="5"
                w="80%"
                src="/images/sample-screenshot.png"
                alt="Sample screenshot of our application."
                style={{ transform: 'rotate(-10deg)' }}
              />
            </Col>
            <Col size="6">
              <Container p="0rem">
                <Row m={{ b: '3rem' }}>
                  <Col>
                    <Text tag="h2" textSize="heading">
                      Start Crushing It Today
                    </Text>
                    <Text textSize="subheader">
                      Todooli will give you the edge to become the Valley's most
                      productive founder. Get started today, you'll never regret
                      it. Not once.
                    </Text>
                  </Col>
                </Row>
                <Row m={{ b: '2rem' }}>
                  <Tool
                    image="Mail"
                    title="Create Tasks via Email"
                    description="Send Todooli an email with a new task as the subject and we'll automatically add it to your list."
                  />
                  <Tool
                    image="Draft"
                    title="Save Drafts"
                    description="Save a draft of your next task and continue editing it until you're ready to publish it."
                  />
                  <Tool
                    image="Search"
                    title="Find Tasks Quickly"
                    description="Todooli's robust search tools make it easy to find any past or future task."
                  />
                  <Tool
                    image="Camera"
                    title="Add Photos"
                    description="Easily add photos or PDFs to any task so that you can reference them later."
                  />
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </Div>
      <Footer />
    </Styled>
  );
};

export default IndexPage;
