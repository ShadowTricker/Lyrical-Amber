
import { MyObservable, Observer, Subscriber } from '../components/observable-test/my-observable';
import { MySubject } from '../components/observable-test/my-subject';

const myObservable = MyObservable.create(subscriber => {
    subscriber.next('next1');
    subscriber.next('next2');
    subscriber.next('next3');
    subscriber.error('error');
    subscriber.complete('complete');
});

myObservable.subscribe({
    next(res) {
        console.log(res);
    },
    error(err) {
        console.log(err);
    },
    complete() {
        console.log('complete');
    }
});

/* const mySubject = new MySubject();


mySubject.subscribe({
    next: (res) => {
        console.log(`A: ${res}`);
    },
    error: (error) => {
        console.log(`A: ${error}`);
    },
    complete: () => {
        console.log(`A: complete`);
    }
});

mySubject.subscribe({
    next: (res) => {
        console.log(`B: ${res}`);
    },
    error: (error) => {
        console.log(`B: ${error}`);
    },
    complete: () => {
        console.log(`B: complete`);
    }
});

myObservable.subscribe(mySubject); */
