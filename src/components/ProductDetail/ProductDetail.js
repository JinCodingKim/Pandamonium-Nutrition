import React, { Component } from "react";
//Redux
import { connect } from "react-redux";
import {
  getProductByType,
  addToCart,
  getCart,
  updateCart,
  addReview,
  getReviews
} from "../../ducks/product";
//Material-ui
import RaisedButton from "material-ui/RaisedButton";
import ActionAddShoppingCart from "material-ui/svg-icons/action/add-shopping-cart";
import ActionCheckCircle from "material-ui/svg-icons/action/check-circle";
import ContentRemoveCircle from "material-ui/svg-icons/content/remove-circle";
import ContentAddCircle from "material-ui/svg-icons/content/add-circle";
import { Card, CardHeader, CardText } from "material-ui/Card";
import { orangeA700 } from "material-ui/styles/colors";
//Sweetalert2
import swal from "sweetalert2";
//React-star-ratings
import StarRatings from "react-star-ratings";
//Local
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import Loader from "../Loader/Loader";
import "./ProductDetail.css";

class ProductDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flavor: "",
      quantity: 1,
      total: 0,
      name: "",
      email: "",
      rating: 0,
      title: "",
      description: "",
      iconOne: "",
      iconTwo: "",
      iconThree: ""
    };

    this.handleFlavor = this.handleFlavor.bind(this);
    this.handleAmount = this.handleAmount.bind(this);
    this.handleCart = this.handleCart.bind(this);
    this.handleIcon = this.handleIcon.bind(this);
    this.handleLeave = this.handleLeave.bind(this);
    this.handleReview = this.handleReview.bind(this);
    this.handleStars = this.handleStars.bind(this);
    this.submitReview = this.submitReview.bind(this);
  }

  componentDidMount() {
    const { user, match, getProductByType, getCart, getReviews } = this.props;
    getProductByType(match.params.product_type).then(res => {
      getReviews(this.props.productDetail[0].product_id);
    });
    getCart(user.user_id);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.productDetail[0] !== this.props.productDetail[0]) {
      this.setState({
        total: this.props.productDetail[0].product_price
      });
    }
  }

  handleFlavor(val) {
    this.setState({
      flavor: val
    });
  }

  handleAmount(trigger) {
    const { quantity } = this.state;
    if (trigger === "deduct" && quantity === 0) {
      this.setState({
        quantity: quantity,
        total: this.props.productDetail[0].product_price * quantity
      });
    } else if (trigger === "deduct") {
      this.setState({
        quantity: quantity - 1,
        total: this.props.productDetail[0].product_price * (quantity - 1)
      });
    } else if (trigger === "add") {
      this.setState({
        quantity: quantity + 1,
        total: this.props.productDetail[0].product_price * (quantity + 1)
      });
    }
  }

  handleCart(product, amount, price, single) {
    const { cart, addToCart, updateCart, getCart, user } = this.props;
    let index = cart.findIndex(e => e.product_id === product);
    if (index === -1) {
      addToCart(product, amount, price, single).then(() =>
        getCart(user.user_id)
      );
    } else {
      updateCart(product, amount, price).then(() => getCart(user.user_id));
    }
  }

  handleIcon(prop, val) {
    this.setState({
      [prop]: val
    });
  }

  handleLeave(prop) {
    this.setState({
      [prop]: ""
    });
  }

  handleReview(prop, val) {
    this.setState({ [prop]: val });
  }

  handleStars(val) {
    this.setState({
      rating: val
    });
  }

  submitReview(product, name, email, rating, title, description) {
    const { addReview } = this.props;
    addReview(product, name, email, rating, title, description).then(res => {
      this.setState({
        name: "",
        email: "",
        rating: 0,
        title: "",
        description: ""
      });
    });
  }

  render() {
    const { productDetail = [], review = [], loading, match } = this.props;
    const {
      flavor,
      quantity,
      total,
      name,
      email,
      rating,
      title,
      description,
      iconOne,
      iconTwo,
      iconThree
    } = this.state;
    if (loading || !productDetail[0]) {
      return <Loader />;
    }
    let reviewsList = review.map(review => {
      return (
        <div className="reviewed-wrapper" key={review.review_id}>
          <div className="reviewed-rating">
            <StarRatings
              rating={review.rating}
              isSelectable={false}
              starRatedColor="#ff6d00"
              starSelectingHoverColor="#ff6d00"
              starSpacing="12px"
              starWidthAndHeight="25px"
              numOfStars={5}
            />
          </div>
          <h4 className="reviewed-title">{review.review_title}</h4>
          <p className="reviewed-name">{review.review_name}</p>
          <p className="reviewed-description">{review.description}</p>
        </div>
      );
    });

    return (
      <div className="detail-main-container">
        <BreadCrumb
          trail={[
            { id: 1, name: "Shop", url: "/shop" },
            {
              id: 2,
              name: productDetail[0].product_name,
              url: match.params.product_type
            }
          ]}
        />
        <div className="detail-sub-container">
          <div className="detail-img-container">
            {!flavor || flavor === productDetail[0].product_flavor ? (
              <img
                alt="product"
                className="detail-img"
                src={productDetail[0].product_img}
              />
            ) : (
              <img
                alt="product"
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
            <h4 className="detail-price">${productDetail[0].product_price}</h4>
            <div className="flavor-quantity-container">
              {!productDetail[1] ? (
                <div className="flavor-container">
                  <label className="flavor-select-title">CONTENTS</label>
                  <div className="item-count">
                    {productDetail[0].product_flavor}
                  </div>
                </div>
              ) : !productDetail[2] ? (
                <div className="flavor-container">
                  <label className="flavor-select-title">FLAVOR</label>
                  <span className="flavor-select-wrapper">
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
                  </span>
                </div>
              ) : (
                <div className="flavor-container">
                  <label className="flavor-select-title">SIZE</label>
                  <span className="flavor-select-wrapper">
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
                      <option value={productDetail[2].product_flavor}>
                        {productDetail[2].product_flavor}
                      </option>
                    </select>
                  </span>
                </div>
              )}
              <div className="detail-options-container">
                <label className="flavor-select-title">QUANTITY</label>
                <span className="quantity-select-wrapper">
                  <ContentRemoveCircle
                    className="subtract-button"
                    onClick={() => this.handleAmount("deduct")}
                  />
                  <div className="quantity-val">{quantity}</div>
                  <ContentAddCircle
                    className="add-button"
                    onClick={() => this.handleAmount("add")}
                  />
                </span>
              </div>
            </div>
            <div className="add-cart-container">
              {!flavor || flavor === productDetail[0].product_flavor ? (
                <RaisedButton
                  label="Add to Cart"
                  primary={true}
                  disabled={quantity === 0}
                  labelPosition="after"
                  className="add-cart-button"
                  icon={<ActionAddShoppingCart />}
                  onClick={() => {
                    this.handleCart(
                      productDetail[0].product_id,
                      quantity,
                      total,
                      productDetail[0].product_price
                    );

                    swal({
                      title: `${productDetail[0].product_name} added to Cart!`,
                      text: `${productDetail[0].product_flavor}`,
                      type: "success",
                      showCancelButton: true,
                      reverseButtons: true,
                      confirmButtonText: "Go to Cart",
                      cancelButtonText: "Back to Shopping",
                      confirmButtonColor: "#ff6d00"
                    }).then(result => {
                      if (result.value) {
                        this.props.history.push("/cart");
                      }
                    });
                  }}
                />
              ) : flavor === productDetail[1].product_flavor ? (
                <RaisedButton
                  label="Add to Cart"
                  primary={true}
                  disabled={quantity === 0}
                  labelPosition="after"
                  className="add-cart-button"
                  icon={<ActionAddShoppingCart />}
                  onClick={() => {
                    this.handleCart(
                      productDetail[1].product_id,
                      quantity,
                      total,
                      productDetail[1].product_price
                    );
                    swal({
                      title: `${productDetail[1].product_name} added to Cart!`,
                      text: `${productDetail[1].product_flavor}`,
                      type: "success",
                      showCancelButton: true,
                      reverseButtons: true,
                      confirmButtonText: "Go to Cart",
                      cancelButtonText: "Back to Shopping",
                      confirmButtonColor: "#ff6d00"
                    }).then(result => {
                      if (result.value) {
                        this.props.history.push("/cart");
                      }
                    });
                  }}
                />
              ) : (
                <RaisedButton
                  label="Add to Cart"
                  primary={true}
                  disabled={quantity === 0}
                  labelPosition="after"
                  className="add-cart-button"
                  icon={<ActionAddShoppingCart />}
                  onClick={() => {
                    this.handleCart(
                      productDetail[2].product_id,
                      quantity,
                      total,
                      productDetail[2].product_price
                    );
                    swal({
                      title: `${productDetail[2].product_name} added to Cart!`,
                      text: `${productDetail[2].product_flavor}`,
                      type: "success",
                      showCancelButton: true,
                      reverseButtons: true,
                      confirmButtonText: "Go to Cart",
                      cancelButtonText: "Back to Shopping",
                      confirmButtonColor: "#ff6d00"
                    }).then(result => {
                      if (result.value) {
                        this.props.history.push("/cart");
                      }
                    });
                  }}
                />
              )}
            </div>
            {productDetail[0].icon_one && (
              <div className="icons-container">
                <div className="icon-wrapper">
                  <img
                    className="product-icon"
                    src={productDetail[0].icon_one}
                    alt="icon"
                    onMouseEnter={() =>
                      this.handleIcon("iconOne", productDetail[0].one_name)
                    }
                    onMouseLeave={() => this.handleLeave("iconOne")}
                  />
                  <p className="icon-name">{iconOne}</p>
                </div>
                <div className="icon-wrapper">
                  <img
                    className="product-icon"
                    src={productDetail[0].icon_two}
                    alt="icon"
                    onMouseEnter={() =>
                      this.handleIcon("iconTwo", productDetail[0].two_name)
                    }
                    onMouseLeave={() => this.handleLeave("iconTwo")}
                  />
                  <p className="icon-name">{iconTwo}</p>
                </div>
                <div className="icon-wrapper">
                  <img
                    className="product-icon"
                    src={productDetail[0].icon_three}
                    alt="icon"
                    onMouseEnter={() =>
                      this.handleIcon("iconThree", productDetail[0].three_name)
                    }
                    onMouseLeave={() => this.handleLeave("iconThree")}
                  />
                  <p className="icon-name">{iconThree}</p>
                </div>
              </div>
            )}
            <div className="review-card-wrapper">
              <Card className="review-card">
                <CardHeader
                  title="Write a review"
                  actAsExpander={true}
                  titleColor={orangeA700}
                  className="review-card-header"
                />
                <CardText expandable={true} className="review-card-text">
                  <div className="card-container">
                    <label className="review-title">Full Name</label>
                    <input
                      className="review-name"
                      placeholder="Enter your name"
                      onChange={e => this.handleReview("name", e.target.value)}
                      value={name}
                      type="text"
                    />
                    <label className="review-title">E-mail Address</label>
                    <input
                      className="review-email"
                      placeholder="will.smith@example.com"
                      onChange={e => this.handleReview("email", e.target.value)}
                      value={email}
                      type="text"
                    />
                    <label className="review-title">Rating</label>
                    <div className="rate-stars">
                      <StarRatings
                        rating={rating}
                        isSelectable={true}
                        isAggregateRating={false}
                        changeRating={this.handleStars}
                        starRatedColor="#ff6d00"
                        starSelectingHoverColor="#ff6d00"
                        starSpacing="12px"
                        starWidthAndHeight="25px"
                        numOfStars={5}
                      />
                    </div>
                    <label className="review-title">Review Title</label>
                    <input
                      className="review-title-input"
                      placeholder="Give your review a title"
                      onChange={e => this.handleReview("title", e.target.value)}
                      value={title}
                      type="text"
                    />
                    <label className="review-title">Body of Review</label>
                    <textarea
                      className="review-description"
                      placeholder="Write your comments here"
                      onChange={e =>
                        this.handleReview("description", e.target.value)
                      }
                      value={description}
                    />
                    <RaisedButton
                      label="Submit Review"
                      primary={true}
                      labelPosition="after"
                      className="submit-review-button"
                      icon={<ActionCheckCircle />}
                      onClick={() => {
                        this.submitReview(
                          productDetail[0].product_id,
                          name,
                          email,
                          rating,
                          title,
                          description
                        );

                        swal({
                          title: `Thank you for your review ${name}`,
                          type: "success",
                          confirmButtonText: "Back to Shopping",
                          confirmButtonColor: "#ff6d00"
                        });
                      }}
                    />
                  </div>
                </CardText>
              </Card>
            </div>
            <h4 className="detail-header">{productDetail[0].heading}</h4>
            <p className="detail-description">{productDetail[0].description}</p>
            <div className="reviews-container">{reviewsList}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.product.loading,
    productDetail: state.product.productDetail,
    cart: state.product.cart,
    user: state.user.user,
    review: state.product.review
  };
};

export default connect(mapStateToProps, {
  getProductByType,
  addToCart,
  updateCart,
  getCart,
  addReview,
  getReviews
})(ProductDetail);
