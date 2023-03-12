const arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4];

const getSum = (arr) => {
    let sum = 0;
    let tmp = 0;

    for (let _ of arr) {
        sum += _;
        
        if (sum <= 0) sum = 0;
        tmp = sum > tmp ? sum : tmp;
    }

    return tmp;
}

const res = getSum(arr);
console.log(res);
