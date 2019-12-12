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

const diffNew = (preValue, curValue, target: any = {}) => {

    // get the two elements type
    const preType = getType(preValue);
    const curType = getType(curValue);
    const mergeType = preType === curType ? preType : null;

    if (!mergeType) {
        return { preValue, curValue, isEqual: false, isEnd: true };
    }

    if (mergeType !== 'symbol' && mergeType !== 'object' && mergeType !== 'function') {
        return JSON.stringify(preValue) === JSON.stringify(curValue)
            ? { isEqual: false, isEnd: true }
            : { preValue, curValue, isEqual: false, isEnd: true };
    }

    if (mergeType === 'symbol' || mergeType === 'function') {
        return preValue === curValue
            ? { isEqual: false, isEnd: true }
            : { preValue, curValue, isEqual: false, isEnd: true };
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
                    
                }

            });
        }
    }

    return target;
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

const testData1 = {
    code: "P0002",
    name: "",
    value: {
        butaitatemono: false,
        butaitatenaisyosei: false,
        haisuisyuyo: true,
        hukaikingaku: undefined,
        hukaisyuyo: true,
        kasaikingaku: undefined,
        kasaisyuyo: true,
        kasaitatemono: false,
        kasaitatenaisyosei: false,
        kurumasyuyo: false,
        sinsuikingaku: "",
        sojyousyuyo: true,
        sonotatategai: false,
        sonotatategaisyosei: false,
        sonotatatemono: false,
        sonotatatenaisyosei: false,
        sonotayusou: false,
        tenkitatemono: false,
        tenkitatenaisyosei: false,
        tounantatemono: false,
        tounantatenaisyosei: false,
    },
};

const testData2 = {
    code: "P0003",
    name: "",
    value: {
        butaitatemono: false,
        butaitatenaisyosei: false,
        haisuisyuyo: true,
        hukaikingaku: undefined,
        hukaisyuyo: true,
        kasaikingaku: undefined,
        kasaisyuyo: true,
        kasaitatemono: false,
        kasaitatenaisyosei: false,
        kurumasyuyo: false,
        sinsuikingaku: "",
        sojyousyuyo: true,
        sonotatategai: false,
        sonotatategaisyosei: false,
        sonotatatemono: false,
        sonotatatenaisyosei: false,
        sonotayusou: false,
        tenkitatemono: false,
        tenkitatenaisyosei: false,
        tounantatemono: false,
        tounantatenaisyosei: false,
    },
};

console.log(diffNew(testData1, testData2));

function diffTest(obj1, obj2, target = {}) {
    const keys = new Set([
        ...Object.keys(obj1 ? obj1 : {}),
        ...Object.keys(obj2 ? obj2 : {})
    ]);

    keys.forEach(key => {
        if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
            target[key] = diffTest(obj1[key], obj2[key], target[key]);
        } else {
            target = { pre: obj1[key], cur: obj2[key] };
        }
    });

    return target;
}

const obj1 = {
    test1: {
        test2: 3
    }
};

const obj2 = {
    test1: {
        test2: 4
    }
};


console.log(diffTest(obj1, obj2));