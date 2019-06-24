import React, {Component} from 'react'
import './App.css'
import Button from 'react-bootstrap/lib/Button'
import Modal from 'react-bootstrap/lib/Modal'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import FormControl from 'react-bootstrap/lib/FormControl'
import uuidv4 from 'uuid/v4'
import axios from 'axios'

import RecipesList from './components/RecipesList'

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

              {currentRecipe && <Modal show={modalVisible} onHide={this.close}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Recipe</Modal.Title>
                  <Modal.Body>
                    <FormGroup controlId="formBasicText">
                      <ControlLabel>Recipe Name</ControlLabel>
                      <FormControl
                        type="text"
                        name="recipeName"
                        value={currentRecipe.recipeName}
                        placeholder="Enter Text"
                        onChange={this.onChange}>
                      </FormControl>
                    </FormGroup>
                    <FormGroup controlId="formControlTextarea">
                      <ControlLabel>Ingredients</ControlLabel>
                      <FormControl
                        componentClass="textarea"
                        name="ingredients"
                        value={currentRecipe.ingredients}
                        placeholder="Enter Ingredients (separate by commas)"
                        onChange={this.onChange}>
                      </FormControl>
                    </FormGroup>
                    <FormGroup controlId="formControlTextarea">
                      <ControlLabel>Method</ControlLabel>
                      <FormControl
                        componentClass="textarea"
                        name="method"
                        value={currentRecipe.method}
                        placeholder="Method"
                        onChange={this.onChange}>
                      </FormControl>
                    </FormGroup>
                    <FormGroup controlId="formControlTextarea">
                      <ControlLabel>Recipe Image URL</ControlLabel>
                      <FormControl
                        componentClass="textarea"
                        name="img"
                        value={currentRecipe.img}
                        placeholder="Enter images URL"
                        onChange={this.onChange}>
                      </FormControl>
                    </FormGroup>
                    {error && <p className="error">{error}</p>}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={this.close}>Close</Button>
                    <Button onClick={() => this.onSubmit(currentRecipeId)}>Save Recipe</Button>
                  </Modal.Footer>
                </Modal.Header>
              </Modal>
              }
            </div>
          )}
          <Button bsStyle="primary" onClick={() => this.open(uuidv4())}>Add Recipe</Button>
        </main>
      </div>
    )
  }
}

export default App
