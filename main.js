const formSearch = document.querySelector('.form-search'),
    inputCitiesFrom = formSearch.querySelector('.input__cities-from'),
    dropdownCitiesFrom = formSearch.querySelector('.dropdown__cities-from'),
    inputCitiesTo = formSearch.querySelector('.input__cities-to'),
    dropdownCitiesTo = formSearch.querySelector('.dropdown__cities-to'),
    inputDateDepart = formSearch.querySelector('.input__date-depart');


const cities = ['Москва', 'Киев', 'Харьков', 'Одесса', 'Львов', 'Кировоград',
    'Минск', 'Санкт-Петербург', 'Волгоград', 'Днепр', 'Ужгород', 'Сумы'
];


inputCitiesFrom.addEventListener('input', () => {
    const citiesFilter = cities.filter((item) => {

    });
});

