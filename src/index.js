import  onFetch  from './js/fetch.js';
import SimpleLightbox from 'simplelightbox';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { onRenderList } from './js/onRender.js';
import { ProgressBar } from 'react-loader-spinner';

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









function onClean() {
  numberPage = 1;
  galery.innerHTML = '';
  loadMoreBtn.style.display = 'none' 
}

let mask = document.querySelector('.loader-inner');

window.addEventListener('load', () =>
{
  mask.classList.add('hide');
  setTimeout(() => {
mask.remove()
  }, 400)
})


  // scroll to top//

window.onload = () => {
  window.onscroll = function (e) {
    let winY = window.scrollY;
    if (winY > 300) {
      ProgressBar();
      scrollbarAnimation();
      winY = null;
    }
  };
  const scrollBtn = document.querySelector('.isShowBtn')
  window.onscroll = () => {
    if (window.scrollY > 300) {
      scrollBtn.classList.remove('isHiden');
    } else {
      scrollBtn.classList.add('isHiden');
    }
  }

  scrollBtn.onclick = () => {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }

};