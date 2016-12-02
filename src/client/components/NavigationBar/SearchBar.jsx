import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Calendar from './Calendar';

@observer
class SearchBar extends Component {

    static propTypes = {
        term: React.PropTypes.string,
        close: React.PropTypes.func,
        update: React.PropTypes.func,
    }

    constructor() {
        super();

        this._onSearchChange = this.onSearchChange.bind(this);
    }


    onSearchChange(evt) {

        const { update } = this.props;

        update(evt.target.value);
    }

    render() {

        const { term, close, update } = this.props;

        let searchTerm = term || '';

        return (
            <div className='searchBar'>
                <div onClick={close} className='searchCancel'>Cancel</div>
                <form>
                    <input autoFocus onChange={this._onSearchChange} value={searchTerm} type='text' placeholder='Search by Event or Room' />
                    <span className='icon fa fa-search'></span>
                </form>
            </div>
        );
    }

};

export default SearchBar;