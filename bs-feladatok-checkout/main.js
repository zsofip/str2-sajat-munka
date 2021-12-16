$('.dropdown-toggle').dropdown()

let statesOfCountries = {
    "USA": ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'],
    "Hungary": ['Baranya','Bács-Kiskun','Békés','Borsod-Abaúj-Zemplén','Fejér','Csongrád','Győr-Moson-Sopron','Hajdú-Bihar','Heves','Jász-Nagykun-Szolnok','Komárom-Esztergom','Nógrád','Pest','Somogy','Szabolcs-Szatmár-Bereg','Tolna','Vas','Veszprém','Zala']
  }

  window.onload = function() {
  let country = document.querySelector("#inputCountry");
  let state = document.querySelector("#inputState");
  for (let x in statesOfCountries) {
    country.options[country.options.length] = new Option(x, x);
  }
  country.onchange = function() {
    state.length = 1;
    let y = statesOfCountries[this.value];
    for (let i = 0; i < y.length; i++) {
    state.options[state.options.length] = new Option(y[i], y[i]);
    }
  }
}
