const formSearch = document.querySelector('.form-search'),
    inputCitiesFrom = formSearch.querySelector('.input__cities-from'),
    dropdownCitiesFrom = formSearch.querySelector('.dropdown__cities-from'),
    inputCitiesTo = formSearch.querySelector('.input__cities-to'),
    dropdownCitiesTo = formSearch.querySelector('.dropdown__cities-to'),
    inputDateDepart = formSearch.querySelector('.input__date-depart'),
    cheapestTicket = document.getElementById('cheapest-ticket'),
    templateTicket = document.getElementById('template_ticket').content,
    otherCheapTickets = document.getElementById('other-cheap-tickets');

const API_KEY = 'a48436647c3ebcae5703dcab2dfa5449',
    citiesApi = 'cities.json',
    priceApi = 'http://min-prices.aviasales.ru/calendar_preload',
    moneyApi = 'http://yasen.aviasales.ru/adaptors/currency.json',
    proxy = 'https://cors-anywhere.herokuapp.com/';

let cities = [];
let currency;

// TODO Получение данных с базы
const getData = (url, callback) => {
    const request = new XMLHttpRequest();

    request.open('GET', url);
    request.addEventListener('readystatechange', () => {
        if (request.readyState !== 4) return null;


        if (request.status === 200) {
            callback(request.response);
        }
        else if(request.status === 400)
        {
            alert("К сожалению билетов не найдено");
        }
        else {
            console.error(request.status);
        }
    });
    request.send();
};


// TODO показ списка поиска  - город вылета
const showCities = (input, dropdown) => {

    dropdown.textContent = '';

    if (input.value) {

        //Фильтрация на содержание введенных букв
        const citiesFilter = cities.filter((item) => {
            if (!item.name) return false;
            const fixItem = item.name.toLowerCase();
            return fixItem.startsWith(input.value.toLowerCase());
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

// TODO Выбор города из списка
const handlerCity = (event, input, dropdown) => {
    const target = event.target;
    if (target.tagName.toLowerCase() === 'li') {
        input.value = target.textContent;
        dropdown.textContent = '';
    }
};


const getChange = (data) => {
    if (data) {
        return data === 1 ? "Одна пересадка" : `${data} пересадок`;
    } else return "Без пересадок";
};

const createCard = (data) => {

    const ticket = templateTicket.cloneNode(true);
    if(data)
    {
        ticket.querySelector('.agent').textContent = data.gate;
        ticket.querySelector('.price_ticket').textContent = "Купить за " + Math.floor(data.value/currency) + "₴";
        ticket.querySelector('.name_from').textContent = data.origin;
        ticket.querySelector('.date').textContent = data.depart_date;
        ticket.querySelector('.changes').textContent = getChange(data.number_of_changes);
        ticket.querySelector('.name_to').textContent = data.destination;
    }
    else ticket.querySelector('.cheapest-ticket-title').textContent = "К сожалению билетов нет";
    return ticket;
};

// TODO получение билетов по текущей дате
const renderCheapDate = (cheapTicket) => {
    const ticket = createCard(cheapTicket[0]);
    cheapestTicket.append(ticket);
};

// TODO получение билетов на ближайшее время
const renderCheapYear = (cheapTicket) => {
    const tickets = cheapTicket.sort((a, b) => a.value - b.value).slice(0,10);
    for (ticket of tickets){
        otherCheapTickets.append(createCard(ticket));
    }
};

// TODO получение билетов
const renderCheap = (data, when) => {
    const cheapTicketYear = JSON.parse(data).best_prices;
    const cheapTicketDate = cheapTicketYear.filter((item) => item.depart_date === when);
    renderCheapDate(cheapTicketDate);
    renderCheapYear(cheapTicketYear);
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


//Обработка клика на кнопку поиска
formSearch.addEventListener('submit', (event) => {
    event.preventDefault();
    cheapestTicket.textContent = '';
    const formData = {
        from: cities.find((item) => inputCitiesFrom.value === item.name),
        to: cities.find((item) => inputCitiesTo.value === item.name),
        when: inputDateDepart.value
    };

    if (formData.from && formData.to) {
        const requestString = `?depart_date=${formData.when}&origin=${formData.from.code}&destination=${formData.to.code}&one_way=true&token=${API_KEY}`;
        getData(priceApi + requestString, (response) => {
            renderCheap(response, formData.when);
        });
    } else alert("Введите коректные названя городов");
});


getData(citiesApi, (data) => {
    cities = JSON.parse(data);
    cities.sort((a, b) => a.value - b.value);
});

getData( proxy + moneyApi, (data) => {
    currency = JSON.parse(data);
    currency = currency['uah'];
});