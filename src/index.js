import  onFetch  from './js/fetch.js';
import SimpleLightbox from 'simplelightbox';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'simplelightbox/dist/simple-lightbox.min.css';


// const form = document.querySelector('.search-form');
let numberPage = 1;
const galery = document.querySelector('.gallery');
const searchBtn = document.querySelector('.search-btn');
const input = document.querySelector('.input');
const loadMoreBtn = document.querySelector('.load-more__btn');
loadMoreBtn.style.display = 'none';
let gallerySimpleLightbox = new SimpleLightbox('.gallery a');



searchBtn.addEventListener('click', onBtnSubmit);
loadMoreBtn.addEventListener('click', onClickMore);

function onBtnSubmit(e)  {
  e.preventDefault();
  onClean();
  const valueTrim = input.value.trim();
  if (valueTrim !== '') {
  onFetch(valueTrim, numberPage)
    .then(foundData => {
      if (foundData.hits.length === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        onRenderList(foundData.hits);
        Notify.success(
          "Hooray! We found totalHits images."
        );
        loadMoreBtn.style.display = 'block';
          gallerySimpleLightbox.refresh();
                
      }
    })
}

}

function onClickMore() {
  numberPage++;
  const valueTrim = input.value.trim();
  loadMoreBtn.style.display = 'none';
  onFetch(valueTrim, numberPage)
      .then(foundData => {
        if (foundData.hits.length === 0) {
          Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        } else {
          onRenderList(foundData.hits);
          Notify.success(
            "Hooray! We found totalHits images."
          );
          loadMoreBtn.style.display = 'block';
                 
        }
      })
  }



function onRenderList(images) {
      console.log(images, 'images');
    const markupImg = images.map(image => {
        
      console.log('img', image);
        return `
    <div class="photo-card">
 <a href="${image.largeImageURL}"><img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" /></a>
  <div class="info">
    <p class="info-item">
      <b>Likes:${image.likes}</b>
    </p>
    <p class="info-item">
      <b>Views:${image.views}</b>
    </p>
    <p class="info-item">
      <b>Comments:${image.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads:${image.downloads}</b>
    </p>
  </div>
</div>`;
    }).join('')
    galery.innerHTML += markupImg;
    
}




function onClean() {
  numberPage = 1;
  galery.innerHTML = '';
  loadMoreBtn.style.display = 'none' 
}

