
// common style sheets
import './index.scss';

// common libs list
import { Observable, interval, Subject, of } from 'rxjs';

// libs list created by self
import { addDOM, createElement } from './src/components/test-component/test-component';

/* const rootDOM = document.getElementById('root');

const p = createElement('p', {
    children: [
        'I\'m just a test p.'
    ],
    className: ['test'],
});

const button = createElement('button', {
    children: ['click me'],
    onClick: (e: any) => { 
        console.log(e);
    }
});

const div = createElement('div', {
    children: [
        'I\'m just a test div.',
        p,
        button
    ],
    className: ['test1']
});

addDOM(rootDOM, div); */

const subject = new Subject<number>();
const observable = of(1, 2, 4);

subject.subscribe((res) => {
    console.log(`A: ${res}`);
});


observable.subscribe(subject);

subject.subscribe((res) => {
    console.log(`B: ${res}`);
});









