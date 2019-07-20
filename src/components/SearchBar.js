import React, {Component} from 'react'

class SearchBar extends Component {
    constructor () {
        super();
        this.state = {
            focused: false
        }
    }

    onFocus = () => {
        this.setState({
            focused: true
        })
    }

    onBlur = (event) => {
        const inputContent = event.target.value

        if (inputContent.length <= 0) {
            this.setState({
                focused: false
            })
        }
    }

    render() {
        const {searchBar, searchValue, onChange} = this.props

        return (
            <form className={'search-bar' + (this.state.focused ? ' focused' : '') } onSubmit={searchBar}>
                <label htmlFor="search-recipe">Search recipe</label>
                <input id="search-recipe" type="text" placeholder="" value={searchValue} onFocus={this.onFocus} onBlur={(event) => this.onBlur(event)} onChange={onChange} />
            </form>
        )
    }
}

export default SearchBar
