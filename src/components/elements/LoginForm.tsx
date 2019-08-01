import React from 'react';
import styled from 'styled-components';

import * as colors from '../../constants/colors';

const Styled = styled.div`
  position: relative;
  width: 24rem;
  padding: 3rem 2rem;
  padding-bottom: 5rem;
  border-radius: 5px;
  text-align: center;
  box-shadow: 0 0 1px 0 rgba(8, 11, 14, 0.06),
    0 32px 40px -1px rgba(8, 11, 14, 0.1);

  .login__google img {
    width: 10rem;
  }
  .login__powered-by {
    position: absolute;
    width: 100%;
    padding: 1rem;
    left: 0;
    bottom: 0;
    background: ${colors.GRAY_1()};
  }
  .login__powered-by p {
    color: ${colors.GRAY_3()};
    letter-spacing: 1px;
    text-transform: uppercase;
    font-size: 0.6rem;
    text-align: center;
  }
`;

const Logo: React.FC = props => {
  return (
    <Styled>
      <h4>Login</h4>
      <div className="login__google">
        <a href={process.env.REACT_APP_MY_APP_GOOGLE_SIGN_IN_LINK}>
          <img src="/images/google-sign-in.png" alt="Google sign in link." />
        </a>
      </div>
      <div className="login__powered-by">
        <p>
          Powered By <strong>Midtype</strong>
        </p>
      </div>
    </Styled>
  );
};

export default Logo;
