import React from 'react';
import styled from 'styled-components';
import { Text } from 'atomize';

import * as colors from '../constants/colors';

const Styled = styled.div`
  border-style: solid;
  border-width: 3px;
  padding: 5px 10px;
  width: fit-content;
`;

interface IProps {
  color?: string;
}

const Logo: React.FC<IProps> = props => (
  <Styled style={{ borderColor: props.color || colors.BRAND_1() }}>
    <Text
      tag="h3"
      textTransform="uppercase"
      style={{ color: props.color || colors.BRAND_1(), letterSpacing: 2 }}
    >
      Todooli
    </Text>
  </Styled>
);

export default Logo;
