import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
const CategoryProduct = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);

    useEffect(() => {
        if (params?.slug) getPrductsByCat();
    }, [params?.slug]);
    const getPrductsByCat = async () => {
        try {
            const { data } = await axios.get(
                `/api/v1/product/product-category/${params.slug}`
            );
            setProducts(data?.products);
            setCategory(data?.category);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout>
            <div className="container mt-2">
                <h4 className="text-center">Category - {category?.name}</h4>
                <h6 className="text-center">{products?.length} result found </h6>
                <div className="row mt-3">
                    <div className="col-md-10 offset-1">
                        <div className="d-flex flex-wrap">
                            {products?.map((p) => (
                                <div key={p._id} className='col-lg-3 col-md-6 col-sm-6 mb-3'>
                                    <div className="card" style={{ maxWidth: '260px', minHeight: '350px' }}>
                                        <img
                                            src={`/api/v1/product/product-photo/${p._id}`}
                                            className="card-img-top"
                                            alt={p.name}
                                            style={{ height: '200px', width: '100%', objectFit: 'cover' }}
                                        />
                                        <div className="card-body">
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <h5 className="card-title">{p.name}</h5>
                                                <h6 className="card-title">₹ {p.price}</h6>
                                            </div>
                                            <p className="card-text" style={{ maxHeight: '40px', overflow: 'auto', textOverflow: 'ellipsis' }}>
                                                {p.description}
                                            </p>
                                        </div>

                                        <div className="card-footer text-muted" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            {/* Add your delete icon button here */}
                                            <button className="btn btn-secondary btn-sm ms-2" onClick={() => navigate(`/product/${p.slug}`)}>More Detail
                                            </button>
                                            <button
                                                className="btn btn-primary btn-sm ms-2">Add to Cart
                                                <i className="fa-solid fa-cart-can" style={{ "color": " #fe0606" }} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div> */}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CategoryProduct;