import React, {Component} from 'react'
import './App.css'
import Button from 'react-bootstrap/lib/Button'
import uuidv4 from 'uuid/v4'
import {getRecipe, addRecipe, modifyRecipe, removeRecipe} from './api/recipesApi'

import Header from './components/Header'
import RecipesList from './components/RecipesList'
import RecipeForm from './components/RecipeForm'

class App extends Component {
  constructor () {
    super();
    this.state = {
      recipes: [],
      currentRecipe: {recipeName: '', img: '', ingredients: '', method: '', favourite: false},
      currentRecipeId: null,
      modalVisible: false,
      error: ''
    }
  }

  componentDidMount () {
    this.callApi()
  }

  onChange = event => {
    const {currentRecipe} = this.state

    this.setState({
      currentRecipe: {
        ...currentRecipe,
        [event.target.name]: event.target.value
      }
    })
  }

  callApi () {
    // callApi using fetch
    // fetch('http://localhost:9627/recipes')
    //   .then((response) => {
    //     if (response.status !== 200) {
    //       console.log('Looks like there was a problem. Status Code: ' + response.status);
    //       return;
    //     }
    //     response.json().then((data) => {
    //       this.setState({recipes: data});
    //     });
    //   })
    //   .catch((error) => {
    //     console.log('Fetch Error', error);
    //   })

    getRecipe()
      .then((response) => {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' + response.status);
          return;
        }
        this.setState({ recipes: response.data });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  newRecipe (currentRecipe) {
    addRecipe(currentRecipe)
      .then(response => {
          console.log(response.data);
      }).catch(error => {
          console.log(error);
      })
  }

  updateRecipe (recipe) {
    modifyRecipe(recipe)
      .then((response) => {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' + response.status);
          return;
        }
        this.setState({ recipes: response.data });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteRecipe (id) {
    removeRecipe(id)
  }

  validate (recipe) {
    let valid = true
    this.setState({
      error: ''
    })
    if (recipe.ingredients.length < 1) {
      valid = false
      this.setState({
        error: 'Please enter ingredients'
      })
    }
    if (recipe.recipeName.length < 2) {
      valid = false
      this.setState({
        error: 'Please enter a valid name'
      })
    }
    return valid
  }

  onSubmit = id => {
    const {currentRecipe, recipes} = this.state
    const existingRecipe = recipes.find(recipe => recipe.id === id)

    if (existingRecipe) {
      this.updateRecipe(currentRecipe)
      this.resetModal()
    } else {
      if(this.validate(currentRecipe)) {
        this.newRecipe(currentRecipe)
        this.resetModal()
      }
    }
  }

  open = id => {
    const {recipes} = this.state
    const existingRecipe = recipes.find(recipe => recipe.id === id)

    if (!existingRecipe) {
      return this.setState({
        modalVisible: true,
        currentRecipeId: id,
        currentRecipe: {id: id, recipeName: '', img: '', ingredients: '', method: '', favourite: false},
        error: ''
      })
    }

    this.setState({
      modalVisible: true,
      currentRecipeId: id,
      currentRecipe: existingRecipe,
      error: ''
    })
  }

  close = () => {
    this.setState({modalVisible: false, currentRecipeId: null})
  }

  resetModal = () => {
    this.setState({
      currentRecipe: {recipeName: '', img: '', ingredients: '', method: ''}
    })
    this.close()
  }

  changeFavourite = id => {
    const {recipes} = this.state
    const recipe = recipes.find(recipe => recipe.id === id)
    recipe.favourite = !recipe.favourite
    this.updateRecipe(recipe)
  }

  render () {
    const {recipes, currentRecipeId, modalVisible, currentRecipe, error} = this.state

    return (
      <div>
        <Header />

        <main className="container">
          {recipes.length > 0 ? (
            <div>
              <RecipesList
                recipes={recipes}
                open={this.open}
                deleteRecipe={this.deleteRecipe}
                changeFavourite={this.changeFavourite} />

              <RecipeForm
                currentRecipe={currentRecipe}
                currentRecipeId={currentRecipeId}
                modalVisible={modalVisible}
                error={error}
                onChange={this.onChange}
                close={this.close}
                onSubmit={this.onSubmit} />

            </div>
          ) : (
            <p>In order to get the recipes, please make sure the server is running: <code>npm run backend</code></p>
          )}
          <Button bsStyle="primary" onClick={() => this.open(uuidv4())}>Add Recipe</Button>
        </main>
      </div>
    )
  }
}

export default App
