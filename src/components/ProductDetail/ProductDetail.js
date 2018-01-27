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
import { Card, CardHeader, CardText } from "material-ui/Card";
import { orangeA700 } from "material-ui/styles/colors";
//Sweetalert2
import swal from "sweetalert2";
//React-star-ratings
import StarRatings from "react-star-ratings";
//Local
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
      description: ""
    };

    this.handleFlavor = this.handleFlavor.bind(this);
    this.handleQuantity = this.handleQuantity.bind(this);
    this.handleCart = this.handleCart.bind(this);
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
    const {
      productDetail = { productDetail: [] },
      cart = { cart: [] },
      review = { review: [] },
      loading
    } = this.props;

    const {
      flavor,
      quantity,
      total,
      name,
      email,
      rating,
      title,
      description
    } = this.state;

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
          <p>{review.review_name}</p>
          <p>{review.description}</p>
        </div>
      );
    });

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
                <div className="flavor-container">
                  <label className="flavor-select-title">CONTENTS</label>
                  <div className="item-count">
                    {productDetail[0].product_flavor}
                  </div>
                </div>
              ) : (
                <div className="flavor-container">
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
                  className="quantity-select"
                  onChange={e => this.handleQuantity(e.target.value)}
                  type="number"
                  placeholder={quantity}
                />

                {!flavor || flavor === productDetail[0].product_flavor ? (
                  <RaisedButton
                    label="Add to Cart"
                    primary={true}
                    labelPosition="after"
                    style={{ height: 37, width: "87vw" }}
                    labelStyle={{
                      fontSize: 12,
                      fontWeight: "bold",
                      margin: "10px 0 0 0"
                    }}
                    icon={<ActionAddShoppingCart />}
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
                        confirmButtonColor: "#ff6d00"
                      });
                    }}
                  />
                ) : (
                  <RaisedButton
                    label="Add to Cart"
                    primary={true}
                    labelPosition="after"
                    style={{ height: 37, width: "87vw" }}
                    labelStyle={{
                      fontSize: 12,
                      fontWeight: "bold",
                      margin: "10px 0 0 0"
                    }}
                    icon={<ActionAddShoppingCart />}
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
                        confirmButtonColor: "#ff6d00"
                      });
                    }}
                  />
                )}
              </div>

              <Card style={{ width: "87vw", background: "transparent" }}>
                <CardHeader
                  title="Write a review"
                  actAsExpander={true}
                  titleColor={orangeA700}
                  style={{ fontWeight: "bold", fontSize: 15, marginTop: -25 }}
                />
                <CardText expandable={true} style={{ width: "87vw" }}>
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
                      style={{ height: 37, width: "88%" }}
                      labelStyle={{
                        fontSize: 12,
                        fontWeight: "bold",
                        margin: "10px 0 0 0"
                      }}
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
              <h4 className="detail-header">{productDetail[0].heading}</h4>
              <p className="detail-description">
                {productDetail[0].description}
              </p>
              <div className="reviews-container">{reviewsList}</div>
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
