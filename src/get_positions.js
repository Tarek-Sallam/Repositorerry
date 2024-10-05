import * as calcs from './calcs.js';
var data;

fetch('/data/keplar.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json(); // Parse the JSON data
  })
  .then(keplarData => {
    data = keplarData; // Do something with the JSON data
    console.log(data);
    
    // Use the data and your calculations here
  })
  .catch(error => console.error('Error fetching JSON:', error));

let delta_t = 1;
const grav_constant = 6.674e-11;
const sun_mass = 1.989e+30;

//let orbital_time = 2 * Math.PI * (Math.sqrt(Math.pow(a,3)/grav_constant*sun_mass));