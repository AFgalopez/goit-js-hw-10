// index.js
import SlimSelect from 'slim-select';
import axios from 'axios';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const errorElement = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');
const catImage = document.createElement('img');

async function initializeApp() {
  try {
    // Mostrar el estado de carga
    showLoader();

    // Obtener la lista de razas y rellenar el selector
    const breeds = await fetchBreeds();
    populateBreedsSelector(breeds);

    // Escuchar el evento de cambio en el selector
    breedSelect.addEventListener('change', async event => {
      const selectedBreedId = event.target.value;
      if (selectedBreedId) {
        await showCatByBreed(selectedBreedId);
      }
    });
  } catch (error) {
    // Manejar el error
    showError(error);
  } finally {
    // Ocultar el estado de carga
    hideLoader();
  }
}

function populateBreedsSelector(breeds) {
  breedSelect.innerHTML = breeds
    .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
    .join('');
}

async function showCatByBreed(breedId) {
  try {
    // Mostrar el estado de carga
    showLoader();
    hideCatInfo();

    // Hacer la petición HTTP para obtener información sobre el gato
    const catData = await fetchCatByBreed(breedId);

    // Mostrar la imagen del gato
    catImage.src = catData.url;
    catImage.alt = 'Cat Image';
    catInfo.appendChild(catImage);

    // Mostrar información detallada sobre el gato
    const catDetails = document.createElement('div');
    catDetails.innerHTML = `
      <h3>${catData.breeds[0].name}</h3>
      <p>${catData.breeds[0].description}</p>
      <p><strong>Temperament:</strong> ${catData.breeds[0].temperament}</p>
    `;
    catInfo.appendChild(catDetails);

    showCatInfo();
  } catch (error) {
    // Manejar el error
    showError(error);
  } finally {
    // Ocultar el estado de carga
    hideLoader();
  }
}

function showLoader() {
  loader.style.display = 'block';
  breedSelect.style.display = 'none';
  catInfo.style.display = 'none';
  hideError();
}

function hideLoader() {
  loader.style.display = 'none';
  breedSelect.style.display = 'block';
}

function showError(error) {
  console.error(error);
  errorElement.style.display = 'block';
}

function hideError() {
  errorElement.style.display = 'none';
}

function showCatInfo() {
  catInfo.style.display = 'block';
}

function hideCatInfo() {
  catInfo.style.display = 'none';
  // Limpiar la información anterior del gato
  catInfo.innerHTML = '';
}

initializeApp();
