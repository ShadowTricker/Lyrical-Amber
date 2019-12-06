interface Observer {
    next?: (result?: any) => void;
    error?: (error?: any) => void;
    complete?: (params?: any) => void;
}

interface Subscriber {
    (subscriber: Observer): any;
}

class MyObservable {

    public subscriber: Subscriber;

    static create(subscriber: Subscriber): MyObservable {
        return new MyObservable(subscriber);
    }

    constructor(subscriber: Subscriber) {
        this.subscriber = subscriber;
    }

    public subscribe(observer: Observer): void {
        this.subscriber(observer);
    }
}

export {
    MyObservable,
    Observer,
    Subscriber
};