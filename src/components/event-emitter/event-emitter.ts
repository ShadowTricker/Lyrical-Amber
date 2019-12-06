

interface ListenerObjects {
    [key: string]: ((params?: any) => any)[];
}

interface ListenerCallBack {
    (params?: any): any;
}


class EventEmitter {

    public listenerObjects: ListenerObjects = {};

    constructor() {

    }

    public on(eventName: string, callBack: ListenerCallBack): void {
        if (this.listenerObjects[eventName]) {
            this.listenerObjects[eventName].push(callBack);
        }
        else {
            this.listenerObjects[eventName] = [callBack];
        }
    }

    public emit(eventName: string, params: any): void {
        this.listenerObjects[eventName].forEach(callback => callback(params));
    }

    public removeListener(eventName: string, callBack: ListenerCallBack): void {
        if (this.listenerObjects[eventName]) {
            const callbackIndex: number = this.listenerObjects[eventName].findIndex(item => {
                return item.toString() === callBack.toString();
            });
            this.listenerObjects[eventName].splice(callbackIndex, 1);

        }
    }

}

export {
    EventEmitter,
    ListenerObjects,
    ListenerCallBack
};