import React from 'react';
import styled from 'styled-components';
import { Text, Button, Icon } from 'atomize';

import Footer from '../components/Footer';
import Container from '../components/MarketingContainer';
import MarketingHeader from '../components/MarketingHeader';

import * as colors from '../constants/colors';

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
  .promo-0__container {
    display: grid;
    grid-template-columns: 30rem auto;
    grid-gap: 2rem;
  }
  .screenshot {
    width: 100%;
    border-radius: 5px;
    box-shadow: 0 0 50px ${colors.BLACK(0.2)};
  }
  .promo-1 {
    margin: 2rem 0;
  }
  .promo-1__customers {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .promo-1__customers img {
    width: 100px;
    margin: 0 2rem;
  }
  .promo-2 {
    margin: 4rem 0;
    padding: 4rem 0;
    background: ${colors.GRAY_1()};
  }
  .promo-2__features {
    display: flex;
    justify-content: space-between;
    margin-top: 5rem;
  }
  .promo-2__feature {
    text-align: center;
    padding: 0 2rem;
    flex: 0 0 33%;
  }
  .promo-2__feature__image {
    width: 200px;
    height: 200px;
    background-position: center center;
    background-size: contain;
    background-repeat: no-repeat;
    margin: 0 auto 2rem auto;
  }
  .promo-3__container {
    margin: 10rem auto;
    display: grid;
    grid-template-columns: auto 30rem;
    grid-gap: 2rem;
  }
  .promo-3__left {
    position: relative;
  }
  .promo-3__tools {
    margin-top: 4rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2rem;
  }

  @media screen and (max-width: 768px) {
    .promo-0__container {
      grid-template-columns: 1fr;
    }
    .promo-1 {
      margin-top: 5rem;
    }
    .promo-1__customers img {
      width: 80px;
      margin: 0 1rem;
    }
    .promo-2__feature__image {
      width: 100px;
      height: 100px;
    }
    .promo-3__container {
      margin: 5rem auto;
      grid-template-columns: 1fr;
    }
    .promo-3__left {
      display: none;
    }
    .promo-3__tools {
      grid-template-columns: 1fr;
    }
  }
  @media screen and (max-width: 500px) {
    .promo-2__features {
      margin-top: 0;
      flex-flow: column;
    }
    .promo-2__feature {
      padding: 2rem 0;
      flex: 0 0 33%;
    }
  }
`;

interface IFeatureProps {
  image: string;
  title: string;
  description: string;
}

const Feature: React.FC<IFeatureProps> = props => (
  <div className="promo-2__feature">
    <div
      className="promo-2__feature__image"
      style={{ backgroundImage: `url('${props.image}')` }}
    />
    <Text tag="h3" textSize="subheader" textAlign="center">
      {props.title}
    </Text>
    <Text textSize="subheader" textAlign="center">
      {props.description}
    </Text>
  </div>
);

const Tool: React.FC<IFeatureProps> = props => (
  <div className="promo-3__tool">
    <Icon name={props.image} size="20px" />
    <Text tag="h4">{props.title}</Text>
    <Text>{props.description}</Text>
  </div>
);

const IndexPage: React.FC = () => {
  return (
    <Styled>
      <MarketingHeader bg={colors.BRAND_1}>
        <Container className="promo-0__container">
          <div className="promo-0__left">
            <Text tag="h1" textSize="display3" m={{ b: '1rem' }}>
              Get Stuff Done
            </Text>
            <hr style={{ background: 'yellow' }} />
            <Text tag="p" textSize="heading" m={{ t: '1rem' }}>
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
          </div>
          <div className="promo-0__right">
            <img
              className="screenshot"
              src="/images/sample-screenshot.png"
              alt="Sample screenshot of our application."
            />
          </div>
        </Container>
      </MarketingHeader>
      <div className="promo-1">
        <Container>
          <Text
            m={{ b: '3rem' }}
            textAlign="center"
            textTransform="uppercase"
            style={{ letterSpacing: '2px' }}
          >
            Trusted By
          </Text>
          <Container className="promo-1__customers">
            <img src="/images/customers/twitch.png" alt="Twitch" />
            <img src="/images/customers/ideo.png" alt="Ideo" />
            <img src="/images/customers/workfront.png" alt="Workfront" />
          </Container>
        </Container>{' '}
      </div>
      <div className="promo-2">
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
          <div className="promo-2__features">
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
          </div>
        </Container>
      </div>
      <div className="promo-3">
        <Container className="promo-3__container">
          <div className="promo-3__left">
            <img
              className="screenshot"
              src="/images/sample-screenshot.png"
              alt="Sample screenshot of our application."
              style={{
                position: 'absolute',
                width: '80%',
                marginTop: '7em',
                transform: 'rotate(20deg)'
              }}
            />
            <img
              className="screenshot"
              src="/images/sample-screenshot.png"
              alt="Sample screenshot of our application."
              style={{
                width: '80%',
                transform: 'rotate(-10deg)'
              }}
            />
          </div>
          <div className="promo-3__right">
            <div>
              <Text tag="h2" textSize="heading">
                Start Crushing It Today
              </Text>
              <Text textSize="subheader">
                Todooli will give you the edge to become the Valley's most
                productive founder. Get started today, you'll never regret it.
                Not once.
              </Text>
            </div>
            <div className="promo-3__tools">
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
            </div>
          </div>
        </Container>
      </div>
      <Footer />
    </Styled>
  );
};

export default IndexPage;
