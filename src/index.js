import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const searchBox = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

    

searchBox.addEventListener('input', debounce(() => {
    if (!searchBox.value.trim()) {
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
