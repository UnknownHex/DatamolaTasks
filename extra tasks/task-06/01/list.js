const defList = [
    {
        value: 'Пункт 1.',
        children: [
            {
                value: 'Подпункт 1.1.',
                children: [
                    {
                        value: 'Подпункт 1.1.1.',
                        children: [
                            {
                                value: 'Подпункт 1.1.1.1.',
                                children: [
                                    {
                                        value: 'Подпункт 1.1.1.1.1.',
                                        children: [
                                            {
                                                value: 'Подпункт 1.1.1.1.1.1.',
                                                children: [
                                                    {
                                                        value: 'Подпункт 1.1.1.1.1.1.1.',
                                                        children: null,
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                    {
                                        value: 'Подпункт 1.1.1.1.2.',
                                        children: null,
                                    },
                                    {
                                        value: 'Подпункт 1.1.1.1.3.',
                                        children: null,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        value: 'Пункт 2.',
        children: [
            {
                value: 'Подпункт 2.1.',
                children: null,
            },
            {
                value: 'Подпункт 2.2.',
                children: [
                    {
                        value: 'Подпункт 2.2.1.',
                        children: null,
                    },
                    {
                        value: 'Подпункт 2.2.2.',
                        children: null,
                    }
                ],
            },
            {
                value: 'Подпункт 2.3.',
                children: [
                    {
                        value: 'Подпункт 2.3.1.',
                        children: null,
                    },
                    {
                        value: 'Подпункт 2.3.1.',
                        children: [
                            {
                                value: 'Подпункт 2.3.1.1.',
                                children: null,
                            },
                            {
                                value: 'Подпункт 2.3.1.2.',
                                children: null,
                            }
                        ],
                    },
                ],
            },
        ]
    },
    {
        value: 'Пункт 3.',
        children: null,
    }
];

const generateList = (partOfList) => {
    const ul = document.createElement('ul');
    const listItems = generateListItems(partOfList);

    listItems.forEach((element) => {
        ul.appendChild(element);
    });

    return ul;
};

const generateListItems = (partOfList) => {
    const createLi = (data = null) => {
        const li = document.createElement('li');
        li.insertAdjacentHTML('beforeend', `<span>${data}</span>` || '');
        return li;
    };

    const res = partOfList.map((item) => {
        if (item.children) {
            const innerList = createLi(item.value);
            innerList.appendChild(generateList(item.children));

            return innerList;
        }
        return createLi(item.value);
    });

    return res;
}

const createList = (title, list) => {
    const header = document.createElement('h2');
    const main = document.createElement('div');

    main.appendChild(generateList(list));
    main.id = 'list-container';
    header.insertAdjacentHTML('beforeend', title);

    document.body.appendChild(header);
    document.body.appendChild(main);

    main.addEventListener('click', (e) => {
        if (e.target.tagName === 'SPAN' && e.target.nextElementSibling?.closest('ul')) {
            e.target.nextElementSibling.classList.toggle('hide');
        }
    });
};

createList('List title here...', defList);
