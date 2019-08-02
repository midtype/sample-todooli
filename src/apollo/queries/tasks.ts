import { gql } from 'apollo-boost';

export default gql`
  query GetTasks {
    tasks(orderBy: DUE_DATE_ASC) {
      nodes {
        id
        summary
        completed
        completedOn
        dueDate
        project {
          id
          name
        }
      }
    }
  }
`;

export interface ITasks {
  tasks: {
    nodes: ITask[];
  };
}
