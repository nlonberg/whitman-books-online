import React, { Component } from 'react';
import SearchBar from 'material-ui-search-bar';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changePrice, changePriceFail, changeCondition, changeConditionFail,
  changeSearchValue, changeSearchValueFail, changeListingPage, changeListingPageFail,
  changeListingLength, changeListingLengthFail, changeIds, changeIdsFail  } from '../redux/search/actions';



  class Search extends Component{

    handleSearch = (event) => {

      //first get request using searchValue to get book objects
      const searchString = this.props.books.searchValue.trim().toLowerCase().replace(/ /g,"_");
      console.log(searchString);
      var urlDest = 'https://whitmanbooksonline.com/booklist/' + searchString;
      var requestBooks = new XMLHttpRequest ();
      requestBooks.open('GET', urlDest);
      requestBooks.responseType = "json";
      requestBooks.send(urlDest);
      var bookObjs;
      requestBooks.onload = function() {
        bookObjs = requestBooks.response;
      }

      //parse book objects for a list of listing ids
      var listing_ids = "";
      var id = "";
      for (var i=0; i < bookObjs["books"].length; i++){
        for (var j=0; j < bookObjs["books"][i]["listings_ids"].length; j++){
          id = bookObjs["books"][i]["listings_ids"][j].toString();
          listing_ids = listing_ids + id +",";
        }
      }
      //remove last comma from listing_ids
      listing_ids = listing_ids.slice(-1);

      console.log(listing_ids);

      //second GET request using listing ids and a sort value to get listing objects
      urlDest = 'https://whitmanbooksonline.com/listings/' + listing_ids + "+" + this.props.listings.sort;
      var requestIds = new XMLHttpRequest ();
      requestIds.open('GET', urlDest);
      requestIds.responseType = "json";
      var listingObjs;
      requestIds.onload = function() {
        listingObjs = requestIds.response;
      }

      //parse listing objects for a list of google tokens
      var google_tokens = "";
      for (var i=0; i<listingObjs["google_tokens"].length; i++){
        google_tokens = google_tokens + listingObjs["google_tokens"][i] +",";
      }
      google_tokens = google_tokens.slice(-1);
      console.log(google_tokens);

      //third GET request using google tokens to get user objects
      urlDest = "https://whitmanbooksonline.com/userlist/"+google_tokens;
      var requestUsers = new XMLHttpRequest ();
      requestUsers.open('GET', urlDest);
      requestUsers.responseType = "json";
      var userObjs;
      requestUsers.onload = function() {
        userObjs = requestUsers.response;
      }

      //Alright, now I have bookObjs, listingObjs, and userObjs. What do I do with them?
    }
  }

  const mapStateToProps = (state) => {
    const { books, listings } = state.searchReducer;
    return { books, listings };
  };

  const mapDispatchToProps = dispatch =>
  bindActionCreators({ changePrice, changePriceFail, changeCondition, changeConditionFail,
    changeSearchValue, changeSearchValueFail, changeListingPage, changeListingPageFail,
    changeListingLength, changeListingLengthFail, changeIds, changeIdsFail  }, dispatch);

    export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));
