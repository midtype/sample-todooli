import { gql } from 'apollo-boost';

export default gql`
  mutation UpdateTask(
    $id: UUID!
    $userId: UUID
    $summary: String
    $dueDate: Datetime
    $projectId: UUID
    $completed: Boolean
  ) {
    updateTask(
      input: {
        id: $id
        patch: {
          completed: $completed
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
