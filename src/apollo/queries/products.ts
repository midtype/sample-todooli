import { gql } from 'apollo-boost';

export default gql`
  query GetProducts {
    stripeProducts {
      nodes {
        id
        pid
        slug
        name
        stripePlans {
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
  stripeProducts: {
    nodes: IStripeProduct[];
  };
}
