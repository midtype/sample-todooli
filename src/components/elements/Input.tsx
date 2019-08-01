import React from 'react';
import styled from 'styled-components';

import * as styles from '../../constants/styles';

interface IProps {
  value: string;
  onChange: (value: string) => void;
  textarea?: boolean;
  style?: React.CSSProperties;
}

const StyledInput = styled.input`
  background: white;
  border: 1px solid rgba(0, 0, 0, 0);
  box-shadow: ${styles.BOX_SHADOW};
  border-radius: 5px;
  padding: 0.5rem 0.75rem;
  transition: 250ms all;
  outline: none;
  width: 100%;
  font-size: 0.8rem;
  &:focus {
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
`;

const StyledTextarea = styled.textarea`
  background: white;
  border: 1px solid rgba(0, 0, 0, 0);
  box-shadow: ${styles.BOX_SHADOW};
  border-radius: 5px;
  padding: 0.5rem 0.75rem;
  transition: 250ms all;
  outline: none;
  width: 100%;
  font-size: 0.8rem;
  height: 100px;
  resize: none;
  &:focus {
    border: 1px solid rgba(0, 0, 0, 1);
  }
`;

const Input: React.FC<IProps> = props => {
  return props.textarea ? (
    <StyledTextarea
      style={props.style}
      value={props.value}
      onChange={e => props.onChange(e.target.value)}
    />
  ) : (
    <StyledInput
      style={props.style}
      value={props.value}
      onChange={e => props.onChange(e.target.value)}
    />
  );
};

export default Input;
