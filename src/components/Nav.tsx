import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Row, Col, Container, Text, Button, Icon } from 'atomize';

const Styled = styled.header`
  position: absolute;
  width: 100%;
  height: 5rem;
  display: flex;
  align-items: center;
  z-index: 100;

  a {
    color: white;
    opacity: 0.8;
    transition: 250ms all;
  }

  a:hover {
    opacity: 1;
  }

  .nav__section {
    display: flex;
    align-items: center;
  }
  .nav__section__link {
    margin-right: 2rem;
  }
  .nav__section:last-child {
    justify-content: flex-end;
  }
`;

interface INavLinkProps {
  title: string;
  path: string;
}

const NavLink: React.FC<INavLinkProps> = props => (
  <Link to={props.path} className="nav__section__link">
    <Text textSize="subheader">{props.title}</Text>
  </Link>
);

const Nav: React.FC = () => {
  return (
    <Styled>
      <Container>
        <Row>
          <Col size="2" className="nav__section">
            <Text tag="h3" textSize="heading" textColor="white">
              Todooli
            </Text>
          </Col>
          <Col size="6" className="nav__section">
            <NavLink path="/" title="Home" />
            <NavLink path="/about" title="About" />
            <NavLink path="/faqs" title="FAQs" />
            <NavLink path="/pricing" title="Pricing" />
          </Col>
          <Col size="4" className="nav__section">
            <NavLink path="/login" title="Login" />
            <Button
              bg="white"
              textColor="black"
              suffix={
                <Icon
                  name="LongRight"
                  size="16px"
                  color="black"
                  m={{ l: '.5rem' }}
                />
              }
              shadow="3"
              hoverShadow="4"
              m={{ r: '1rem' }}
            >
              Sign Up
            </Button>
          </Col>
        </Row>
      </Container>
    </Styled>
  );
};

export default Nav;
