export const config = {
  tasks: {
    notify24hours: {
      name: 'users-created-notification',
      delay: 24 * 60 * 60 * 1000, //24 hours
      job: 'send-notification',
    },
  },
  queues: {
    userCreated: 'user_created',
    userNotify: 'user_notify',
  },
  events: {
    userCreated: 'user_created',
    userNotify: 'user_notify',
  },
  tokens: {
    AmqpToken: Symbol('AMQP'),
  },
};
