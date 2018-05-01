import React, { Component } from "react";
//Redux
import { connect } from "react-redux";
import {
  getCart,
  removeCart,
  updateCartItem,
  removeAllCart,
  updateTotalAmnt
} from "../../ducks/product";
//Material-ui
import RaisedButton from "material-ui/RaisedButton";
import ActionPayment from "material-ui/svg-icons/action/payment";
//React-Router
import { NavLink } from "react-router-dom";
//Local
import Loader from "../Loader/Loader";
import CartProduct from "../CartProduct/CartProduct";
import "./Cart.css";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartTotal: 0
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.updateCartValues = this.updateCartValues.bind(this);
    this.removeCart = this.removeCart.bind(this);
  }

  componentDidMount() {
    const { user, getCart } = this.props;
    getCart(user.user_id);
  }

  handleDelete(product) {
    const { user, removeCart, getCart } = this.props;
    removeCart(product);
    getCart(user.user_id);
  }

  updateCartValues(product, amount, total) {
    const { user, updateCartItem, getCart } = this.props;
    updateCartItem(product, amount, total).then(() => getCart(user.user_id));
  }

  removeCart() {
    const { user, removeAllCart, getCart } = this.props;
    removeAllCart(user.user_id);
    getCart(user.user_id);
  }

  render() {
    const { cart = [], loading, updateTotalAmnt } = this.props;
    const { cartTotal } = this.state;
    if (loading) return <Loader />;
    let cartList = cart.map(product => {
      return (
        <CartProduct
          key={product.product_id}
          product={product}
          handleDelete={this.handleDelete}
          updateCartValues={this.updateCartValues}
        />
      );
    });

    let totalAmnt = cart.reduce((acc, curr) => {
      return acc + curr.total_price;
    }, cartTotal);
    return (
      <div className="cart-main-container">
        {!cartList.length ? (
          <div className="cart-empty">Cart is empty.</div>
        ) : (
          <div>{cartList}</div>
        )}
        <div className="order-container">
          <div className="order-total">
            Order Total:
            <span className="indent">
              ${Number.parseFloat(totalAmnt).toFixed(2) || "0.00"}
            </span>
          </div>
          <div className="checkout-container" onClick={this.removeCart}>
            <NavLink to="/checkout" className="checkout-button">
              <RaisedButton
                label="Checkout"
                primary={true}
                disabled={!cartList.length}
                labelPosition="after"
                className="checkout-button"
                onClick={() => updateTotalAmnt(totalAmnt)}
                icon={<ActionPayment />}
              />
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cart: state.product.cart,
    loading: state.product.loading,
    user: state.user.user
  };
};

export default connect(mapStateToProps, {
  getCart,
  removeCart,
  updateCartItem,
  removeAllCart,
  updateTotalAmnt
})(Cart);
