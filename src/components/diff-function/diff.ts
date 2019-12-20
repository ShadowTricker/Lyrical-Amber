const preValue = {
    prop1: 123,
    prop2: undefined,
    prop3: 'prop3',
    prop5: [1, 2, 5],
    prop6: {
        prop7: 123
    },
    prop8: 123,
    prop9: {
        prop10: 123,
        prop11: {
            prop12: 456
        }
    },
    prop13: {
        prop14: 123,
        prop15: {
            prop16: 123,
            prop17: {
                prop18: 123
            }
        }
    }
};

const curValue = {
    prop1: 234,
    prop2: undefined,
    prop4: 123,
    prop5: [1, 2, 6],
    prop6: {
        prop7: 243
    },
    prop8: '123',
    prop9: {
        prop10: 234,
        prop11: {
            prop12: 789
        }
    },
    prop13: {
        prop14: 123,
        prop15: {
            prop16: 234,
            prop17: {
                prop18: [1, 3, 4]
            }
        }
    }
};

const diffNew = (preValue, curValue, isRoot: boolean, container: any = {}, parents = []) => {

    // get the two elements type
    const preType = getType(preValue);
    const curType = getType(curValue);
    const mergeType = preType === curType ? preType : null;

    if (!mergeType) {
        return { preValue, curValue, isEnd: true, isEqual: false, parents: parents.slice(0, -1) };
    }

    if (mergeType !== 'symbol' && mergeType !== 'object' && mergeType !== 'function' && mergeType !== 'array') {
        return JSON.stringify(preValue) === JSON.stringify(curValue)
            ? {}
            : { preValue, curValue, isEnd: true, isEqual: false, parents: parents.slice(0, -1) };
    }

    if (mergeType === 'symbol' || mergeType === 'function') {
        return preValue === curValue
            ? {}
            : { preValue, curValue, isEnd: true, isEqual: false, parents: parents.slice(0, -1) };
    }

    /* if (mergeType === 'array') {
        curValue.forEach((current, i) => {
            if (isRoot) {
                container = {
                    ...container,
                    ...JSON.stringify(preValue) === JSON.stringify(curValue)
                        ? {}
                        : { preValue, curValue, isEnd: true, isEqual: false, parents: parents.slice(0, -1) }
                }
            } else {
                diffNew(preValue[i], current, false, container, [ ...parents, i ]);
            }
        });
        return container;
    } */

    if (mergeType === 'object' || mergeType === 'array') {

        // get total keys about the two elements, and delete the repeat keys.
        const keys = new Set([
            ...Object.keys(preValue ? preValue : {}),
            ...Object.keys(curValue ? curValue : {})
        ]);
        if (keys.size > 0) {
            keys.forEach(key => {
                const { isEqual, isEnd } = diffNew(preValue[key], curValue[key], false, container);
                if (isEnd && !isEqual) {
                    container[key] = diffNew(preValue[key], curValue[key], false, container, [...parents, key]);
                } else if (!isEnd) {
                    diffNew(preValue[key], curValue[key], false, container, [...parents, key]);
                }
            });
        }
        return container;
    }
};

function getType(value: any): string {
    if (Number.isNaN(value)) {
        // or value !== value
        return 'NaN';
    } else if (value === null) {
        return 'null';
    } else if (Array.isArray(value)) {
        return 'array';
    } else {
        return typeof value;
    }
}

/* console.log(
    diffNew(
        { 
            super: [
                { sub: 1 },
                { sub: 2 },
            ]
        },
        {
            super: [
                { sub: 2 },
                { sub: 1 },
            ]
        },
        true
    )
);

console.log(
    diffNew(
        [1, 2, 3],
        [1, 2, 4],
        true
    )
); */

const diffNewArray = (preValue, curValue, parents = [], type: string = null, container: any[] = []) => {

    // get the two elements type
    const preType = getType(preValue);
    const curType = getType(curValue);
    const mergeType = preType === curType ? preType : null;

    if (!mergeType) {
        return {
            preValue,
            curValue,
            type: type ? type : null,
            key: parents[parents.length - 1] ? parents[parents.length - 1] : null,
            parents: parents.slice(0, -1)
        };
    }

    if (mergeType !== 'symbol' && mergeType !== 'object' && mergeType !== 'function' && mergeType !== 'array') {
        if (JSON.stringify(preValue) !== JSON.stringify(curValue)) {
            return {
                preValue,
                curValue,
                type: type ? type : null,
                key: parents[parents.length - 1] ? parents[parents.length - 1] : null,
                parents: parents.slice(0, -1)
            };
        }
    }

    if (mergeType === 'symbol' || mergeType === 'function') {
        if (preValue !== curValue) {
            return {
                preValue,
                curValue,
                type: type ? type : null,
                key: parents[parents.length - 1] ? parents[parents.length - 1] : null,
                parents: parents.slice(0, -1)
            };
        }
    }

    if (mergeType === 'object' || mergeType === 'array') {

        // get total keys about the two elements, and delete the repeat keys.
        const keys = new Set([
            ...Object.keys(preValue ? preValue : {}),
            ...Object.keys(curValue ? curValue : {})
        ]);
        // console.log(keys);
        if (keys.size > 0) {
            keys.forEach(key => {
                const result = diffNewArray(preValue[key], curValue[key], [...parents, key], getType(curValue || preValue));
                if (result) {
                    if (getType(result) === 'array') {
                        container.push(...result as any[]);
                    } else {
                        container.push(result);
                    }
                }
            });
        }
        return container;
    }
};

console.log(
    diffNewArray(
        { 
            super: [
                { sub: 1 },
                { sub: 2, sub2: 3 },
                { sub: 2, sub2: 3 },
            ]
        },
        {
            super: [
                { sub: 2 },
                { sub: 1 },
                { sub: 1, sub2: 5 },
            ]
        }
    )
);
/* console.log(diffNewArray(
    [1, 2, 3],
    [1, 2, 4]
)); */