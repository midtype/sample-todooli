import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Text, Button, Icon } from 'atomize';

import Logo from './Logo';
import Container from './MarketingContainer';

import * as colors from '../constants/colors';

const Styled = styled.header`
  position: absolute;
  width: 100vw;
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

  .nav__container {
    display: flex;
  }
  .nav__section {
    display: flex;
    align-items: center;
  }
  .nav__section--logo {
    flex: 0 0 5rem;
    margin-right: 2rem;
  }
  .nav__section--links {
    flex: 1 1 auto;
  }
  .nav__section--login {
    flex: 0 0 20rem;
  }
  .nav__section__link {
    margin-right: 2rem;
  }
  .nav__section:last-child {
    justify-content: flex-end;
  }

  @media screen and (max-width: 768px) {
    .nav__section--links {
      display: none;
    }
    .nav__section--login {
      flex: 1 1 auto;
    }
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
      <Container className="nav__container">
        <div className="nav__section nav__section--logo">
          <Link to="/">
            <Logo color={colors.WHITE()} />
          </Link>
        </div>
        <div className="nav__section nav__section--links">
          <NavLink path="/" title="Home" />
          <NavLink path="/about" title="About" />
          <NavLink path="/faqs" title="FAQs" />
          <NavLink path="/pricing" title="Pricing" />
        </div>
        <div className="nav__section nav__section--login">
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
          >
            Sign Up
          </Button>
        </div>
      </Container>
    </Styled>
  );
};

export default Nav;
