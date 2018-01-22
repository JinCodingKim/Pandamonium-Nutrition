import React, { Component } from "react";
//Redux
import { connect } from "react-redux";
import {
  getProductByType,
  addToCart,
  getCart,
  updateCart
} from "../../ducks/product";
//Material-ui
import RaisedButton from "material-ui/RaisedButton";
//Sweetalert2
import swal from "sweetalert2";
//Local
import "./ProductDetail.css";

class ProductDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flavor: "",
      quantity: 1,
      total: 0
    };

    this.handleFlavor = this.handleFlavor.bind(this);
    this.handleQuantity = this.handleQuantity.bind(this);
    this.handleCart = this.handleCart.bind(this);
  }

  componentDidMount() {
    const { user, match, getProductByType, getCart } = this.props;
    getProductByType(match.params.product_type);
    getCart(user.user_id);
  }

  handleFlavor(val) {
    this.setState({
      flavor: val
    });
  }

  handleQuantity(val) {
    this.setState({
      quantity: val,
      total: this.props.productDetail[0].product_price * val
    });
  }

  handleCart(product, amount, price, single) {
    // console.log(
    //   "product:" +
    //     product +
    //     " amount:" +
    //     amount +
    //     " price:" +
    //     price +
    //     "single:" +
    //     single
    // );
    const { cart, addToCart, UpdateCart } = this.props;
    if (cart.length === 0) {
      addToCart(product, amount, price, single);
    } else {
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].product_id === product) {
          updateCart(product, amount, price);
        } else {
          addToCart(product, amount, price, single);
        }
      }
    }
  }

  render() {
    const {
      productDetail = { productDetail: [] },
      cart = { cart: [] },
      loading
    } = this.props;

    const { flavor, quantity, total } = this.state;

    return (
      <div>
        {!productDetail[0] ? (
          <div>
            <h1>Loading Content...</h1>
          </div>
        ) : (
          <div className="detail-main-container">
            <div className="detail-img-container">
              {!flavor || flavor === productDetail[0].product_flavor ? (
                <img
                  className="detail-img"
                  src={productDetail[0].product_img}
                />
              ) : (
                <img
                  className="detail-img"
                  src={productDetail[1].product_img}
                />
              )}
            </div>

            <div className="detail-description-container">
              <p className="company-name">
                <span>PANDAMONIUM</span> SPORTS NUTRITION
              </p>
              <h2 className="detail-name">{productDetail[0].product_name}</h2>
              <h4 className="detail-price">
                ${productDetail[0].product_price}
              </h4>

              {!productDetail[1] ? (
                <div>
                  <label className="flavor-select-title">CONTENTS</label>
                  <div className="item-count">
                    {productDetail[0].product_flavor}
                  </div>
                </div>
              ) : (
                <div>
                  <label className="flavor-select-title">FLAVOR</label>
                  <select
                    className="flavor-select"
                    value={flavor}
                    onChange={e => this.handleFlavor(e.target.value)}
                  >
                    <option value={productDetail[0].product_flavor}>
                      {productDetail[0].product_flavor}
                    </option>
                    <option value={productDetail[1].product_flavor}>
                      {productDetail[1].product_flavor}
                    </option>
                  </select>
                </div>
              )}
              <div className="detail-options-container">
                <label className="flavor-select-title">QUANTITY</label>
                <input
                  className="flavor-select"
                  onChange={e => this.handleQuantity(e.target.value)}
                  type="number"
                  value={quantity}
                />

                {!flavor || flavor === productDetail[0].product_flavor ? (
                  <RaisedButton
                    label="Add to Cart"
                    primary={true}
                    className="cart-button"
                    onClick={() => {
                      this.handleCart(
                        productDetail[0].product_id,
                        quantity,
                        total,
                        productDetail[0].product_price
                      );

                      swal({
                        title: `${
                          productDetail[0].product_name
                        } added to Cart!`,
                        text: `${productDetail[0].product_flavor}`,
                        type: "success",
                        confirmButtonText: "Back to Shopping",
                        confirmButtonColor: "#757575"
                      });
                    }}
                  />
                ) : (
                  <RaisedButton
                    label="Add to Cart"
                    primary={true}
                    className="cart-button"
                    onClick={() => {
                      this.handleCart(
                        productDetail[1].product_id,
                        quantity,
                        total,
                        productDetail[1].product_price
                      );
                      swal({
                        title: `${
                          productDetail[1].product_name
                        } added to Cart!`,
                        text: `${productDetail[1].product_flavor}`,
                        type: "success",
                        confirmButtonText: "Back to Shopping",
                        confirmButtonColor: "#757575"
                      });
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.product.loading,
    productDetail: state.product.productDetail,
    cart: state.product.cart,
    user: state.user.user
  };
};

export default connect(mapStateToProps, {
  getProductByType,
  addToCart,
  updateCart,
  getCart
})(ProductDetail);
