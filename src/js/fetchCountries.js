export const fetchCountries = name => {
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,official,capital,languages,flags,population`)
        .then(response => {
            console.log(response);
            if (response.ok) {
                return response.json();   
            }
           
            throw new Error(response.status);
        })
    
        .catch(error => console.log(error))
};