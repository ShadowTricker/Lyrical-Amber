interface Observer {
    next?: (result?: any) => void;
    error?: (error?: any) => void;
    complete?: (params?: any) => void;
}

interface Subscriber {
    (subscriber: Observer): any;
}

class MyObservable {

    private _subscribe: Subscriber;

    constructor(subscribe?: Subscriber) {
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }

    public subscribe(observer: Observer): void {
        this._subscribe(observer);
    } 

    static create(subscriber?: Subscriber): MyObservable {
        return new MyObservable(subscriber);
    }
}

export {
    MyObservable,
    Observer,
    Subscriber
};