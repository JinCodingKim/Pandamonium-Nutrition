import React, { Component } from "react";
//Redux
import { connect } from "react-redux";
import { getProductById } from "../../ducks/product";
//Local
// import "./ProductDetail.css";

class ProductDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flavor: ""
    };
  }

  componentDidMount() {
    this.props.getProductById(this.props.match.params.product_id);
  }

  handleFlavor(e) {
    this.setState({
      flavor: e.target.value
    });
  }

  render() {
    const { product = { product: [] } } = this.props;
    console.log(product);
    return (
      <div className="detail-main-container">
        <div className="detail-img-container">
          {!this.state.flavor ||
          this.state.flavor === product.product_flavor ? (
            <img className="detail-img" src={product.product_img} />
          ) : (
            <img className="detail-img" src={product.product_img2} />
          )}
        </div>
        <div className="detail-description-container">
          <p className="detail-name">{product.product_name}</p>
          <p className="detail-price">${product.product_price}</p>
          <select
            className="flavor-select"
            value={this.state.flavor}
            onChange={e => this.handleFlavor(e.target.value)}
          >
            <option value="" disabled selected>
              Choose Flavor...
            </option>
            <option value={product.product_flavor}>
              {product.product_flavor}
            </option>
            <option value={product.product_flavor2}>
              {product.product_flavor2}
            </option>
          </select>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { getProductById })(ProductDetail);
