import React from 'react';
import { Div } from 'atomize';

interface IProps {
  bg: string;
}

const MarketingHeader: React.FC<IProps> = props => (
  <Div
    className="promo-0"
    p={{ y: '4rem', t: '9rem' }}
    style={{
      background: `linear-gradient(
    to left,
    rgba(${props.bg}, 0.5),
    rgba(${props.bg}, 1)
  )`,
      clipPath: 'polygon(0 0, 100% 0%, 100% calc(100% - 200px), 0% 100%)'
    }}
  >
    {props.children}
  </Div>
);

export default MarketingHeader;
