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

const diffNew = (preValue, curValue, container: any = {}) => {

    // get the two elements type
    const preType = getType(preValue);
    const curType = getType(curValue);
    const mergeType = preType === curType ? preType : null;

    if (!mergeType) {
        return { preValue, curValue, isEnd: true, isEqual: false };
    }

    if (mergeType !== 'symbol' && mergeType !== 'object' && mergeType !== 'function') {
        return JSON.stringify(preValue) === JSON.stringify(curValue)
            ? { isEnd: true, isEqual: true }
            : { preValue, curValue, isEnd: true, isEqual: false };
    }

    if (mergeType === 'symbol' || mergeType === 'function') {
        return preValue === curValue
            ? { isEnd: true, isEqual: true }
            : { preValue, curValue, isEnd: true, isEqual: false };
    }

    if (mergeType === 'object') {

        // get total keys about the two elements, and delete the repeat keys.
        const keys = new Set([
            ...Object.keys(preValue ? preValue : {}),
            ...Object.keys(curValue ? curValue : {})
        ]);
        if (keys.size > 0) {
            keys.forEach(key => {
                const { isEqual, isEnd } = diffNew(preValue[key], curValue[key], container);
                if (isEnd && !isEqual) {
                    container[key] = diffNew(preValue[key], curValue[key], container);
                } else if (!isEnd) {
                    diffNew(preValue[key], curValue[key], container);
                }
            });
        }
        return container;
    }
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
        butaitatemono: true,
        butaitatenaisyosei: false,
        haisuisyuyo: false,
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



console.log(diffNew(preValue, curValue));