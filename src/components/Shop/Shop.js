import React, { Component } from "react";
//React-router-dom
import { NavLink } from "react-router-dom";
//Redux
import { connect } from "react-redux";
import { getProducts, getSortedProducts } from "../../ducks/product";
//Local
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import Loader from "../Loader/Loader";
import "./Shop.css";

class Shop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sort: "",
      search: ""
    };

    this.handleSort = this.handleSort.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    const { getProducts } = this.props;
    getProducts();
  }

  handleSort(val) {
    const { getSortedProducts } = this.props;
    getSortedProducts(val)
      .then(res => this.setState({ search: "" }))
      .then(() => {
        this.setState({
          sort: val
        });
      });
  }

  handleSearch(val) {
    this.setState({
      search: val
    });
  }

  render() {
    const { product = [], loading } = this.props;
    const { search, sort } = this.state;
    if (loading) return <Loader />;
    let productsList = product
      .filter(item => {
        return (
          item.product_name.toLowerCase().search(search.toLowerCase()) !== -1 ||
          item.product_type.toLowerCase().search(search.toLowerCase()) !== -1
        );
      })
      .map(product => {
        return (
          <NavLink
            className="product-wrapper"
            to={`/product/${product.product_type}`}
            key={product.product_id}
          >
            <div className="product-img-container">
              <img className="product-img" alt="" src={product.product_img} />
            </div>
            <p className="product-name">{product.product_name}</p>
            <p className="product-price">${product.product_price}</p>
          </NavLink>
        );
      });
    return (
      <div className="products-main-container">
        <BreadCrumb trail={[{ id: 1, name: "Shop", url: "/shop" }]} />
        <div className="products-list">
          <div className="search-container">
            <input
              className="search-input"
              type="text"
              onChange={e => this.handleSearch(e.target.value)}
              value={search}
            />
          </div>

          <div className="sort-container">
            <label className="sort-title">Sort</label>
            <select
              className="sort-select"
              onChange={e => this.handleSort(e.target.value)}
              value={sort}
            >
              <option value=""> Default Sorting </option>
              <option value="az"> Alphabetically: A-Z </option>
              <option value="za"> Alphabetically: Z-A </option>
              <option value="ascend"> Price: Low-to-High </option>
              <option value="descend"> Price: High-to-Low </option>
            </select>
          </div>

          <div className="products-align">{productsList}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.product.loading,
    product: state.product.product
  };
};

export default connect(mapStateToProps, {
  getProducts,
  getSortedProducts
})(Shop);
