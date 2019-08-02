import { gql } from 'apollo-boost';

export default gql`
  mutation CreateTask(
    $userId: UUID!
    $summary: String!
    $dueDate: Datetime
    $projectId: UUID
  ) {
    createTask(
      input: {
        task: {
          completed: false
          assigneeId: $userId
          summary: $summary
          dueDate: $dueDate
          projectId: $projectId
        }
      }
    ) {
      task {
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

export interface ICreateTask {
  createTask: {
    task: ITask;
  };
}
