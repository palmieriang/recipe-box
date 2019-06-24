import React, {Component} from 'react'
import Button from 'react-bootstrap/lib/Button'
import Modal from 'react-bootstrap/lib/Modal'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import FormControl from 'react-bootstrap/lib/FormControl'

class RecipeForm extends Component {
  render() {
    const {currentRecipeId, modalVisible, currentRecipe, error, onChange, close, onSubmit} = this.props

    return (
      <div>
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
                  onChange={onChange}>
                </FormControl>
              </FormGroup>
              <FormGroup controlId="formControlTextarea">
                <ControlLabel>Ingredients</ControlLabel>
                <FormControl
                  componentClass="textarea"
                  name="ingredients"
                  value={currentRecipe.ingredients}
                  placeholder="Enter Ingredients (separate by commas)"
                  onChange={onChange}>
                </FormControl>
              </FormGroup>
              <FormGroup controlId="formControlTextarea">
                <ControlLabel>Method</ControlLabel>
                <FormControl
                  componentClass="textarea"
                  name="method"
                  value={currentRecipe.method}
                  placeholder="Method"
                  onChange={onChange}>
                </FormControl>
              </FormGroup>
              <FormGroup controlId="formControlTextarea">
                <ControlLabel>Recipe Image URL</ControlLabel>
                <FormControl
                  componentClass="textarea"
                  name="img"
                  value={currentRecipe.img}
                  placeholder="Enter images URL"
                  onChange={onChange}>
                </FormControl>
              </FormGroup>
              {error && <p className="error">{error}</p>}
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={close}>Close</Button>
              <Button onClick={() => onSubmit(currentRecipeId)}>Save Recipe</Button>
            </Modal.Footer>
          </Modal.Header>
        </Modal>
        }
      </div>
    )
  }
}

export default RecipeForm