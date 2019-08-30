import { gql } from 'apollo-boost';

export default gql`
  query GetTasks($completed: Boolean, $projectId: UUID) {
    tasks(
      orderBy: DUE_DATE_ASC
      condition: { completed: $completed, projectId: $projectId }
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
