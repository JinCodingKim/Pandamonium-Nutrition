import React, { Component } from "react";
//React-router-dom
import { NavLink } from "react-router-dom";
//Material-ui
import RaisedButton from "material-ui/RaisedButton";
//Redux
import { connect } from "react-redux";
import { getProducts, getSortedProducts } from "../../ducks/product";
import "./Shop.css";

class Shop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sort: ""
    };

    this.handleSort = this.handleSort.bind(this);
    this.confirmSort = this.confirmSort.bind(this);
  }

  componentDidMount() {
    this.props.getProducts();
    // console.log(this.props.product);
  }

  handleSort(val) {
    this.setState({
      sort: val
    });
    console.log(this.state.sort);
  }

  confirmSort() {
    this.props.getSortedProducts(this.state.sort);
  }

  render() {
    // console.log(this.props.product.product);
    const { product = { product: [] }, loading } = this.props;

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
        {loading ? (
          <div>
            <h1>Loading Content...</h1>
          </div>
        ) : (
          <div className="products-list">
            <select
              className=""
              onChange={e => this.handleSort(e.target.value)}
            >
              <option value="" disabled selected>
                Sort Products
              </option>
              <option value="ascend"> Price (low-to-high) </option>
              <option value="descend"> Price (high-to-low) </option>
            </select>
            <RaisedButton
              label="Sort"
              primary={true}
              className="sort-button"
              onClick={this.confirmSort}
            />
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

export default connect(mapStateToProps, { getProducts, getSortedProducts })(
  Shop
);
