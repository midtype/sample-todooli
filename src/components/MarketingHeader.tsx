import React from 'react';
import styled from 'styled-components';

interface IProps {
  bg: string;
}

const Styled = styled.div`
  clip-path: polygon(0 0, 100% 0%, 100% calc(100% - 200px), 0% 100%);
  padding: 4rem 0;
  padding-top: 9rem;

  @media screen and (max-width: 768px) {
    clip-path: none;
  }
`;

const MarketingHeader: React.FC<IProps> = props => (
  <Styled
    className="promo-0"
    style={{
      background: `linear-gradient(
    to left,
    rgba(${props.bg}, 0.5),
    rgba(${props.bg}, 1)
  )`
    }}
  >
    {props.children}
  </Styled>
);

export default MarketingHeader;
