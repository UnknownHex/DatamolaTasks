/**
*   Реализовать арифметику в функциональном стиле.
*   Написать функции для простейших операций с двумя числами add, sub, mul, div (сложить, вычесть, умножить, разделить), так что:
*   1. Если их вызвать с двумя аргументами, возвращается результат операции
*       let a = add(1,2); // 3
*       let b = mul(a, 10); // 30
*
*   2. Если их вызвать с одним аргументом (arg1), возвращается функция,
*   которая совершает данную операцию со своим аргументом (arg2) и аргументом первой функции (arg1) let sub1 = sub(1); // sub1 отнимает от любого числа единицу
*       let c = sub1(b); // 29
*       let d = mul(sub(a,1))(c); // 58
*
*   3. Написать универсальный метод pipe, принимающий любое число параметров,
*   реализующий последовательность арифметических операций с данным числом.
*   let doSmth = pipe(add(d), sub(c), mul(b), div(a)); // функция, последовательно выполняющая эти операции.
*       let result = doSmth(0); // (((0 + 58) - 29) * 30) / 3 = 290
*       let x = pipe(add(1), mul(2))(3); // 8
*
*   4. Выполнить проверку написанных методов.
*
* */

const isNumber = (arg) => typeof arg === 'number' && Number.isFinite(arg) && !Number.isNaN(arg);
const isEmptyArg = (arg) => arg === undefined || arg === null;

const add = (a, b) => {
    let res = a;

    if (isNumber(a) && isNumber(b)) {
        res += b;
    }

    if (isEmptyArg(b)) {
        return (c) => res + c;
    }

    return res;
};

const sub = (a, b) => {
    let res = a;

    if (isNumber(a) && isNumber(b)) {
        res -= b;
    }

    if (isEmptyArg(b)) {
        return (c) => c - res;
    }

    return res;
};

const mul = (a, b) => {
    let res = a;

    if (isNumber(a) && isNumber(b)) {
        res *= b;
    }

    if (isEmptyArg(b)) {
        return (c) => c * res;
    }

    return res;
};

const div = (a, b) => {
    let res = a;

    if (isNumber(a) && isNumber(b)) {
        res /= b;
    }

    if (isEmptyArg(b)) {
        return (c) => c / res;
    }

    return res;
};

const pipe = (...actions) => (a) => {
    let res = a;

    actions.forEach((action) => {
        res = action(res);
    });

    return res;
};

const a = add(1, 2); // 3
console.log(`a = ${a};`);

const b = mul(a, 10); // 30
console.log(`b = ${b};`);

const sub1 = sub(1); // sub1 отнимает от любого числа единицу
const c = sub1(b); // 29
console.log(`c = ${c};`);

const d = mul(sub(a, 1))(c); // 58
console.log(`d = ${d};`);

const doSmth = pipe(add(d), sub(c), mul(b), div(a));
const result = doSmth(0); // (((0 + 58) - 29) * 30) / 3 = 290
console.log(`result = ${result};`);

const x = pipe(add(1), mul(2))(3); // 8
console.log(`x = ${x};`);
