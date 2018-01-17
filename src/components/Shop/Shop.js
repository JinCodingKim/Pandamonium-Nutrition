import React, { Component } from "react";
//React-router-dom
import { NavLink } from "react-router-dom";
//Redux
import { connect } from "react-redux";
import { getProducts } from "../../ducks/product";
import "./Shop.css";

class Shop extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    console.log(this.props.product.product);
    const { product = { product: [] }, loading } = this.props;

    let productsList = product.map(product => {
      return (
        <NavLink
          className="product-wrapper"
          to={`/product/${product.product_id}`}
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
          <div className="products-list">{productsList}</div>
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

export default connect(mapStateToProps, { getProducts })(Shop);
