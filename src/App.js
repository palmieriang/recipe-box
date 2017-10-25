import React, { Component } from 'react'
import './App.css'
import Accordion from 'react-bootstrap/lib/Accordion'
import Panel from 'react-bootstrap/lib/Panel'
import Button from 'react-bootstrap/lib/Button'
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar'
import Modal from 'react-bootstrap/lib/Modal'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import FormControl from 'react-bootstrap/lib/FormControl'

class App extends Component {

  state = {
    recipes: [
      {recipeName: 'Name1', ingredients: ['ingredients1', 'ingredients2', 'ingredients3']},
      {recipeName: 'Name2', ingredients: ['ingredients1', 'ingredients2', 'ingredients3']},
      {recipeName: 'Name3', ingredients: ['ingredients1', 'ingredients2', 'ingredients3']}
    ],
    showAdd: false,
    showEdit: false,
    currentIndex: 0,
    newRecipe: {recipeName: '', ingredients: []}
  }

  componentDidMount() {
    let recipes = JSON.parse(localStorage.getItem('recipes')) || this.state.recipes
    this.setState({recipes})
  }

  updateRecipeName(name, index) {
    let recipes = this.state.recipes.slice()
    recipes[index] = {recipeName: name, ingredients: recipes[index].ingredients}
    localStorage.setItem('recipes', JSON.stringify(recipes))
    this.setState({recipes})
  }

  updateIngredients(ingredients, index) {
    let recipes = this.state.recipes.slice()
    recipes[index] = {recipeName: recipes[index].recipeName, ingredients: ingredients}
    this.setState({recipes})
  }

  deleteRecipe(index) {
    let recipes = this.state.recipes.slice()
    recipes.splice(index, 1)
    this.setState({recipes})
  }

  updateNewRecipe(name, ingredients) {
     this.setState({newRecipe: {recipeName: name, ingredients: ingredients}})
  }

  saveNewRecipe() {
    let recipes = this.state.recipes.slice()
    recipes.push({recipeName: this.state.newRecipe.recipeName, ingredients: this.state.newRecipe.ingredients})
    this.setState({
      recipes: recipes,
      newRecipe: {recipeName: '', ingredients: []}
    })
    this.close()
  }

  open = (state, index) => {
    this.setState({
      [state]: true,
      currentIndex: index
    })
  }

  close = () => {
    if (this.state.showAdd) {
      this.setState({showAdd: false})
    }
    if (this.state.showEdit) {
      this.setState({showEdit: false})
    }
  }

  render() {
    const {recipes, newRecipe, currentIndex} = this.state
    console.log(newRecipe)
    return (
      <div className="App container">
        {recipes.length > 0 && (
          <div>
            <Accordion>
              {recipes.map((recipe, index) => (
                <Panel header={recipe.recipeName} eventKey={index} key={index}>
                  <ol>
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ol>
                  <ButtonToolbar>
                    <Button bsStyle="danger" onClick={(event)=>this.deleteRecipe(index)}>Delete Recipe</Button>
                    <Button bsStyle="default" onClick={(event)=>this.open("showEdit", index)}>Edit Recipe</Button>
                  </ButtonToolbar>
                </Panel>
              ))}
            </Accordion>
            <Modal show={this.state.showEdit} onHide={this.close}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Recipe</Modal.Title>
                <Modal.Body>
                  <FormGroup controlId="formBasicText">
                    <ControlLabel>Recipe Name</ControlLabel>
                    <FormControl
                      type="text"
                      value={recipes[currentIndex].recipeName}
                      placeholder="Enter Text"
                      onChange={(event)=>this.updateRecipeName(event.target.value.split(","), currentIndex)}>
                    </FormControl>
                  </FormGroup>
                  <FormGroup controlId="formControlTextarea">
                    <ControlLabel>Ingredients</ControlLabel>
                    <FormControl
                      componentClass="textarea"
                      value={recipes[currentIndex].ingredients}
                      placeholder="Enter Ingredients (separate by commas)"
                      onChange={(event)=>this.updateIngredients(event.target.value.split(","), currentIndex)}>
                    </FormControl>
                  </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={this.close}>Close</Button>
                </Modal.Footer>
              </Modal.Header>
            </Modal>
          </div>
        )}
        <Modal show={this.state.showAdd} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Add Recipe</Modal.Title>
            <Modal.Body>
              <FormGroup controlId="formBasicText">
                <ControlLabel>Recipe Name</ControlLabel>
                <FormControl
                  type="text"
                  value={newRecipe.recipeName}
                  placeholder="Enter Recipe Name"
                  onChange={(event)=>this.updateNewRecipe(event.target.value, newRecipe.ingredients )}>
                </FormControl>
              </FormGroup>
              <FormGroup controlId="formControlTextarea">
                <ControlLabel>Ingredients</ControlLabel>
                <FormControl
                  type="textarea"
                  value={newRecipe.ingredients}
                  placeholder="Enter Ingredients (separate by commas)"
                  onChange={(event)=>this.updateNewRecipe(newRecipe.recipeName, event.target.value.split(","))}>
                </FormControl>
              </FormGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={(event)=>this.saveNewRecipe()}>Save New Recipe</Button>
            </Modal.Footer>
          </Modal.Header>
        </Modal>
        <Button bsStyle="primary" onClick={(event)=>this.open('showAdd', currentIndex)}>Add Recipe</Button>
      </div>
    );
  }
}

export default App;
