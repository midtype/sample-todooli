interface ITopic {
  displayName: string;
}

export const TOPICS: { [key: string]: ITopic } = {
  app: {
    displayName: 'Creating Tasks'
  },
  integrations: {
    displayName: 'Integrations'
  },
  billing: {
    displayName: 'Billing'
  }
};

export const QUESTIONS = [
  {
    question: 'How do I create a new task?',
    answer: "Click the 'New Task' button, enter some text, and click 'Create.'",
    topic: 'app'
  },
  {
    question: 'When should I mark one of my tasks as complete?',
    answer: "Click the 'New Task' button, enter some text, and click 'Create.'",
    topic: 'app'
  },
  {
    question: 'What types of integrations does Todooli support?',
    answer: "Click the 'New Task' button, enter some text, and click 'Create.'",
    topic: 'integrations'
  },
  {
    question: 'Can I send messages to Slack when a task is marked as complete?',
    answer:
      'Of course! What SaaS product would be complete without Slack integration? The more messages the merrier.',
    topic: 'integrations'
  },
  {
    question: 'Why do I have to pay money?',
    answer: 'Because SaaS is all about the recurring revenue, of course.',
    topic: 'billing'
  },
  {
    question: 'When will I be charged?',
    answer:
      "As soon as you subscribe to the premium plan, you'll be charged. From then on, you'll be charged again on that same date every month.",
    topic: 'billing'
  }
];
