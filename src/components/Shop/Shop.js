import React, { Component } from "react";
//Material-ui
import Card from "material-ui/Card";
//React-router-dom
import { Link } from "react-router-dom";
//Redux
import { connect } from "react-redux";
import { getProducts } from "../../ducks/product";
import "./Shop.css";

class Shop extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props.getProducts());
  }

  render() {
    const { product = { product: [] } } = this.props;
    console.log(product);

    let productsList = product.product.map((product, i) => {
      return (
        <Link to={`/product/${product.id}`} key={i}>
          <Card className="product-wrapper">
            <div className="product-img-container">
              <img className="product-img" src={product.product_img} />
            </div>
            <h4>{product.product_name}</h4>
            <p>${product.product_price}</p>
          </Card>
        </Link>
      );
    });
    return (
      <div className="products-main-container">
        {this.props.isLoading ? (
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

const mapStateToProps = state => state;

export default connect(mapStateToProps, { getProducts })(Shop);
