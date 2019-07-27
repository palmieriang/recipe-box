import React, {Component} from 'react'
import Button from 'react-bootstrap/lib/Button'

class OrderRecipes extends Component {
    constructor () {
        super();
        this.state = {
            order: 'asc'
        }
    }

    changeOrder = () => {
        const {order} = this.state
        const {orderRecipes} = this.props
        orderRecipes(order)
        if (order === 'asc') {
            this.setState({
                order: 'desc'
            })
        } else {
            this.setState({
                order: 'asc'
            })
        }
    }

    render() {
        return (
            <div className="container order-recipes">
                <Button onClick={this.changeOrder} className={this.state.order}>
                    <span className="visually-hidden">Order recipes</span>
                </Button>
            </div>
        )
    }
}

export default OrderRecipes
