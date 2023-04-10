import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

//Tworzę zmienną DEBOUNCE_DELAY
//Do zmiennej 'searchBox' dodaje detektor zdarzeń .addEventListener 
//Które będzie obsługiwać zdarzenie 'input' i wywoływać "debounce" 
//tzn. że funkcja zostanie wywołana wtedy gdy nastąpi określona przerwa między zdarzeniami
//Jeżeli w input nie kliknięto wtedy pzekazano countryList i countryInfo                                    *
//Wykorzystano metodę .trim która usuwa tzw. białe znaki 
//Właściwość innerHTML przechowuje zawartość elementu
//Wykorzystuje funkcje fetchCountries która 
//tworzy żądanie HTTP do endpointa /name i przekazuje obietnicę której wynikiem będzie tablica krajów będącą wynikiem żądania.
//Parametrem funkcji "fetchCountries" będzie wartość "searchBox"
//Wykorzystuje bibliotekę Notiflix
//Tworzę zależnośći:
//A) Nie znaleziono kraju o takiej nazwie
//B) Znaleziono zbyt wiele dopasowań. Wprowadź bardziej szczegółową nazwę.
//C) Funkcja "renderCountry" przekazuje parametr(data) jeżeli mieści się w przedziale 2-10 wtedy wykorzystuje metodę map.
//Metoda .map służy do otrzymania przekształconej kopii tablicy
//Ustawiam HTML i CSS 
//Korzystam z metody .join która łączy elementy tablicy w string
//D) Jeżeli znaleziono jeden kraj o tej nazwie, również korzystam z metody .map
//Zapoznaję się z dokumentacją składni filtrów, ograniczając właściwośći do: name/capitol/population/flags/languages
//Analogicznie wykorzystuję metode .join

const DEBOUNCE_DELAY = 300;

const searchBox = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

 

searchBox.addEventListener('input', debounce(() => {
    if (!searchBox.value.trim(), 30000) {
        countryList.innerHTML = "";
        countryInfo.innerHTML = "";
        return;
    }

    fetchCountries(searchBox.value)
    .then(data => {
        renderCountry(data)
    })
    .catch(error => {
        Notiflix.Notify.failure("Oops, there is no country with that name");
        countryList.innerHTML = "";
        countryInfo.innerHTML = "";
    }), DEBOUNCE_DELAY;
    }));
 
function renderCountry(data) {
    if (data.length > 10) {
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
        countryList.innerHTML = "";
        countryInfo.innerHTML = "";
   
    }
    else if (data.length <= 10 && data.length >= 2) {
        const markupList = data
            .map(country => {
                return `<li class="list-item"> <img class="list-image" src="${country.flags.svg}" width="60" height="40">
            <p class "list-item__title">${country.name.official}</p>
            </li>`;
        })
            .join('');
        countryList.innerHTML = markupList;
        countryInfo.innerHTML = '';
        
       
    }

    else if
        (data.length === 1) {
        const markupCountry = data
            .map(country => {
            return `<div class="country-card">
        <div class="card-item">
          <img class="card-image" src="${country.flags.svg}" width="70" height="50">
          <p class="card-title">${country.name.official}</p>
        </div>
          <p class="card-text"><b>Capital:</b> ${country.capital[0]}</p>
          <p class="card-text"><b>Population:</b> ${country.population}</p>
          <p class="card-text"><b>Languages:</b> ${Object.values(country.languages)}
          </p>
      </div>`;
        })
            .join('');
        countryList.innerHTML = markupCountry;
        countryInfo.innerHTML = '';
    }
    }
