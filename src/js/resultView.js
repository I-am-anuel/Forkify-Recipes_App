import icons from '../img/icons.svg';
import { View } from './view';

class ResultView extends View {
  _parentElement = document.querySelector('.results');
  _data;
  _page;
  _markup;

  // Prepares the html code that will create the list of results
  _generateMarkup() {
    const recipeHash = window.location.hash.replace('#', '');
    return this._data
      .map(recipe => {
        return `<li class="preview">
    <a class="preview__link ${
      recipe.id === recipeHash ? 'preview__link--active' : ''
    }" href="#${recipe.id}">
      <figure class="preview__fig">
        <img src="${recipe.image_url}" alt="Test" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${recipe.title} ...</h4>
        <p class="preview__publisher">${recipe.publisher}</p>
        <div class="preview__user-generated ${!recipe.key ? 'hidden' : ''}">
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

  render(searchResult) {
    this._data = searchResult;
    this._page = 0;
    this._markup = this._generateMarkup();
    this.renderRecipe();
  }
}

export default new ResultView();
