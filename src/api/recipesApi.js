import axios from 'axios'
import getBaseUrl from './baseUrl'

const baseUrl = getBaseUrl();

export function getRecipe() {
  return get('recipes')
}

export function addRecipe(recipe) {
  return add(recipe, 'recipes')
}

export function modifyRecipe(currentRecipe) {
  return modify(currentRecipe, 'recipes')
}

export function removeRecipe(recipe) {
  return remove(recipe, 'recipes')
}

export function searchRecipe(query) {
  return search(query, 'recipes')
}

export function sortRecipes(order) {
  return sort(order, 'recipes')
}

function get(url) {
  return axios.get(baseUrl + url)
    .then(onSuccess, onError)
}

function add(currentRecipe, url) {
  return axios.post(baseUrl + url, {
      id: currentRecipe.id,
      recipeName: currentRecipe.recipeName,
      img: currentRecipe.img,
      ingredients: currentRecipe.ingredients,
      method: currentRecipe.method,
      favourite: currentRecipe.favourite
    })
    .then(onSuccess, onError)
}

function modify(recipe, url) {
  return axios.put(baseUrl + url + `/${recipe.id}`,{
      id: recipe.id,
      recipeName: recipe.recipeName,
      img: recipe.img,
      ingredients: recipe.ingredients,
      method: recipe.method,
      favourite: recipe.favourite
    })
    .then(onSuccess, onError)
}

function remove(id, url) {
  return axios.delete(baseUrl + url + `/${id}`)
    .then(onSuccess, onError)
}

function search(query, url) {
  return axios.get(baseUrl + url + `?q=${query}`)
    .then(onSuccess, onError)
}

function sort(order, url) {
  return axios.get(baseUrl + url + `?_sort=recipeName&_order=${order}`)
  .then(onSuccess, onError)
}

function onSuccess(response) {
  return response
}

function onError(error) {
  console.log(error)
}
