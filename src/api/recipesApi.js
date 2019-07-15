import axios from 'axios'

export function getRecipe() {
    return get()
}

function get() {
    return axios.get('http://localhost:9627/recipes')
        .then(onSuccess, onError)
}

function onSuccess(response) {
    return response
}

function onError(error) {
    console.log(error)
}
