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

    this.handleFlavor = this.handleFlavor.bind(this);
  }

  componentDidMount() {
    this.props.getProductById(this.props.match.params.product_id);
  }

  handleFlavor(val) {
    this.setState({
      flavor: val
    });
  }

  render() {
    // console.log(this.props.productDetail);
    const { productDetail = { productDetail: [] }, loading } = this.props;
    return (
      <div className="detail-main-container">
        {loading ? (
          <div>
            <h1>Loading Content...</h1>
          </div>
        ) : (
          <div>
            <div className="detail-img-container">
              {!this.state.flavor ||
              this.state.flavor === productDetail.product_flavor ? (
                <img className="detail-img" src={productDetail.product_img} />
              ) : (
                <img className="detail-img" src={productDetail.product_img2} />
              )}
            </div>

            <div className="detail-description-container">
              <p className="detail-name">{productDetail.product_name}</p>
              <p className="detail-price">${productDetail.product_price}</p>
              {!productDetail.product_flavor2 ? (
                <div className="flavor-select">
                  {productDetail.product_flavor}
                </div>
              ) : (
                <select
                  className="flavor-select"
                  value={this.state.flavor}
                  onChange={e => this.handleFlavor(e.target.value)}
                >
                  <option value="" disabled selected>
                    Choose Flavor...
                  </option>
                  <option value={productDetail.product_flavor}>
                    {productDetail.product_flavor}
                  </option>
                  <option value={productDetail.product_flavor2}>
                    {productDetail.product_flavor2}
                  </option>
                </select>
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
    productDetail: state.product.productDetail
  };
};

export default connect(mapStateToProps, { getProductById })(ProductDetail);
