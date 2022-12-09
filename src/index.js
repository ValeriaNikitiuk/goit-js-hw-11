import  onFetch  from './js/fetch.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.search-form');
const galery = document.querySelector('.gallery');
const searchBtn = document.querySelector('.search-btn');
let pageNumber = 1;
const loadMoreBtn = document.querySelector('.load-more__btn');
loadMoreBtn.style.display = 'none';

// , onClickSerach);
// loadMoreBtn .addEventListener('click', onSubSerach);

searchBtn.addEventListener('click', e => {
  e.preventDeafault();
  onClean();
  const valueTrim = form.value.trim();
  if (valueTrim !== '') {
    onFetch(valueTrim, pageNumber)
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
});




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
  pageNumber = 1;
  galery.innerHTML = '';
  loadMoreBtn.style.display = 'none' 
}

