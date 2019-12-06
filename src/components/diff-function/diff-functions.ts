const oldValue = {
    test1: 123,
    test2: 456,
    test3: {
        test4: 789
    },
    test5: {
        test6: {
            test7: 777
        }
    },
    test11: {
        test12: null
    },
    test13: {
        test14: 145
    }
};

const newValue = {
    test1: 234,
    test2: 456,
    test9: {
        test10: 756
    },
    test5: {
        test6: {
            test7: 910
        }
    },
    test11: {
        test12: 123
    },
    test13: {
        test14: 144
    }
};

const diff = (target: Object, oldValue: { [key: string]: any }, newValue: { [key: string]: any }, isSub: boolean = false) => {
    // const diffData = {};
    const keys = new Set([...Object.keys(newValue), ...Object.keys(oldValue)]);
    console.log(keys);
    keys.forEach((key: string) => {
        const preValue = oldValue[key];
        const currentValue = newValue[key];
        if (currentValue === undefined || preValue === undefined || currentValue === null || preValue === null) {
            target[key] = { preValue, currentValue };
        }
        else if (typeof currentValue === 'object' && typeof preValue === 'object') {
            const subDiffData = diff(target, preValue, currentValue, true);
            if (subDiffData) {
                target[key] = subDiffData;
            }
        }
        else {
            if (preValue !== currentValue) {
                target[key] = { preValue, currentValue };
            }
        }
    });
    if (isSub) {
        return Object.keys(target).length > 0 ? target : undefined;
    }
    return target;
};

/* const diffData = diff({}, oldValue, newValue);
console.log(diffData); */

// 用来对比并抽出对象新旧值得变化
// 参数 旧值，新值，上层元素（默认为空数组），要生成的对象(默认为空对象)
// 强调： 祖孙父子之间的 key 名不能有重复
const diffFlat = (oldValue: { [key: string]: any }, newValue: { [key: string]: any }, parents: string[] = [], target: Object = {}) => {

    // 获取新旧数据的 key， 并且去重
    const keys = new Set([...Object.keys(newValue ? newValue : []), ...Object.keys(oldValue ? oldValue : [])]);

    // 迭代 key， 对比是否发生变化
    keys.forEach((key: string) => {
        // 值有可能为 undefined， 所以需要判断一下
        const preValue = oldValue ? oldValue[key] : undefined;
        const currentValue = newValue ? newValue[key] : undefined;

        // 如果有值为 undefined，则直接给对应的 key 赋值
        if (currentValue === undefined || preValue === undefined || currentValue === null || preValue === null) {
            target[key] = diffFlat(preValue, currentValue, [ ...parents, key], target);
        }

        // 如果有值依然可以遍历， 则继续遍历
        if (typeof currentValue === 'object' && typeof preValue === 'object') {
            if (JSON.stringify(preValue) !== JSON.stringify(currentValue)) {
                target[key] = { preValue, currentValue, parents };
            }
            diffFlat(preValue, currentValue, [ ...parents, key], target);
        }
        // 如果没有，则直接赋值
        else {
            if (JSON.stringify(preValue) !== JSON.stringify(currentValue)) {
                target[key] = { preValue, currentValue, parents };
            }
        }
    });

    // 返回对比后的数据
    return target;
};

const diffData = diffFlat(oldValue, newValue);
console.log(diffData);
const filtData = {};
Object.keys(diffData).forEach(key => {
    /* const condition1 = typeof diffData[key].preValue !== 'object'&& typeof diffData[key].currentValue !== 'object';
    const condition2 = diffData[key].preValue === null || diffData[key].currentValue === null; */
    const condition1 = (typeof diffData[key].preValue === 'object' && diffData[key].preValue !== null)
        || (typeof diffData[key].currentValue === 'object' && diffData[key].currentValue !== null);
    const condition2 = diffData[key].preValue === null || diffData[key].currentValue == null;

    if (condition1) {
        // filtData[key] = diffData[key];
        Reflect.deleteProperty(diffData, key);
    }
});
console.log(diffData);