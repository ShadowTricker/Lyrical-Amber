import { EventEmitter } from '../components/event-emitter/event-emitter';

const events = new EventEmitter();

events.on('test', (res) => {
    console.log(res);
});

events.on('test', (res) => {
    console.log({ ...res, data: 789 });
});

events.removeListener('test', (res) => {
    console.log(res);
});

events.emit('test', { eventName: 'test', data: 123 });

events.on('click', (res) => {
    console.log(res);
});

events.emit('click',  { eventName: 'click', data: 456 });
