import { View } from './view';

class ResultView extends View {
  _parentElement = document.querySelector('.search');
  #query;

  //   Adds event listener that triggers a handler function
  addHandlerRender(handler) {
    this._parentElement.addEventListener('click', e => {
      e.preventDefault();
      if (e.target != e.currentTarget.querySelector('.search__btn')) return;
      this.#query = e.currentTarget.querySelector('.search__field').value;
      handler(e);
      e.currentTarget.querySelector('.search__field').value = '';
    });
  }

  getQuery() {
    return this.#query;
  }
}

export default new ResultView();
