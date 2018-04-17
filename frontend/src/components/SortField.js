import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeSort, changeSortFail } from '../redux/search/actions';

  class SortField extends Component{

    handleChange = (event, index, value) => {
      if (value != this.props.listings.sort) {
        this.props.changeSort(value);
        /*
        fetch('https://localhost:3000/', {
          method: 'GET',
        }).then((response) => {
          const responseJson = response.json();
          responseJson = responseJson + "+"+this.props.listings.sort
          +"+"+this.props.listings.price+"+"+this.props.listings.condition;
          return responseJson;
        }).then((responseJson) => {
          this.setState({ responseJson });
        }).catch((err) => {
          console.log(err);
      });
    */
        console.log("131,343,124,122"+ "+"+this.props.listings.sort
    +"+"+this.props.listings.price+"+"+this.props.listings.condition);
      }
      else {
        this.props.changeSortFail(value);
      }
    }

    handleSearch = (event) =>{
      
    }

    render(){

      return(
        <div>
          <SelectField
            floatingLabelText="Sort By"
            value={this.props.listings.sort}
            onChange={this.handleChange}
            >
            <MenuItem value={"price"} primaryText="Price"/>
            <MenuItem value={"condition"} primaryText="Condition" />
          </SelectField>
        </div>
      );
    }
  }

  const mapStateToProps = (state) => {
    const listings = state.searchReducer;
    return listings;
  };

  const mapDispatchToProps = dispatch =>
  bindActionCreators({ changeSort, changeSortFail }, dispatch);

    export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SortField));
