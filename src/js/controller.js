import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model.js';
import recipeView from './recipeView.js';
import resultView from './resultView.js';
import searchView from './searchView.js';
import paginationView from './paginationView.js';
import bookmarkView from './bookmarkView.js';
import addRecipeFormView from './addRecipeFormView.js';

if (module.hot) {
  module.hot.accept();
}

// Controls rendering clicked recipes, hashchanges, or url with hash
const controlRecipes = async function () {
  try {
    // model.init();
    const recipeHash = window.location.hash.replace('#', '');
    if (!recipeHash) return true;
    recipeView.showSpinner();
    await model.getRecipeById(recipeHash);

    console.log(model.state.recipe);

    recipeView.render(model.state.recipe);
    bookmarkView.update(model.state.bookmarks);
    resultView.update(model.state.search);
    if (model.state.bookmarks[0]) bookmarkView.render(model.state.bookmarks);
  } catch (err) {
    console.log(err);
    recipeView.renderError();
  }
};

const controlPagination = function (creament) {
  model.changePageNum(creament);
  paginationView.renderPage(model.state);
  resultView.render(model.getSearchResultsPage());
};

// Controls getting search query and rendering results in UI
const controlSearchResult = async function (e) {
  e.preventDefault();
  try {
    resultView.showSpinner();
    await model.getRecipesByName(searchView.getQuery());
    paginationView.renderPage(model.state);
    resultView.render(model.getSearchResultsPage());
  } catch (err) {
    console.log(err);
    resultView.renderError(err.message);
  }
};

const controlServings = function (newServings) {
  model.updateServings(newServings);
  recipeView.update(model.state.recipe);
};

const controlBookmarkRecipe = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  recipeView.update(model.state.recipe);
  bookmarkView.render(model.state.bookmarks);
  bookmarkView.update(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // console.log(newRecipe);
    await model.uploadeRecipe(newRecipe);

    addRecipeFormView.renderError('Recipe Successfully added.');

    bookmarkView.render(model.state.bookmarks);

    // window.history.pushState(null, '', `#${model.state.recipe.id}`);

    setTimeout(() => {
      addRecipeFormView._toggleElement();
      recipeView.showSpinner();
      recipeView.render(model.state.recipe);
    }, 1 * 1000);
    // bookmarkView.render(model.state.bookmarks);
    // bookmarkView.update(model.state.bookmarks);
    // if (model.state.bookmarks[0]) bookmarkView.render(model.state.bookmarks);
  } catch (err) {
    addRecipeFormView.renderError(err.message);
  }
};

// Logic of the code
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerBookmark(controlBookmarkRecipe);
  searchView.addHandlerRender(controlSearchResult);
  paginationView.addPageHandler(controlPagination);
  recipeView.addHandlerUpdateServings(controlServings);

  addRecipeFormView.addHandlerCloseForm(controlAddRecipe);
};
init();
