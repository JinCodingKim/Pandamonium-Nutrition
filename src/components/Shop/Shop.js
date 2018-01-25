import React, { Component } from "react";
//React-router-dom
import { NavLink } from "react-router-dom";
//Material-ui
import RaisedButton from "material-ui/RaisedButton";
import ActionSearch from "material-ui/svg-icons/action/search";
import ContentSort from "material-ui/svg-icons/content/sort";
import ContentClear from "material-ui/svg-icons/content/clear";
import IconButton from "material-ui/IconButton";
import { Card, CardActions, CardText } from "material-ui/Card";
//Redux
import { connect } from "react-redux";
import {
  getProducts,
  getSortedProducts,
  searchProducts
} from "../../ducks/product";
//Local
import "./Shop.css";

class Shop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sort: "",
      search: ""
    };

    this.handleSort = this.handleSort.bind(this);
    this.confirmSort = this.confirmSort.bind(this);
    this.clearSort = this.clearSort.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.confirmSearch = this.confirmSearch.bind(this);
  }

  componentDidMount() {
    const { getProducts } = this.props;
    getProducts();
  }

  handleSort(val) {
    this.setState({
      sort: val
    });
  }

  confirmSort() {
    const { sort } = this.state;
    const { getSortedProducts } = this.props;
    getSortedProducts(sort);
  }

  clearSort() {
    const { getProducts } = this.props;
    getProducts();
  }

  handleSearch(val) {
    this.setState({
      search: val
    });
  }

  confirmSearch(event) {
    const { search } = this.state;
    const { searchProducts } = this.props;
    if (event.keyCode == 13) {
      searchProducts(search);
    }
  }

  render() {
    const { product = { product: [] }, loading } = this.props;
    const { search } = this.state;

    let productsList = product.map(product => {
      return (
        <NavLink
          className="product-wrapper"
          to={`/product/${product.product_type}`}
          key={product.product_id}
        >
          <div className="product-img-container">
            <img className="product-img" src={product.product_img} />
          </div>
          <p className="product-name">{product.product_name}</p>
          <p className="product-price">${product.product_price}</p>
        </NavLink>
      );
    });
    return (
      <div className="products-main-container">
        {!product ? (
          <div>
            <h1>Loading Content...</h1>
          </div>
        ) : (
          <div className="products-list">
            <div className="search-container">
              <label className="search-title">Search</label>
              <input
                className="search-input"
                type="text"
                onChange={e => this.handleSearch(e.target.value)}
                value={search}
                onKeyDown={this.confirmSearch}
              />
            </div>

            <div className="sort-container">
              <label className="sort-title">Sort</label>
              <select
                className="sort-select"
                onChange={e => this.handleSort(e.target.value)}
                onClick={this.confirmSort}
              >
                <option value="az"> Alphabetically: A-Z </option>
                <option value="za"> Alphabetically: Z-A </option>
                <option value="ascend"> Price: Low-to-High </option>
                <option value="descend"> Price: High-to-Low </option>
              </select>
              <RaisedButton
                label="Clear"
                secondary={true}
                labelPosition="after"
                style={{ height: 40, width: 105 }}
                labelStyle={{ fontSize: 12, fontWeight: "bold" }}
                icon={<ContentClear />}
                onClick={this.clearSort}
              />
            </div>
            {productsList}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.product.loading,
    product: state.product.product
  };
};

export default connect(mapStateToProps, {
  getProducts,
  getSortedProducts,
  searchProducts
})(Shop);
