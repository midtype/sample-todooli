import { gql } from 'apollo-boost';

export default gql`
  query GetTasks($completed: Boolean) {
    tasks(
      orderBy: DUE_DATE_ASC
      filter: { completed: { equalTo: $completed } }
    ) {
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
