import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Text } from 'atomize';

import Logo from './Logo';
import Button from './Button';
import Container from './MarketingContainer';
import LoginModal from './elements/LoginModal';
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

const Footer: React.FC = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  return (
    <Styled>
      <LoginModal
        open={loginOpen}
        onClickClose={() => setLoginOpen(false)}
        title="Sign Up"
      />
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
          <Button onClick={() => setLoginOpen(true)}>Sign Up</Button>
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

export default Footer;
