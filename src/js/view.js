import icons from '../img/icons.svg';

export class View {
  // Render the list of results from user search
  renderRecipe(htmlToInsert = this._markup) {
    this.clearInnerHtml();
    this._parentElement.insertAdjacentHTML('beforeend', htmlToInsert);
  }

  //   Renders the load spinner on the screen
  showSpinner() {
    this.clearInnerHtml();
    this._parentElement.insertAdjacentHTML(
      'afterbegin',
      `<div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div>`
    );
  }

  //   Clears the screen
  clearInnerHtml() {
    this._parentElement.innerHTML = '';
  }

  render(data) {
    this._data = data;
    this._markup = this._generateMarkup();
    this.clearInnerHtml();
    this.renderRecipe();
  }

  //   Show error message
  renderError(
    errorMessage = 'No recipes found for your query. Please try again!'
  ) {
    const errorMarkup = `<div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${errorMessage}</p>
          </div>`;
    this.clearInnerHtml();
    this._parentElement.insertAdjacentHTML('beforeend', errorMarkup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDom.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));
    newElements.forEach((el, i) => {
      const curElem = curElements[i];
      if (
        curElem &&
        !el.isEqualNode(curElem) &&
        el.firstChild?.nodeValue.trim() !== ''
      ) {
        curElem.textContent = el.textContent;
        // console.log(el.firstChild);
      }

      if (!el.isEqualNode(curElem)) {
        Array.from(el.attributes).forEach(attr => {
          curElem?.setAttribute(attr.name, attr.value);
        });
      }
    });
  }
}
