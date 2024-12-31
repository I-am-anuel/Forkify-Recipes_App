import icons from '../img/icons.svg';
import { View } from './view';

class BookmarkView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _data;
  _markup;

  _generateMarkup() {
    const recipeHash = window.location.hash.replace('#', '');
    // console.log(this._data);
    return this._data
      ?.map(recipe => {
        return `<li class="preview">
            <a class="preview__link ${
              recipe.id === recipeHash ? 'preview__link--active' : ''
            }" href="#${recipe.id}">
              <figure class="preview__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${recipe.title} ...</h4>
                <p class="preview__publisher">${recipe.publisher}</p>
                <div class="preview__user-generated ${
                  !recipe.key ? 'hidden' : ''
                }">
                  <svg>
                    <use href="${icons}#icon-user"></use>
                  </svg>
                </div>
              </div>
            </a>
          </li>`;
      })
      .join('');
  }
}

export default new BookmarkView();
