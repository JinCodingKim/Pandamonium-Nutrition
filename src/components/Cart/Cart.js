import React, { Component } from "react";
//Redux
import { connect } from "react-redux";
import { getCart } from "../../ducks/product";

class Cart extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { user_id } = this.props.user;
    this.props.getCart(user_id);
  }

  render() {
    const { cart = { cart: [] }, loading } = this.props;
    let cartList = cart.map(product => {
      return (
        <div className="" key={product.product_id}>
          <p className="">{product.product_name}</p>
          <p className="">{product.product_flavor}</p>
          <p className="">${product.product_price}</p>
          <p className="">{product.quantity}</p>
        </div>
      );
    });
    return <div>{!cart ? <div>Hello</div> : <div>{cartList}</div>}</div>;
  }
}

const mapStateToProps = state => {
  return {
    cart: state.product.cart,
    loading: state.product.loading,
    user: state.user.user
  };
};

export default connect(mapStateToProps, { getCart })(Cart);
