import { gql } from 'apollo-boost';

export default gql`
  query GetProducts {
    mStripeProducts {
      nodes {
        id
        pid
        slug
        name
        plans {
          nodes {
            id
            pid
            slug
            amount
          }
        }
      }
    }
  }
`;

export interface IProducts {
  mStripeProducts: {
    nodes: IStripeProduct[];
  };
}
