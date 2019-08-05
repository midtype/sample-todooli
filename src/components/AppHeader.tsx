import styled from 'styled-components';

import * as colors from '../constants/colors';

const AppHeader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 5rem;
  background: linear-gradient(
    to right,
    ${colors.BRAND_1_LIGHT(1)},
    ${colors.BRAND_1_LIGHT(0.5)}
  );
`;

export default AppHeader;
