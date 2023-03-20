const DAYS = ['Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat', 'Sun'];

const createTable = () => {
    const table = document.createElement('table');
    const tableHeader = document.createElement('tr');

    DAYS.forEach((day) => {
        const th = document.createElement('th');
        th.insertAdjacentHTML('beforeend', day);

        tableHeader.insertAdjacentElement('beforeend', th);
    });

    table.insertAdjacentElement('beforeend', tableHeader);

    return table;
}

const createCalendar = (selector, year, month) => {
    const element = document.querySelector(selector);
    const jsMonth = month - 1;

    if (!element) {
        console.log(`Can't find element with ${selector} selector;`);
        return null;
    }

    if (jsMonth > 11 || jsMonth < 0) {
        console.log(`Month must be from 1 to 12;`);
    }

    const calendar = createTable();
    const date = new Date(year, jsMonth);

    console.log(date);

    let currentWeek = document.createElement('tr');
    let dayArray = Array(date.getDay() === 0 ? 6 : date.getDay() - 1);
    dayArray.fill(null);

    dayArray.forEach(() => currentWeek.insertAdjacentHTML('beforeend', `<td></td>`));
            calendar.insertAdjacentElement('beforeend', currentWeek)


    while (date.getMonth() === jsMonth) {
        const currentDate = date.getDate() <= 9 ? `0${date.getDate()}` : date.getDate();
        
        if (dayArray.length % 7 === 0) {
            calendar.insertAdjacentElement('beforeend', currentWeek)
            currentWeek = document.createElement('tr');
        }
        
        dayArray = [...dayArray, currentDate];
        date.setDate(date.getDate() + 1);
        currentWeek.insertAdjacentHTML('beforeend', `<td>${currentDate}</td>`);
    }

    calendar.insertAdjacentElement('beforeend', currentWeek)

    document.querySelector(selector)?.append(calendar);
}

createCalendar('.app', 2023, 10);