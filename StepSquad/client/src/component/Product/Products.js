import React from "react";
import "./Product.css";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import ProductCard from "../Home/ProductCard";
import { useAlert } from "react-alert";
import { useEffect ,useState} from "react";
import { Rings } from "react-loader-spinner";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";


const categories = [
  "Running",
  "Casual",
  "HighRise",
  "Boots",
  "Sports",
];

const Products = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const { products, loading, error, productCount ,resultPerPage} = useSelector(
    (state) => state.products
  );
  
  const {keyword}=useParams();

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword,currentPage,price,category,ratings));
  }, [dispatch,keyword,currentPage,price,category,ratings,error,alert]);

// let count=filteredProductsCount;

  return (
    <>
      {loading ? (
        <div className="loader">
          <Rings
            height="80"
            width="80"
            color="#9e665cab"
            radius="6"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="rings-loading"
          />
        </div>
      ) : (
        <>
          <h2 className="productsHeading">Products</h2>
              <div className="container">
                  <div className="row">
                    <div className="col-lg-2 col-md-2 col-sm-2">
                        <div className="p-2">
                        <h5 className="m-0">Price</h5>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
             
            />

            <h5 className="m-0">Categories</h5>
            <ul className="categoryBox mb-2">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

          
              <h5 className="m-0">Ratings Above</h5>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
           
                        </div>
                    </div>
                    <div className="col-lg-10 col-md-10 col-sm-10">
                        <div className="row">
                          <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="products">
                            {products &&
                                products.map((product) => (
                                  <ProductCard key={product._id} product={product} />
                                ))}
                            </div>
                          </div>
                          <div className="col-lg-12 col-md-12 col-sm-12">
                          {resultPerPage < productCount && (
                          <div className="paginationBox">
                            <Pagination
                              activePage={currentPage}
                              itemsCountPerPage={resultPerPage}
                              totalItemsCount={productCount}
                              onChange={setCurrentPageNo}
                              nextPageText="Next"
                              prevPageText="Prev"
                              firstPageText="1st"
                              lastPageText="Last"
                              itemClass="page-item"
                              linkClass="page-link"
                              activeClass="pageItemActive"
                              activeLinkClass="pageLinkActive"
                            />
                          </div>)
                        }
                          </div>
                        </div>
                    </div>
                  </div>
              </div>
          
         
  

        </>
      )}
    </>
  );
};

export default Products;
