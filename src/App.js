import React, {Component} from 'react'
import './App.css'
import Button from 'react-bootstrap/lib/Button'
import uuidv4 from 'uuid/v4'
import axios from 'axios'

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
    this.deleteRecipe = this.deleteRecipe.bind(this);
  }

  componentDidMount () {
    let recipes = JSON.parse(localStorage.getItem('recipes')) || this.state.recipes
    this.setState({recipes})
    this.callApi()
  }

  callApi () {
    // callApi is using json file from public folder

    // callApi using fetch
    // fetch('http://localhost:9627/recipes')
    // .then(
    //   (response) => {
    //     if (response.status !== 200) {
    //       console.log('Looks like there was a problem. Status Code: ' +
    //         response.status);
    //       return;
    //     }
  
    //     response.json().then((data) => {
    //       this.setState({recipes: data});
    //   });
    //   }
    // )
    // .catch(function(err) {
    //   console.log('Fetch Error', err);
    // });

    // callApi using axios
    axios.get('http://localhost:9627/recipes')
      .then((response) => {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }
        this.setState({ recipes: response.data });
      })
      .catch(function (error) {
        console.log(error);
      })
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

  deleteRecipe (index) {
    const recipes = this.state.recipes.slice()
    recipes.splice(index, 1)
    this.setState({recipes})
    localStorage.setItem('recipes', JSON.stringify(recipes))
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
      const recipes = this.state.recipes.map(recipe => {
        if(recipe.id === currentRecipe.id) {
          return currentRecipe
        }
        return recipe
      })
      this.setState({recipes})
      this.resetModal()
    } else {
      if(this.validate(currentRecipe)) {
        this.setState({
          recipes: [
            ...recipes,
            currentRecipe
          ]
        })
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

  changeFavourite = index => {
    let recipes = this.state.recipes.slice()
    recipes[index].favourite = !recipes[index].favourite
    this.setState({recipes})
    localStorage.setItem('recipes', JSON.stringify(recipes))
  }

  render () {
    const {recipes, currentRecipeId, modalVisible, currentRecipe, error} = this.state

    return (
      <div>
        <header className="header">
          <div className="header-text">
            <h1>Recipe Box</h1>
          </div>
        </header>
        <main className="container">
          {recipes.length > 0 && (
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
          )}
          <Button bsStyle="primary" onClick={() => this.open(uuidv4())}>Add Recipe</Button>
        </main>
      </div>
    )
  }
}

export default App
