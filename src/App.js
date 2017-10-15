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
    ]
  }

  render() {
    const {recipes} = this.state
    return (
      <div className="App">
        <Accordion>
          {recipes.map((recipe, index) => (
            <Panel header={recipe.recipeName} eventKey={index} key={index}>

            </Panel>
          ))}
        </Accordion>
      </div>
    );
  }
}

export default App;
