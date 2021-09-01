const err = document.getElementById('error');
const spinner = document.getElementById('spinner');
const container = document.getElementById('container')
const detail = document.getElementById('see-detail');

const fetchedData =async url => {
    const res =await fetch(url);
    const data = await res.json();
    return data;
}
const handleClick = ()=> {
    spinner.classList.remove('d-none');
    container.innerHTML = "";
    detail.innerHTML = "";
    const inputValue = document.getElementById('input-field').value;
    if(inputValue.length === 0){
        err.classList.remove('d-none');
        err.innerText = "Search Field can't be empty "
        spinner.classList.add('d-none');
    }else{
        err.classList.add('d-none');
        err.innerText = ""
        fetchedData(`https://restcountries.eu/rest/v2/name/${inputValue}`)
            .then(data => displayCountries(data))
        document.getElementById('input-field').value = '';
    }
}
const displayCountries = data => {
    spinner.classList.add('d-none');
    if(data.status === 404){
        err.classList.remove('d-none');
        err.innerText = "Not Found the country"
    }
    else{
        data.forEach(country => {
            const countryDiv = document.createElement('div');
            countryDiv.innerHTML = `
            <div class="col">
                <div class="text-center">
                    <div class="p-2 border rounded-2">
                        <img class="img-fluid" src="${country.flag}"/>
                    </div>
                    <h2 class="py-3">${country.name}</h2>
                    <button class="btn btn-danger" onclick="loadDetail('${country.alpha3Code}')">See Detail</button>
                <div>
            </div>
            `
            container.appendChild(countryDiv);
        })
    }
}

const loadDetail = code => {
    detail.innerHTML = "";
    fetchedData(`https://restcountries.eu/rest/v2/alpha/${code}`)
        .then(data => displayDetail(data))
}

const displayDetail = country => {
    detail.classList.add('px-2','my-3')
    detail.innerHTML = `
        <div>
            <p>Country Name : ${country.name}</p>
            <p>Capital City : ${country.capital}</p>
            <p>Population : ${country.population}</p>
        </div>
    `
}