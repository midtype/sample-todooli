import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Styled = styled.header`
  position: absolute;
`;

const Nav: React.FC = () => {
  return (
    <Styled>
      <div className="nav__links">
        <Link className="nav__links__page" to="/">
          Home
        </Link>
        <Link className="nav__links__page" to="/about">
          About
        </Link>
        <Link className="nav__links__page" to="/features">
          Features
        </Link>
        <Link className="nav__links__page" to="/customers">
          Customers
        </Link>
        <Link className="nav__links__page" to="/pricing">
          Pricing
        </Link>
      </div>
    </Styled>
  );
};

export default Nav;
