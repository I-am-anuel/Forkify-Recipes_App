import { View } from './view';

class addRecipeView extends View {
  _addRecipeBtn = document.querySelector('.nav__btn--add-recipe');
  _parentElement = document.querySelector('.upload');
  _showModal = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _submitBtn = document.querySelector('.upload__btn');

  constructor() {
    super();
    this.addHandlerOpenForm();
  }

  _toggleElement(e) {
    e?.preventDefault();
    this._overlay.classList.toggle('hidden');
    this._showModal.classList.toggle('hidden');
  }

  addHandlerOpenForm() {
    this._addRecipeBtn.addEventListener('click', e => {
      e.preventDefault();
      this._toggleElement();
    });
  }

  addHandlerCloseForm(handler) {
    this._showModal.addEventListener('click', e => {
      e.preventDefault();
      const btn = e.target.closest('.btn--close-modal');
      if (btn) this._toggleElement();
      if (e.target.closest('.upload__btn')) {
        const dataArr = [...new FormData(this._parentElement)];
        const data = Object.fromEntries(dataArr);
        // console.log(data);
        handler(data);
      }
    });
    this._overlay.onclick = this._toggleElement.bind(this);
  }
}

export default new addRecipeView();
