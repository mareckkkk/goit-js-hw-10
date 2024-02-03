import { fetchBreeds, fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const refs = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  err: document.querySelector('.error'),
  catCard: document.querySelector('.cat-info'),
};

Notiflix.Loading.hourglass(refs.loader.textContent, {
  backgroundColor: '#FFFFFF',
  svgColor: '#000000',
  svgSize: '130px',
  messageFontSize: '30px',
});

const updateSelect = function () {
  fetchBreeds()
    .then(data => {
      refs.loader.classList.replace('loader', 'is-hidden');

      const option = data.map(({ id, name }) => {
        return `<option value=${id}>${name}</option>`;
      });
      refs.select.insertAdjacentHTML('beforeend', option);
      new SlimSelect({
        select: refs.select,
      });
    })
    .catch(onError)
    .finally(result => Notiflix.Loading.remove(1000));
};

updateSelect();

refs.select.addEventListener('change', e => {
  const breedId = e.currentTarget.value;

  Notiflix.Loading.arrows({
    svgColor: '#000000',
    svgSize: '130px',
    messageFontSize: '30px',
  });

  fetchCatByBreed(breedId)
    .then(data => {
      data.map(({ url, breeds }) => {
        refs.catCard.innerHTML = `<img src="${url}"/>
              <div class='cat-text-container'>
              <h1>${breeds[0].name}</h1>
              <p>${breeds[0].description}</p>
              <p>Temperament: ${breeds[0].temperament}</p>
              </div>`;
      });
    })
    .catch(onError)
    .finally(result => Notiflix.Loading.remove());
});

function onError() {
  refs.select.classList.add('is-hidden');
  refs.loader.classList.replace('loader', 'is-hidden');
  refs.err.classList.remove('is-hidden');

  Notiflix.Notify.failure(refs.err.textContent);
}
