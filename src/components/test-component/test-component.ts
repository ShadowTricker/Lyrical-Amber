import './test-component.scss';

interface PropertiesObject {
    children: (string | HTMLElement)[];
    [key: string]: any;
}


function addDOM (rootDOM: HTMLElement, ...nodeDOM: HTMLElement[]): void {
    nodeDOM.forEach((node: HTMLElement) => {
        rootDOM.append(node.cloneNode(true));
    });
}

function createElement (
    elementName: string,
    properties: PropertiesObject
): any {
    const { children } = properties;
    const elem: HTMLElement = document.createElement(elementName);
    if (children.length > 0) {
        children.forEach((child: string | HTMLElement) => {
            if (typeof child === 'string') {
                elem.append(child);
            }
            else {
                elem.append(child.cloneNode(true));
            }
        });
    }

    return elem;
}

export {
    addDOM,
    createElement,
    PropertiesObject
}