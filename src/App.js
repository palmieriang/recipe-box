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
import uuidv4 from 'uuid/v4'

class App extends Component {
	constructor() {
		super();
		this.state = {
			recipes: [
				{id: uuidv4(), recipeName: 'Carbonara', img: 'https://images.unsplash.com/photo-1499937089231-219080cdf888?auto=format&fit=crop&w=1600&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D', ingredients: ['3 large free-range egg yolks', '40 g Parmesan cheese', '150 g pancetta', '1 clove of garlic']},
				{id: uuidv4(), recipeName: 'Lemon & Lobster Risotto', img: 'https://images.unsplash.com/photo-1461009683693-342af2f2d6ce?auto=format&fit=crop&w=4031&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D', ingredients: ['2 lobster tails', '1 shallot finely chopped', '2 lemons', '4 cups of chicken or vegetable stock']},
				{id: uuidv4(), recipeName: 'Tagliatelle Mushroom', img: '', ingredients: ['10 chestnut mushrooms, finely sliced', '200g fresh spinach', '200ml crème fraîche']}
			],
			showAdd: false,
			showEdit: false,
			currentIndex: 0,
			newRecipe: {recipeName: '', ingredients: []}
		}
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

	updateRecipeImg(image, index) {
		let recipes = this.state.recipes.slice()
		recipes[index] = {recipeName: recipes[index].recipeName, img: image, ingredients: recipes[index].ingredients}
		this.setState({recipes})
	}

	// updateRecipe(updatedRecipe) {
	// 	const recipes = this.state.recipes.map(recipe => {
	// 		if (recipe.id === updatedRecipe.id) {
	// 			return updatedRecipe
	// 		}
	// 		return recipe
	// 	})
	// 	this.setState({recipes})
	// }

	deleteRecipe(index) {
		let recipes = this.state.recipes.slice()
		recipes.splice(index, 1)
		this.setState({recipes})
	}

	updateNewRecipe(name, image, ingredients) {
		 this.setState({newRecipe: {recipeName: name, img: image, ingredients: ingredients}})
	}

	saveNewRecipe() {
		let recipes = this.state.recipes.slice()
		recipes.push({id: uuidv4(), recipeName: this.state.newRecipe.recipeName, img: this.state.newRecipe.img, ingredients: this.state.newRecipe.ingredients})
		this.setState({
			recipes: recipes,
			newRecipe: {recipeName: '', ingredients: []}
		})
		this.close()
	}

	open = (state, index) => {
		console.log(index)
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
			<div className="App">
				<div className="header">
					<div className="header-text">
						<h1>Recipe Box</h1>
					</div>
				</div>
				<div className="container">
					{recipes.length > 0 && (
						<div>
							<Accordion>
								{recipes.map((recipe, index) => (
									<Panel className="recipe-box" header={
										<div className="recipe-header">
											{recipe.img && <div className="recipe-image">
												<img src={recipe.img} alt={recipe.recipeName} width="100%"/>
											</div>}
											<h2 className="recipe-name">{recipe.recipeName}</h2>
										</div>
									} eventKey={index} key={index}>
										<ol>
											{recipe.ingredients.map((ingredient, index) => (
												<li key={index}>{ingredient}</li>
											))}
										</ol>
										<ButtonToolbar className="recipe-btn">
											<Button bsStyle="default" onClick={()=>this.open("showEdit", index)}>Edit Recipe</Button>
											<Button bsStyle="danger" onClick={()=>this.deleteRecipe(index)}>Delete Recipe</Button>
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
										<FormGroup controlId="formControlTextarea">
											<ControlLabel>Recipe Image URL</ControlLabel>
											<FormControl
												componentClass="textarea"
												value={recipes[currentIndex].img}
												placeholder="Enter images URL"
												onChange={(event)=>this.updateRecipeImg(event.target.value.split(","), currentIndex)}>
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
										onChange={(event)=>this.updateNewRecipe(event.target.value, newRecipe.img, newRecipe.ingredients )}>
									</FormControl>
								</FormGroup>
								<FormGroup controlId="formControlTextarea">
									<ControlLabel>Ingredients</ControlLabel>
									<FormControl
										type="textarea"
										value={newRecipe.ingredients}
										placeholder="Enter Ingredients (separate by commas)"
										onChange={(event)=>this.updateNewRecipe(newRecipe.recipeName, newRecipe.img, event.target.value.split(","))}>
									</FormControl>
								</FormGroup>
								<FormGroup controlId="formControlTextarea">
									<ControlLabel>Recipe Image URL</ControlLabel>
									<FormControl
										type="textarea"
										value={newRecipe.img}
										placeholder="Enter images URL"
										onChange={(event)=>this.updateNewRecipe(newRecipe.recipeName, event.target.value.split(","), newRecipe.ingredients)}>
									</FormControl>
								</FormGroup>
							</Modal.Body>
							<Modal.Footer>
								<Button onClick={()=>this.saveNewRecipe()}>Save New Recipe</Button>
							</Modal.Footer>
						</Modal.Header>
					</Modal>
					<Button bsStyle="primary" onClick={()=>this.open('showAdd', currentIndex)}>Add Recipe</Button>
				</div>
			</div>
		)
	}
}

export default App
