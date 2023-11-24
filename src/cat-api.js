// cat-api.js
import SlimSelect from 'slim-select';
import axios from 'axios';
import 'slim-select/dist/slimselect.css';

// Obtén tu clave de la API registrándote en The Cat API
axios.defaults.headers.common['x-api-key'] =
  'live_9I8Ht6x4adAvhN6KfkVrihkR6u4EA11SPuAsmoucpPDG6L1fSA4XKyCxmOGjNLkh';

// Función para hacer la petición de la lista de razas
export async function fetchBreeds() {
  try {
    // Hacer la petición HTTP a la colección de razas
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    const breeds = response.data;

    // Devolver las razas
    return breeds;
  } catch (error) {
    // Si hay un error, lánzalo para que pueda ser manejado en el código principal
    throw error;
  }
}

// Función para hacer la petición de información sobre un gato por ID de raza
export async function fetchCatByBreed(breedId) {
  try {
    // Hacer la petición HTTP para obtener información sobre el gato
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
    );
    const catData = response.data[0];

    // Devolver la información del gato
    return catData;
  } catch (error) {
    // Si hay un error, lánzalo para que pueda ser manejado en el código principal
    throw error;
  }
}
