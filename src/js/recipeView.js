import icons from '../img/icons.svg';
import { View } from './view';
import fracty from 'fracty';

// "default": "index.html",

class RenderView extends View {
  _parentElement = document.querySelector('.recipe');
  _data;
  _markup;

  // Prepare the html component for a recide that will be rendered
  _generateMarkup() {
    const renderIngredients = function (ingredientArr) {
      const html = ingredientArr
        .map(row => {
          // console.log(row.quantity);
          return `<li class="recipe__ingredient">
          <svg class="recipe__icon">
            <use href="${icons}#icon-check"></use>
          </svg>
          <div class="recipe__quantity">${
            row.quantity ? fracty(row.quantity).toString() : ''
          }</div>
          <div class="recipe__description">
            <span class="recipe__unit">${row.unit}</span>
            ${row.description}
          </div>
        </li>`;
        })
        .join('');
      return html;
    };
    return `<figure class="recipe__fig">
    <img src="${this._data.image_url}" alt="Tomato" class="recipe__img" />
    <h1 class="recipe__title">
      <span>${this._data.title}</span>
    </h1>
  </figure>
  
  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${
        this._data.cooking_time
      }</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${
        this._data.servings
      }</span>
      <span class="recipe__info-text">servings</span>
  
      <div class="recipe__info-buttons">
        <button class="btn--tiny btn--decrease-servings" data-servings = "${
          this._data.servings - 1
        }">
          <svg>
            <use href="${icons}#icon-minus-circle"></use>
          </svg>
        </button>
        <button class="btn--tiny btn--increase-servings" data-servings = "${
          this._data.servings + 1
        }">
          <svg>
            <use href="${icons}#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>

    
    <div class="recipe__user-generated ${!this._data.key ? 'hidden' : ''}">
      <svg>
        <use href="${icons}#icon-user"></use>
      </svg>
    </div>
    
    <button class="btn--round btn--bookmark">
      <svg class="">
        <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? '-fill' : ''
    }"></use>
      </svg>
    </button>
  </div>
  
  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">
      ${renderIngredients(this._data.ingredients)}
    </ul>
  </div>
  
  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${
        this._data.publisher
      }</span>. Please check out
      directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      href="${this._data.source_url}"
      target="_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </a>
  </div>`;
  }

  //   Adds event listener that triggers a handler function
  addHandlerRender(controlFnc) {
    ['hashchange', 'load'].forEach(event => {
      window.addEventListener(event, e => {
        e.preventDefault();
        console.log('hashchange or load');
        controlFnc();
      });
    });
  }

  // render(recipeObj) {
  //   this.#data = recipeObj;

  //   const markup = this.arrangeRecipeHtml(this.#data);
  //   this.clearInnerHtml();
  //   this.renderRecipe(markup);
  // }

  // update(recipeObj) {
  //   this._data = recipeObj;
  //   const newMarkup = this.arrangeRecipeHtml(this.#data);
  //   const newDom = document.createRange().createContextualFragment(newMarkup);
  //   const newElements = Array.from(newDom.querySelectorAll('*'));
  //   const curElements = Array.from(this._parentElement.querySelectorAll('*'));
  //   newElements.forEach((el, i) => {
  //     const curElem = curElements[i];
  //     if (!el.isEqualNode(curElem) && el.firstChild?.nodeValue.trim() !== '') {
  //       curElem.textContent = el.textContent;
  //       // console.log(el.firstChild);
  //     }

  //     if (!el.isEqualNode(curElem)) {
  //       Array.from(el.attributes).forEach(attr => {
  //         curElem.setAttribute(attr.name, attr.value);
  //       });
  //     }
  //   });
  // console.log(newElements, curElements);
  // }

  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener('click', e => {
      e.preventDefault();
      const btn = e.target.closest('.btn--tiny');
      if (!btn) return;
      const { servings } = btn.dataset;
      console.log(+servings);
      +servings > 0 && handler(+servings);
    });
  }

  addHandlerBookmark(handler) {
    this._parentElement.addEventListener('click', e => {
      e.preventDefault();
      const bookm = e.target.closest('.btn--bookmark');
      if (!bookm) return;
      handler();
    });
  }
}

export default new RenderView();
