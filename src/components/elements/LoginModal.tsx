import React, { useEffect } from 'react';
import styled from 'styled-components';

import LoginForm from './LoginForm';

import * as colors from '../../constants/colors';

interface IProps {
  open: boolean;
  onClickClose: () => void;
  title?: string;
}

const Styled = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 1000;
  visibility: hidden;
  .mask {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: ${colors.BLACK(0.8)};
    opacity: 0;
    transition: 250ms all;
  }
  .container {
    position: relative;
    z-index: 1001;
    background: ${colors.WHITE()};
    transform: scale(1.1);
    opacity: 0;
    transition: 250ms all;
    will-change: transform;
  }
  &.open {
    visibility: visible;
    .mask {
      opacity: 1;
    }
    .container {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

const Logo: React.FC<IProps> = props => {
  useEffect(() => {
    if (props.open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'initial';
    }
  }, [props.open]);
  return (
    <Styled className={props.open ? 'open' : 'closed'}>
      <div className="mask" onClick={props.onClickClose} />
      <div className="container">
        <LoginForm title={props.title} />
      </div>
    </Styled>
  );
};

export default Logo;
