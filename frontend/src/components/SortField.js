import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeSortValue, changeSortValueFail } from '../redux/sortField/actions';

  class SortField extends Component{

    handleChange = (event, index, value) => {
      this.props.changeSortValue(value);
      console.log(this.state.sortValue);
    }

    render(){

      return(
        <div>
          <SelectField
            floatingLabelText="Sort By"
            value={this.props.sortValue}
            onChange={this.handleChange}
            >
            <MenuItem value={1} primaryText="Price: Low to High" />
            <MenuItem value={2} primaryText="Price: High to Low" />
            <MenuItem value={3} primaryText="Condition: New to Poor" />
            <MenuItem value={4} primaryText="Condition: Poor to New" />
          </SelectField>
        </div>
      );
    }
  }

  const mapStateToProps = (state) => {
    const sortValue = state.sortfieldReducer;
    return sortValue;
  };

  const mapDispatchToProps = dispatch =>
  bindActionCreators({ changeSortValue, changeSortValueFail }, dispatch);

    export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SortField));
