import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Text, Button, Icon } from 'atomize';

import Logo from './Logo';
import Container from './MarketingContainer';
import * as colors from '../constants/colors';

interface IFooterLinkProps {
  title: string;
  path: string;
}

const Styled = styled.div`
  footer {
    padding: 3rem;
    background: ${colors.BRAND_1()};
  }
  .footer__cta {
    background: ${colors.GRAY_1()};
    padding: 4rem 0;
  }
  .footer__cta__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 60rem;
    margin: auto;
  }
  .footer__section {
    flex: 0 0 33%;
    text-align: center;
  }
  .footer__container {
    display: flex;
  }
`;

const FooterLink: React.FC<IFooterLinkProps> = props => (
  <Link to={props.path} className="nav__section__link">
    <Text textSize="subheader" textColor="gray200">
      {props.title}
    </Text>
  </Link>
);

const Nav: React.FC = () => {
  return (
    <Styled>
      <div className="footer__cta">
        <Container className="footer__cta__container">
          <div>
            <Logo color={colors.BRAND_1()} />
            <Text
              tag="h3"
              textSize="display2"
              textColor="info700"
              m={{ t: '2rem' }}
              maxW="30rem"
            >
              Ready to double your productivity?
            </Text>
          </div>
          <Button
            m={{ t: '2rem' }}
            h="3rem"
            p={{ x: '1.5rem' }}
            bg="info700"
            textColor="white"
            textSize="title"
            suffix={
              <Icon
                name="LongRight"
                size="32px"
                color="white"
                m={{ l: '.5rem' }}
              />
            }
            shadow="3"
            hoverShadow="4"
          >
            Sign Up
          </Button>
        </Container>
      </div>
      <footer>
        <Container className="footer__container">
          <div className="footer__section">
            <Text
              tag="h3"
              textSize="title"
              textColor="white"
              m={{ b: '.5rem' }}
            >
              Product
            </Text>
            <FooterLink path="/faqs" title="FAQs" />
          </div>
          <div className="footer__section">
            <Text
              tag="h3"
              textSize="title"
              textColor="white"
              m={{ b: '.5rem' }}
            >
              Company
            </Text>
            <FooterLink path="/about" title="About" />
            <FooterLink path="/contact-us" title="Contact Us" />
          </div>
          <div className="footer__section">
            <FooterLink path="/terms" title="Terms of Service" />
            <FooterLink path="/privacy-policy" title="Privacy Policy" />
          </div>
        </Container>
      </footer>
    </Styled>
  );
};

export default Nav;
