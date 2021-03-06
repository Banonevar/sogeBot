import { EventBus } from './event-bus';

const error = (err: string, title?: string) => {
  EventBus.$emit('error', { name: title || 'Unexpected error', message: err });
  console.error(err);
};

const success = (message: string, title: string) => {
  EventBus.$emit('success', { name: title, message });
};

export { error, success };