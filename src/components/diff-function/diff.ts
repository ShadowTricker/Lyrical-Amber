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
    }
};

const diffNew = (preValue, curValue, isRoot, target = {}) => {

    // get the two elements type
    const preType = getType(preValue);
    const curType = getType(curValue);
    const mergeType = preType === curType ? preType : null;

    if (!mergeType) {
        return { preValue, curValue };
    }

    if (mergeType !== 'symbol' && mergeType !== 'object' && mergeType !== 'function') {
        return JSON.stringify(preValue) === JSON.stringify(curValue) ? {} : { preValue, curValue };
    }

    if (mergeType === 'symbol' || mergeType === 'function') {
        return preValue === curValue ? {} : { preValue, curValue };
    }
    
    if (mergeType === 'object') {

        // get total keys about the two elements, and delete the repeat keys.
        const keys = new Set([
            ...Object.keys(preValue ? preValue : {}),
            ...Object.keys(curValue ? curValue : {})
        ]);

        if (keys.size > 0) {
            keys.forEach(key => {
                if (preValue[key] !== undefined || curValue[key] !== undefined) {
                    target[key] = diffNew(preValue[key], curValue[key], true, target);
                }
            });
        }
    }

    if (isRoot) {
        return target;
    }
    // return target;
};

function getType(value) {
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

console.log(diffNew(preValue, curValue, true));