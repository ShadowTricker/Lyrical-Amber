import { MyObservable, Observer } from './my-observable';

export class MySubject extends MyObservable {

    observers: Observer[] = [];

    constructor() {
        super();
    }

    next(result) {
        this.observers.forEach(observer => {
            observer.next(result);
        });
    }

    error(error) {
        this.observers.forEach(observer => {
            observer.error(error);
        });
    }

    complete() {
        this.observers.forEach(observer => {
            observer.complete();
        });
    }

    subscribe(observer: Observer) {
        // super.subscribe();
        this.observers.push(observer);
    }

}