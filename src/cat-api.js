const URL = 'https://api.thecatapi.com/v1';
const API_KEY =
  'live_FLrLX5cOyWpZ4hTRSYhhKjHFvl8atrrdkvxBOWnj7FYCaIU98Xkeq3lbdVtyjJiW';

export function fetchBreeds() {
  return fetch(`${URL}/breeds?api_key=${API_KEY}`).then(response => {
    if (!response.ok) throw new Error(response.status);

    return response.json();
  });
}
export function fetchCatByBreed(breedID) {
  return fetch(
    `${URL}/images/search?api_key=${API_KEY}&breed_ids=${breedID}`
  ).then(response => {
    if (!response.ok) throw new Error(response.status);

    return response.json();
  });
}
