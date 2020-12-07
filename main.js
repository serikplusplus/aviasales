const formSearch = document.querySelector('.form-search'),
    inputCitiesFrom = formSearch.querySelector('.input__cities-from'),
    dropdownCitiesFrom = formSearch.querySelector('.dropdown__cities-from'),
    inputCitiesTo = formSearch.querySelector('.input__cities-to'),
    dropdownCitiesTo = formSearch.querySelector('.dropdown__cities-to'),
    inputDateDepart = formSearch.querySelector('.input__date-depart');


const cities = ['Москва', 'Киев', 'Харьков', 'Одесса', 'Львов', 'Кировоград',
    'Минск', 'Санкт-Петербург', 'Волгоград', 'Днепр', 'Ужгород', 'Сумы'
];

//показ списка поиска  - город вылета
const showCities = (input, dropdown) => {

    dropdown.textContent = '';

    if (input.value) {

        //Фильтрация на содержание введенных букв
        const citiesFilter = cities.filter((item) => {
            const fixItem = item.toLowerCase();
            return fixItem.includes(input.value.toLowerCase());
        });


        //создание списка из городов после фильтрации
        citiesFilter.forEach((item) => {
            const li = document.createElement('li');
            li.classList.add('dropdown__city');
            li.textContent = item;
            dropdown.append(li);
            console.log(li);
        });
    }


};


//Обработка ввода в input - Город вылета
inputCitiesFrom.addEventListener('input', () => {
    showCities(inputCitiesFrom, dropdownCitiesFrom);
});


//Обработка ввода в input - Город назначения
inputCitiesTo.addEventListener('input', () => {
    showCities(inputCitiesTo, dropdownCitiesTo);
});


dropdownCitiesFrom.addEventListener('click',(event)=>{
    const target = event.target;
    if(target.tagName.toLowerCase() === 'li')
    {
        inputCitiesFrom.value = target.textContent;
        dropdownCitiesFrom.textContent = '';
    }

});