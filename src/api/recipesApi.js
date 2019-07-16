import axios from 'axios'

export function getRecipe() {
  return get()
}

export function addRecipe(currentRecipe) {
  return add(currentRecipe)
}

export function modifyRecipe(currentRecipe) {
  return modify(currentRecipe)
}

function get() {
  return axios.get('http://localhost:9627/recipes')
    .then(onSuccess, onError)
}

function add(currentRecipe) {
  return axios.post('http://localhost:9627/recipes',{
      id: currentRecipe.id,
      recipeName: currentRecipe.recipeName,
      img: currentRecipe.img,
      ingredients: currentRecipe.ingredients,
      method: currentRecipe.method,
      favourite: currentRecipe.favourite
    })
    .then(onSuccess, onError)
}

function modify(recipe) {
  return axios.put(`http://localhost:9627/recipes/${recipe.id}`,{
      id: recipe.id,
      recipeName: recipe.recipeName,
      img: recipe.img,
      ingredients: recipe.ingredients,
      method: recipe.method,
      favourite: recipe.favourite
    })
    .then(onSuccess, onError)
}

function onSuccess(response) {
  return response
}

function onError(error) {
  console.log(error)
}
