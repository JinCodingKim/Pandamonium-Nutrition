import React, { Component } from "react";
//Redux
import { connect } from "react-redux";
import { getProductById } from "../../ducks/product";
//Local
import "./ProductDetail.css";

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
      <div>
        {loading ? (
          <div>
            <h1>Loading Content...</h1>
          </div>
        ) : (
          <div className="detail-main-container">
            <div className="detail-img-container">
              {!this.state.flavor ||
              this.state.flavor === productDetail.product_flavor ? (
                <img className="detail-img" src={productDetail.product_img} />
              ) : (
                <img className="detail-img" src={productDetail.product_img2} />
              )}
            </div>

            <div className="detail-description-container">
              <p className="company-name">
                <span>PANDAMONIUM</span> SPORTS NUTRITION
              </p>
              <h2 className="detail-name">{productDetail.product_name}</h2>
              <h4 className="detail-price">${productDetail.product_price}</h4>
              {!productDetail.product_flavor2 ? (
                <div>
                  <div className="flavor-select-title">QUANTITY</div>
                  <div className="item-count">
                    {productDetail.product_flavor}
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
                    <option value={productDetail.product_flavor}>
                      {productDetail.product_flavor}
                    </option>
                    <option value={productDetail.product_flavor2}>
                      {productDetail.product_flavor2}
                    </option>
                  </select>
                </div>
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
