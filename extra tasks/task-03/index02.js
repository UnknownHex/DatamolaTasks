const arr1 = [7,1,5,3,6,4];
const arr2 = [1,2,3,4,5];
const arr3 = [7,6,4,3,1];

const getMaxProfit = (arr) => {
    if (arr.length < 2) return 0;

    const priceList = arr.slice(1);
    let tmpMin = arr[0];
    let tmpProfit = 0;
    let profit = 0;

    for (let _ = 0; _ < priceList.length; _++) {
        const currentProfit = priceList[_] - tmpMin;
        if (currentProfit > tmpProfit) tmpProfit = currentProfit;
        else {
            profit += tmpProfit;
            tmpProfit = 0;
            tmpMin = priceList[_];
        }

        if (priceList.length - 1 === _ && tmpProfit > 0) profit += currentProfit; 
    }

    return profit;
}

const res1 = getMaxProfit(arr1);
console.log(res1);

const res2 = getMaxProfit(arr2);
console.log(res2);

const res3 = getMaxProfit(arr3);
console.log(res3);
