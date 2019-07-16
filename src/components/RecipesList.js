import React, {Component} from 'react'
import Accordion from 'react-bootstrap/lib/Accordion'
import Panel from 'react-bootstrap/lib/Panel'
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar'
import Button from 'react-bootstrap/lib/Button'

import heartempty from '../images/heart-empty2.png'
import heartfull from '../images/heart-full2.png'

class RecipesList extends Component {
  render() {
    const {recipes, changeFavourite, open, deleteRecipe} = this.props

    return (
      <Accordion>
        {recipes.map((recipe, index) => (
          <Panel className="recipe-box" header={
            <div className="recipe-header">
            {recipe.img && <div className="recipe-image">
                <img src={recipe.img} alt={recipe.recipeName} width="100%"/>
            </div>}
            <h2 className="recipe-name">{recipe.recipeName} <img className="icon-favourite" src={recipe.favourite ? heartfull : heartempty} alt='heart' onClick={() => changeFavourite(index)} /></h2>
            </div>
        } eventKey={index} key={index}>
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
              <Button bsStyle="info" onClick={() => open(recipe.id)}>Edit Recipe</Button>
              <Button bsStyle="danger" onClick={() => deleteRecipe(recipe.id)}>Delete Recipe</Button>
            </ButtonToolbar>
          </Panel>
          ))}
      </Accordion>
    )
  }
}

export default RecipesList
