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
    newRecipe: {recipeName: '', ingredients: []}
  }

  deleteRecipe(index) {
    let recipes = this.state.recipes.slice()
    recipes.splice(index, 1)
    this.setState({recipes})
  }

  updateNewRecipe(name, ingredients) {
     this.setState({newRecipe: {recipeName: name, ingredients: [ingredients]}})
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

  open = (state) => {
    this.setState({[state]: true})
  }

  close = () => {
    if (this.state.showAdd) {
      this.setState({showAdd: false})
    }
  }

  render() {
    const {recipes, newRecipe} = this.state
    return (
      <div className="App container">
        {recipes.length > 0 && (
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
                  <Button bsStyle="default">Edit Recipe</Button>
                </ButtonToolbar>
              </Panel>
            ))}
          </Accordion>
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
                <ControlLabel>Recipe Name</ControlLabel>
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
        <Button bsStyle="primary" onClick={(event)=>this.open('showAdd')}>Add Recipe</Button>
      </div>
    );
  }
}

export default App;
