
import { MyObservable, Observer, Subscriber } from '../components/observable-test/observable-test';

const myObservable = MyObservable.create(subscriber => {
    subscriber.next('next1');
    subscriber.next('next2');
    subscriber.next('next3');
    subscriber.error('error');
    subscriber.complete('complete');
});

myObservable.subscribe({
    next: (res: any) => {
        console.log(res);
    },
    error: (error: any) => {
        console.log(error);
    },
    complete: (res: any) => {
        console.log(res);
    }
});