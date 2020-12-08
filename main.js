const formSearch = document.querySelector('.form-search'),
    inputCitiesFrom = formSearch.querySelector('.input__cities-from'),
    dropdownCitiesFrom = formSearch.querySelector('.dropdown__cities-from'),
    inputCitiesTo = formSearch.querySelector('.input__cities-to'),
    dropdownCitiesTo = formSearch.querySelector('.dropdown__cities-to'),
    inputDateDepart = formSearch.querySelector('.input__date-depart');

const API_KEY = 'a48436647c3ebcae5703dcab2dfa5449',
    citiesApi = 'cities.json',
    priceApi = 'http://min-prices.aviasales.ru/calendar_preload',
    proxy = 'https://cors-anywhere.herokuapp.com/';

let cities = [];

//Получение данных с базы
const getData = (url, callback) => {
    const request = new XMLHttpRequest();

    request.open('GET', url);
    request.addEventListener('readystatechange', () => {
        if (request.readyState !== 4) return null;

        if (request.status === 200) {
            callback(request.response);
        } else {
            console.error(request.status);
        }
    });
    request.send();
};


//показ списка поиска  - город вылета
const showCities = (input, dropdown) => {

    dropdown.textContent = '';

    if (input.value) {

        //Фильтрация на содержание введенных букв
        const citiesFilter = cities.filter((item) => {
            if(!item.name) return false;
            const fixItem = item.name.toLowerCase();
            return fixItem.includes(input.value.toLowerCase());
        });


        //создание списка из городов после фильтрации
        citiesFilter.forEach((item) => {
            const li = document.createElement('li');
            li.classList.add('dropdown__city');
            li.textContent = item.name;
            dropdown.append(li);
        });
    }


};

//Выбор города из списка
const handlerCity = (event, input, dropdown) => {
    const target = event.target;
    if (target.tagName.toLowerCase() === 'li') {
        input.value = target.textContent;
        dropdown.textContent = '';
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


//Обработка выбора города с выпадающего списка - dropdownCitiesFrom
dropdownCitiesFrom.addEventListener('click', (event) => {
    handlerCity(event, inputCitiesFrom, dropdownCitiesFrom);
});


//Обработка выбора города с выпадающего списка - dropdownCitiesTo
dropdownCitiesTo.addEventListener('click', (event) => {
    handlerCity(event, inputCitiesTo, dropdownCitiesTo);
});


getData(citiesApi, (data) => {
     cities = (JSON.parse(data));
});