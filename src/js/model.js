import { API_BY_ID, API_BY_NAME, API_KEY, RESULTS_PER_PAGE } from './config';
import { getJson, sendJson } from './helpers';

///////////////////////////////////////
export const state = {
  recipe: {},
  search: [],
  bookmarks: [],
  resultsPerPage: RESULTS_PER_PAGE,
  page: 1,
};

export const createRecipe = function (result) {
  const { recipe } = result.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    source_url: recipe.source_url,
    image_url: recipe.image_url,
    servings: recipe.servings,
    cooking_time: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};
// Obtain a recipe by ID and returns the recipe's info in an object format
export const getRecipeById = async function (recipeId) {
  try {
    const result = await getJson(API_BY_ID + recipeId + `?key=${API_KEY}`);
    state.recipe = createRecipe(result);
    // console.log(state.bookmarks);
    if (state.bookmarks?.some(rec => rec.id === state.recipe.id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    throw Error(err);
  }
};

// Takes the ingrediant or Recipe name and return a list of objects for each suggestions
export const getRecipesByName = async function (recipeOrIngredient) {
  try {
    const result = await getJson(
      API_BY_NAME + `search=${recipeOrIngredient}` + `&key=${API_KEY}`
    );
    if (result.results === 0)
      throw new Error(
        `No recipe found for the query: "${recipeOrIngredient}"!`
      );
    state.search = result.data.recipes;
    state.page = 1;
  } catch (err) {
    throw Error(err);
  }
};

export const getSearchResultsPage = function (page = state.page) {
  state.page = page;
  const start = (page - 1) * state.resultsPerPage;
  const end = page * state.resultsPerPage;
  return state.search.slice(start, end);
};

export const changePageNum = function (creament) {
  state.page = state.page + +creament;
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = ing.quantity * (newServings / state.recipe.servings);
  });
  state.recipe.servings = newServings;
};

export const retainBookmarks = function () {
  // localStorage.clear();
  localStorage.setItem('bookmark', JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipeObj = state.recipe) {
  console.log(recipeObj);
  state.bookmarks.push(recipeObj);
  state.recipe.bookmarked = true;
  retainBookmarks();
};

export const deleteBookmark = function (id) {
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);
  state.recipe.bookmarked = false;
  retainBookmarks();
};

export const init = function () {
  const bookmark = JSON.parse(localStorage.getItem('bookmark'));
  bookmark && (state.bookmarks = bookmark);
};

init();

const clearBookmarks = function () {
  localStorage.clear();
};

// clearBookmarks();
export const uploadeRecipe = async function (newRecipe) {
  try {
    let ingredientsArr = Object.entries(newRecipe).filter(
      ing => ing[0].startsWith('ingredient') && ing[1] !== ''
    );
    ingredientsArr = ingredientsArr.map(ing => {
      const ingArr = ing[1].split(',');
      if (ingArr.length !== 3)
        throw new Error(
          'Wrong ingredient format! Please use the correct format :)'
        );

      const [quantity, unit, description] = ingArr;

      return {
        quantity: quantity !== '' ? +quantity : null,
        unit,
        description,
      };
    });
    const recipe = {
      title: newRecipe.title,
      publisher: newRecipe.publisher,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      servings: +newRecipe.servings,
      cooking_time: +newRecipe.cookingTime,
      ingredients: ingredientsArr,
      // id: newRecipe.id,
    };

    const data = await sendJson(`${API_BY_NAME}key=${API_KEY}`, recipe);
    state.recipe = createRecipe(data);
    addBookmark();
    console.log(state.recipe);
  } catch (err) {
    throw err;
  }
};
