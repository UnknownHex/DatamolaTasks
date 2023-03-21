const DAYS = ['Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTHS = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const createTable = (caption) => {
    const table = document.createElement('table');
    const tr = document.createElement('tr');

    if (caption) {
        const tableCaption = document.createElement(`caption`);
        tableCaption.insertAdjacentText('beforeend', caption);

        table.insertAdjacentElement('beforeend', tableCaption);
    }

    DAYS.forEach((day) => {
        const th = document.createElement('th');
        th.insertAdjacentHTML('beforeend', day);

        tr.insertAdjacentElement('beforeend', th);
    });

    table.insertAdjacentElement('beforeend', tr);

    return table;
}

const createCell = (data = null) => {
    const cell = document.createElement('td');
    cell.insertAdjacentText('beforeend', data || '');

    return cell;
}

const createCalendar = (selector, year, month) => {
    const element = document.querySelector(selector);
    const originalMonth = month - 1;

    if (!element) {
        console.log(`Can't find element with "${selector}" selector;`);
        return null;
    }

    if (originalMonth > 11 || originalMonth < 0) {
        console.log(`Month must be from 1 to 12;`);
        return null;
    }

    const date = new Date(year, originalMonth);
    const caption = `${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
    const calendar = createTable(caption);

    let currentWeek = document.createElement('tr');
    let dayArray = Array(date.getDay() === 0 ? 6 : date.getDay() - 1);
    dayArray.fill(null);

    dayArray.forEach(() => {
        currentWeek.insertAdjacentElement('beforeend', createCell());
    });
    calendar.insertAdjacentElement('beforeend', currentWeek);


    while (date.getMonth() === originalMonth) {
        const currentDate = date.getDate() <= 9 ? `0${date.getDate()}` : date.getDate();
        
        if (dayArray.length % 7 === 0) {
            calendar.insertAdjacentElement('beforeend', currentWeek);
            currentWeek = document.createElement('tr');
        }
        
        dayArray = [...dayArray, currentDate];
        date.setDate(date.getDate() + 1);
        currentWeek.insertAdjacentElement('beforeend', createCell(currentDate));
    }

    while (dayArray.length % 7 !== 0) {
        dayArray = [...dayArray, null];
        currentWeek.insertAdjacentElement('beforeend', createCell());
    }

    calendar.insertAdjacentElement('beforeend', currentWeek);

    element.append(calendar);

    return dayArray;
}

createCalendar('.app', 2023, 3);