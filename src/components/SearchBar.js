import React, {Component} from 'react'

class SearchBar extends Component {
    render() {
        const {searchBar, searchValue, onChange} = this.props

        return (
            <form className="search-bar" onSubmit={searchBar}>
                <label htmlFor="search-recipe">Search recipe</label>
                <input id="search-recipe" type="text" placeholder="Search" value={searchValue} onChange={onChange} />
            </form>
        )
    }
}

export default SearchBar
