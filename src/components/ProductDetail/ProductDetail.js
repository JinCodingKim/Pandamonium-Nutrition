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
      quantity: 1
    };

    this.handleFlavor = this.handleFlavor.bind(this);
    this.handleQuantity = this.handleQuantity.bind(this);
    this.handleCart = this.handleCart.bind(this);
  }

  componentDidMount() {
    this.props.getProductByType(this.props.match.params.product_type);
    const { user_id } = this.props.user;
    this.props.getCart(user_id);
  }

  handleFlavor(val) {
    this.setState({
      flavor: val
    });
  }

  handleQuantity(val) {
    this.setState({
      quantity: val
    });
  }

  handleCart(product, amount) {
    const { cart } = this.props;
    if (cart.length === 0) {
      this.props.addToCart(product, amount);
    } else {
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].product_id === product) {
          this.props.updateCart(product, amount);
        } else {
          this.props.addToCart(product, amount);
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

    return (
      <div>
        {!productDetail[0] ? (
          <div>
            {" "}
            <h1>Loading Content...</h1>
          </div>
        ) : (
          <div className="detail-main-container">
            <div className="detail-img-container">
              {!this.state.flavor ||
              this.state.flavor === productDetail[0].product_flavor ? (
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
                  <div className="flavor-select-title">PER BOTTLE</div>
                  <div className="item-count">
                    {productDetail[0].product_flavor}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flavor-select-title">FLAVOR</div>
                  <select
                    className="flavor-select"
                    value={this.state.flavor}
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

              <div className="flavor-select-title">QUANTITY</div>
              <select
                className="flavor-select"
                value={this.state.quantity}
                onChange={e => this.handleQuantity(e.target.value)}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>

              {!this.state.flavor ||
              this.state.flavor === productDetail[0].product_flavor ? (
                <RaisedButton
                  label="Add to Cart"
                  // backgroundColor={styles.buttonStyle}
                  className="cart-button"
                  onClick={() => {
                    this.handleCart(
                      productDetail[0].product_id,
                      this.state.quantity
                    );

                    swal({
                      title: `${productDetail[0].product_name} added to Cart!`,
                      text: `${productDetail[0].product_flavor}`,
                      type: "success",
                      confirmButtonText: "Back to Shopping"
                    });
                  }}
                />
              ) : (
                <RaisedButton
                  label="Add to Cart"
                  // backgroundColor={styles.buttonStyle}
                  className="cart-button"
                  onClick={() => {
                    this.handleCart(
                      productDetail[1].product_id,
                      this.state.quantity
                    );
                    swal({
                      title: `${productDetail[1].product_name} added to Cart!`,
                      text: `${productDetail[1].product_flavor}`,
                      type: "success",
                      confirmButtonText: "Back to Shopping"
                    });
                  }}
                />
              )}
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
