import { gql } from 'apollo-boost';

export default gql`
  query GetProjects {
    projects {
      nodes {
        id
        name
        color
      }
    }
  }
`;

export interface IProjects {
  projects: {
    nodes: IProject[];
  };
}
