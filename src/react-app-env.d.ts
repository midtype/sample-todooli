/// <reference types="react-scripts" />

declare module 'atomize';

interface IUser {
  id: string;
  private: {
    name: string;
    email: string;
    photoUrl: string;
  };
  subscription: IStripeSubscription;
}

interface ITask {
  id: string;
  summary: string;
  completed: boolean;
  completedOn: string;
  dueDate: string;
  project: IProject;
}

interface IProject {
  id: string;
  name: string;
  color: string;
}

interface IStripeSubscription {
  id: string;
  pid: string;
  customerPid: string;
  active: boolean;
  subscriber: User;
  plan: IStripePlan;
  inactiveReason: {
    cause: string;
    requiresActionSecret: string;
  };
}

interface IStripePlan {
  id: string;
  pid: string;
  slug: string;
  amount: number;
  product: IStripeProduct;
}

interface IStripeProduct {
  id: string;
  pid: string;
  slug: string;
  name: string;
  plans: {
    nodes: IStripePlan[];
  };
}
