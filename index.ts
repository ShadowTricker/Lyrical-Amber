
// common style sheets
import './index.scss';

// common libs list
import { Observable, interval } from 'rxjs';

// libs list created by self
import { addDOM, createElement } from './src/components/test-component/test-component';

const rootDOM = document.getElementById('root');

const p = createElement('p', {
    children: [
        'I\'m just a test p.'
    ]
});

const div = createElement('div', {
    children: [
        'I\'m just a test div.',
        p
    ]
});

addDOM(rootDOM, div);








