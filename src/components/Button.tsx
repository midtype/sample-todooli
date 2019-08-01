import React from 'react';
import styled from 'styled-components';

import * as colors from '../constants/colors';

interface IProps {
  className?: string;
  status?: string;
  secondary?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const Styled = styled.button`
  border: 0;
  box-shadow: none;
  outline: none;
  background: none;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.5s all ease-in-out;
  transform: translateZ(0);
  text-decoration: none;
  background-color: ${(props: IProps) =>
    props.secondary ? colors.WHITE() : colors.BRAND_1()};
  border: none;
  color: ${(props: IProps) =>
    props.secondary ? colors.BRAND_1() : colors.WHITE()};

  box-shadow: 0 0 1px 0 rgba(8, 11, 14, 0.06),
    0 6px 6px -1px rgba(8, 11, 14, 0.1);

  &:hover {
    box-shadow: -1 0 1px 0 rgba(8, 11, 14, 0.06),
      0 16px 16px -1px rgba(8, 11, 14, 0.1);
    transform: translateY(-2px);
  }
  h4 {
    color: ${(props: IProps) => (props.secondary ? 'black' : 'white')};
  }
`;

const Button: React.FC<IProps> = props => (
  <Styled {...props} onClick={props.onClick} style={props.style}>
    {props.children}
  </Styled>
);

export default Button;
