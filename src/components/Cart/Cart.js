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
import ActionDelete from "material-ui/svg-icons/action/delete";
import ActionUpdate from "material-ui/svg-icons/action/update";
import ActionPayment from "material-ui/svg-icons/action/payment";
//Sweetalert2
import swal from "sweetalert2";
//React-Router
import { NavLink } from "react-router-dom";
//Local
import CheckoutInfo from "../Checkout/Checkout";
import "./Cart.css";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartTotal: 0,
      newQuantity: 0,
      newTotal: 0
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleQuantity = this.handleQuantity.bind(this);
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

  handleQuantity(val, onePrice) {
    this.setState({
      newQuantity: val,
      newTotal: val * onePrice
    });
  }

  updateCartValues(product, amount, total) {
    const { user, updateCartItem, getCart } = this.props;
    updateCartItem(product, amount, total);
    getCart(user.user_id);
  }

  removeCart() {
    const { user, removeAllCart, getCart } = this.props;
    removeAllCart(user.user_id);
    getCart(user.user_id);
  }

  render() {
    const { cart = { cart: [] }, loading, updateTotalAmnt } = this.props;
    const { cartTotal, newQuantity, newTotal } = this.state;
    let cartList = cart.map(product => {
      return (
        <div className="cart-item-container" key={product.product_id}>
          <div className="cart-item-img-container">
            <img className="cart-item-img" src={product.product_img} />
          </div>
          <div className="cart-item-description">
            <p className="cart-item-name">
              {product.product_name} - {product.product_flavor}
            </p>
            <div className="cart-item-option">
              <p className="cart-item-price">${product.total_price}</p>
              <div className="quantity-container">
                <label className="cart-item-quantity">Qty:</label>
                <input
                  className="quantity-reselect"
                  onChange={e =>
                    this.handleQuantity(e.target.value, product.single_price)
                  }
                  type="number"
                  placeholder={product.quantity}
                />
              </div>
              <RaisedButton
                label="Update"
                primary={true}
                labelPosition="after"
                style={{ height: 30, width: 160, marginBottom: 2 }}
                labelStyle={{
                  fontSize: 12,
                  fontWeight: "bold",
                  margin: "10px 0 10px 0"
                }}
                icon={<ActionUpdate />}
                onClick={() => {
                  this.updateCartValues(
                    product.product_id,
                    newQuantity,
                    newTotal
                  );
                  swal({
                    title: `Item has been updated!`,
                    type: "success",
                    confirmButtonText: "Back to Cart",
                    confirmButtonColor: "#ff6d00"
                  });
                }}
              />
              <RaisedButton
                label="Remove"
                primary={true}
                labelPosition="after"
                style={{ height: 30, width: 160, marginTop: 2 }}
                labelStyle={{
                  fontSize: 12,
                  fontWeight: "bold",
                  margin: "10px 0 10px 0"
                }}
                icon={<ActionDelete />}
                onClick={() => {
                  this.handleDelete(product.product_id);
                  swal({
                    title: `Item has been removed!`,
                    type: "success",
                    confirmButtonText: "Back to Cart",
                    confirmButtonColor: "#ff6d00"
                  });
                }}
              />
            </div>
          </div>
        </div>
      );
    });

    let totalAmnt = cart.reduce((acc, curr) => {
      return acc + curr.total_price;
    }, cartTotal);

    return (
      <div className="cart-main-container">
        {cartList || <div>Cart is empty.</div>}
        <div className="order-container">
          <div className="order-total">
            Order Total: <span>${totalAmnt || "0.00"}</span>
          </div>
          <div className="checkout-container" onClick={this.removeCart}>
            <NavLink to="/checkout" className="checkout-button">
              <RaisedButton
                label="Checkout"
                primary={true}
                labelPosition="after"
                style={{ height: 30, width: 140 }}
                labelStyle={{
                  fontSize: 12,
                  fontWeight: "bold",
                  margin: "10px 0 10px 0"
                }}
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
