import icons from '../img/icons.svg';
import { View } from './view';

class paginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _markup;
  #data;
  #page;

  generateMarkup() {
    // At page 1 with other pages
    const maxPages = Math.ceil(
      this.#data.search.length / this.#data.resultsPerPage
    );

    if (this.#data.page === 1 && maxPages > this.#data.page)
      return `<button class="btn--inline pagination__btn--next">
              <span>Page ${this.#page + 1}</span>
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
              </svg>
            </button>`;

    if (maxPages === this.#data.page && this.#data.page != 1)
      return `<button class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this.#page - 1}</span>
          </button>
          `;
    if (maxPages === this.#data.page && this.#data.page === 1) return '';

    return `<button class="btn--inline pagination__btn--next">
              <span>Page ${this.#page + 1}</span>
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
              </svg>
            </button>
            <button class="btn--inline pagination__btn--prev">
                  <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                  </svg>
                  <span>Page ${this.#page - 1}</span>
                </button>
                `;
  }

  renderPage(data) {
    this.#data = data;
    this.#page = this.#data.page;
    this.renderRecipe(this.generateMarkup());
  }

  addPageHandler(handler) {
    this._parentElement.addEventListener('click', e => {
      e.preventDefault();
      if (!e.target.closest('.btn--inline')) return;
      if (e.target.closest('.pagination__btn--next')) handler(+1);
      if (e.target.closest('.pagination__btn--prev')) handler(-1);
    });
  }
}

export default new paginationView();
