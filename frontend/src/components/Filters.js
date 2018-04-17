import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import validator from 'validator';
import { changePrice, changePriceFail, changeCondition, changeConditionFail } from '../redux/search/actions';
import './Filters.css';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';


const styles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: 16,
  },
};

  class Filters extends Component{

    handlePriceChange = (event) => {
	    const price = event.target.value;
	    if (validator.isCurrency(price)) {
	      this.props.changePrice(price);
	    } else {
	      this.props.changePriceFail(price);
	    }
  	}

  	handleConditionChange = (event, index, value) => {
  		this.props.changeCondition(value);
  	}

  	handleSearch = (event) => {
  		/*
		fetch('https://localhost:3000/', {
		      method: 'GET',
		    }).then((response) => {
		      responseJson = response.json();
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

  	render() {
  		return (
  		  <Card >
  		    <CardHeader className="Advanced-Search"
  		  		title="Advanced Search"
  		  		actAsExpander
                showExpandableButton
            />
  		  	<CardText expandable>
  		  	<div classname = "Condition-Filter">
		  		<SelectField
	              value={this.props.listings.condition}
	              onChange={this.handleConditionChange}
	            >
	              <MenuItem value="" primaryText="All Conditions" />
	              <MenuItem value="poor" primaryText="Poor" />
	              <MenuItem value="used" primaryText="Used" />
	              <MenuItem value="like_new" primaryText="Like new" />
	              <MenuItem value="new" primaryText="New" />
	            </SelectField>
        	</div>

            <div classname = "Price-Filter">
            	$
	            <TextField
	              floatingLabelText="Input maximum price:"
	              onChange={this.handlePriceChange}
	              value={this.props.listings.price}
	              errorText={this.props.listings.priceError}
	              errorStyle={{
	                float: 'left',
	              }}
	            />
	        <FlatButton
              primary
              label="SEARCH"
              onClick = {this.handleSearch}
            />
	        </div>
	    	</CardText>
          </Card>
  		);
  	}
  }

  const mapStateToProps = (state) => {
    const listings = state.searchReducer;
    return listings;
  };

  const mapDispatchToProps = dispatch =>
  bindActionCreators({ changePrice, changePriceFail, changeCondition, changeConditionFail }, dispatch);

    export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Filters));