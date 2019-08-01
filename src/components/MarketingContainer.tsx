import styled from 'styled-components';

const MarketingContainer = styled.div`
  width: 100%;
  max-width: calc(1200px + 5rem);
  margin: auto;
  padding: 0 5rem;
  @media screen and (max-width: 768px) {
    padding: 0 2rem;
  }
`;

export default MarketingContainer;
