import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
const ProductDetails = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);

    //initalp details
    useEffect(() => {
        if (params?.slug) getProduct();
    }, [params?.slug]);
    //getProduct
    const getProduct = async () => {
        try {
            const { data } = await axios.get(
                `/api/v1/product/get-product/${params.slug}`
            );
            setProduct(data?.product);
            getSimilarProduct(data?.product._id, data?.product.category._id);
        } catch (error) {
            console.log(error);
        }
    };

    //get similar product
    const getSimilarProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(
                `/api/v1/product/related-product/${pid}/${cid}`
            );
            setRelatedProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Layout>
            <div className="row container mt-3">
                <div className="col-md-4">
                    <img
                        src={`/api/v1/product/product-photo/${product._id}`}
                        className="card-img-top"
                        alt={product.name}
                        height={"300px"}
                        width={"350px"}
                    />
                </div>
                <div className="col-md-6 ">
                    <h1 className="text-center">Product Details</h1>
                    <h6>Name : {product.name}</h6>
                    <h6>Description : {product.description}</h6>
                    <h6>Price : {product.price}</h6>
                    <h6>Category : {product?.category?.name}</h6>
                    <button class="btn btn-secondary ms-1">ADD TO CART</button>
                </div>
            </div>
            <hr />
            <div className="row container">
                <h6>Similar Products</h6>
                {relatedProducts.length < 1 && (
                    <p className="text-center">No Similar Products found</p>
                )}
                <div className="d-flex flex-wrap">
                    {relatedProducts?.map((p) => (
                        <div key={p._id} className='col-lg-3 col-md-4 col-sm-6 mb-3'>
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
            </div>
        </Layout>
    );
};

export default ProductDetails;