import React, { Component } from 'react';
import Page from './Page';
import BookFeed from './BookFeed';
import SearchBar from 'material-ui-search-bar';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class Exchange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
    };
  }

  render() {
    return (
      <Page>
        <h1>Exchange</h1>

        <SearchBar
          value={this.state.value}
          onChange={(newValue) => this.setState({ searchValue: newValue })}
          onRequestSearch={() => console.log(this.state.searchValue)}
          style={{
            margin: '0 auto',
            maxWidth: 800
          }}
        />

        <div>
          <SelectField
            floatingLabelText="Sort By"
            value={this.state.value}
            onChange={(value) => this.setState({value})}
            >
            <MenuItem value={1} primaryText="Price: Low to High" />
            <MenuItem value={2} primaryText="Price: High to Low" />
            <MenuItem value={3} primaryText="Condition: New to Poor" />
            <MenuItem value={4} primaryText="Condition: Poor to New" />
          </SelectField>
        </div>

        <BookFeed query={{}} />
      </Page>
    );
  }
}

export default Exchange;
