import React, {Component} from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Button from 'react-bootstrap/Button'

import heartempty from '../images/heart-empty2.png'
import heartfull from '../images/heart-full2.png'

class RecipesList extends Component {
  render() {
    const {recipes, changeFavourite, open, deleteRecipe} = this.props

    return (
      <Accordion>
        {recipes.map((recipe, index) => (
          <Card className="recipe-box" key={recipe.id}>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey={index} className="recipe-header">
                {recipe.img && <div className="recipe-image">
                  <img src={recipe.img} alt={recipe.recipeName} width="100%"/>
                </div>}
                <h2 className="recipe-name">{recipe.recipeName} <img className="icon-favourite" src={recipe.favourite ? heartfull : heartempty} alt='heart' onClick={() => changeFavourite(recipe.id)} /></h2>
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={index}>
              <Card.Body>
                <div className="recipe-body">
                  <div className="recipe-ingredients">
                    <h3>Ingredients</h3>
                    <ul>
                      {recipe.ingredients.split(',').map((ingredient, index) => (
                          <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="recipe-method">
                    <h3>Method</h3>
                    <p>{recipe.method}</p>
                  </div>
                </div>
                <ButtonToolbar className="recipe-btn">
                  <Button variant="info" onClick={() => open(recipe.id)}>Edit Recipe</Button>
                  <Button variant="danger" onClick={() => deleteRecipe(recipe.id)}>Delete Recipe</Button>
                </ButtonToolbar>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          ))}
      </Accordion>
    )
  }
}

export default RecipesList
