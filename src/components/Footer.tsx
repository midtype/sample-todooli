import React from 'react';
import { Link } from 'react-router-dom';
import { Div, Row, Col, Container, Text } from 'atomize';

interface IFooterLinkProps {
  title: string;
  path: string;
}

const FooterLink: React.FC<IFooterLinkProps> = props => (
  <Link to={props.path} className="nav__section__link">
    <Text textSize="subheader" textColor="gray200">
      {props.title}
    </Text>
  </Link>
);

const Nav: React.FC = () => {
  return (
    <Div bg="info700" p={{ y: '3rem' }}>
      <Container>
        <Row>
          <Col size="4">
            <Text
              tag="h3"
              textSize="title"
              textColor="white"
              m={{ b: '.5rem' }}
            >
              Product
            </Text>
            <FooterLink path="/faqs" title="FAQs" />
          </Col>
          <Col size="4">
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
          </Col>
          <Col size="4">
            <FooterLink path="/terms" title="Terms of Service" />
            <FooterLink path="/privacy-policy" title="Privacy Policy" />
          </Col>
        </Row>
      </Container>
    </Div>
  );
};

export default Nav;
