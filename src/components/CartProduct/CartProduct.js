import React, { Component } from "react";
//Material-ui
import ContentRemoveCircle from "material-ui/svg-icons/content/remove-circle";
import ContentAddCircle from "material-ui/svg-icons/content/add-circle";
import RaisedButton from "material-ui/RaisedButton";
import ActionDelete from "material-ui/svg-icons/action/delete";
//Sweetalert2
import swal from "sweetalert2";
import "./CartProduct.css";

class CartProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newQuantity: this.props.product.quantity,
      newTotal: 0
    };
    this.handleQuantity = this.handleQuantity.bind(this);
  }

  handleQuantity(id, quantity, onePrice) {
    const { newQuantity } = this.state;
    const { updateCartValues } = this.props;
    if (quantity === "deduct" && newQuantity === 1) {
      this.setState(
        {
          newQuantity: newQuantity,
          newTotal: newQuantity * onePrice
        },
        () => updateCartValues(id, newQuantity, newQuantity * onePrice)
      );
    } else if (quantity === "deduct") {
      this.setState(
        {
          newQuantity: newQuantity - 1,
          newTotal: onePrice * (newQuantity - 1)
        },
        () =>
          updateCartValues(id, newQuantity - 1, onePrice * (newQuantity - 1))
      );
    } else if (quantity === "add") {
      this.setState(
        {
          newQuantity: newQuantity + 1,
          newTotal: onePrice * (newQuantity + 1)
        },
        () =>
          updateCartValues(id, newQuantity + 1, onePrice * (newQuantity + 1))
      );
    }
  }
  render() {
    const { product, updateCartValues, handleDelete } = this.props;
    const { newQuantity, newTotal } = this.state;
    return (
      <div className="cart-item-container" key={product.product_id}>
        <div className="cart-item-img-container">
          <img className="cart-item-img" alt="" src={product.product_img} />
        </div>
        <div className="cart-item-description">
          <p className="cart-item-name">
            {product.product_name} - {product.product_flavor}
          </p>
          {/* <div className="cart-item-option"> */}
          <p className="cart-item-price">${product.total_price}</p>
          <div className="quantity-container">
            <ContentRemoveCircle
              className="subtract-cart"
              onClick={() =>
                this.handleQuantity(
                  product.product_id,
                  "deduct",
                  product.single_price
                )
              }
            />
            <div className="cart-val">{newQuantity}</div>
            <ContentAddCircle
              className="add-cart "
              onClick={() =>
                this.handleQuantity(
                  product.product_id,
                  "add",
                  product.single_price
                )
              }
            />
          </div>

          <ActionDelete
            className="remove-order-button"
            onClick={() => {
              handleDelete(product.product_id);
              swal({
                title: `Item has been removed!`,
                type: "success",
                confirmButtonText: "Back to Cart",
                confirmButtonColor: "#ff6d00"
              });
            }}
          />
          {/* </div> */}
        </div>
      </div>
    );
  }
}

export default CartProduct;
