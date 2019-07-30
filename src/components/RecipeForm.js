import React, {Component} from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import FormGroup from 'react-bootstrap/FormGroup'
import FormLabel from 'react-bootstrap/FormLabel'
import FormControl from 'react-bootstrap/FormControl'

class RecipeForm extends Component {
  render() {
    const {currentRecipeId, modalVisible, currentRecipe, error, onChange, close, onSubmit} = this.props

    return (
      <div>
        {currentRecipe && <Modal show={modalVisible} onHide={close}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Recipe</Modal.Title>
            <Modal.Body>
              <FormGroup controlId="formBasicText">
                <FormLabel>Recipe Name</FormLabel>
                <FormControl
                  type="text"
                  name="recipeName"
                  value={currentRecipe.recipeName}
                  placeholder="Enter Text"
                  onChange={onChange}>
                </FormControl>
              </FormGroup>
              <FormGroup controlId="formControlTextarea">
                <FormLabel>Ingredients</FormLabel>
                <FormControl
                  as="textarea"
                  name="ingredients"
                  value={currentRecipe.ingredients}
                  placeholder="Enter Ingredients (separate by commas)"
                  onChange={onChange}>
                </FormControl>
              </FormGroup>
              <FormGroup controlId="formControlTextarea">
                <FormLabel>Method</FormLabel>
                <FormControl
                  as="textarea"
                  name="method"
                  value={currentRecipe.method}
                  placeholder="Method"
                  onChange={onChange}>
                </FormControl>
              </FormGroup>
              <FormGroup controlId="formControlTextarea">
                <FormLabel>Recipe Image URL</FormLabel>
                <FormControl
                  as="textarea"
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