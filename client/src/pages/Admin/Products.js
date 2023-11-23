import React, { useEffect, useState } from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from "./../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from 'react-router-dom';

const Products = () => {

    const [products, setProducts] = useState([])

    // get all products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get('/api/v1/product/get-product')
            setProducts(data.products)
        } catch (error) {
            console.log(error);
            toast.error('Somthing want worng')
        }
    }

    // delete product
    const handleDeleteProduct = async (productId) => {
        try {
            let answer = alert('Are You Sure wnat to delete this product ?')
            if (!answer) {
                const { data } = await axios.delete(`/api/v1/product/delete-product/${productId}`)
                toast.success('Product deleted')
                getAllProducts();
            }
            const { data } = await axios.delete(`/api/v1/product/delete-product/${productId}`)
            toast.success('Product deleted')
            getAllProducts();
        } catch (error) {
            console.log(error);
            toast.error('Somthing want wrong')
        }
    }

    useEffect(() => {
        getAllProducts();
    }, [])

    return (
        <div>
            <Layout>
                <div className="container-fluid m-3 p-3">
                    <div className='row'>
                        <div className='col-md-2'>
                            <AdminMenu />
                        </div>
                        <div className='col-md-10'>
                            <h1 className='text-center'>All Products List</h1>
                            <div className='row'>
                                {products?.map((p) => (
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
                                                    <h5 className="card-title">₹ {p.price}</h5>
                                                </div>
                                                <p className="card-text" style={{ maxHeight: '40px', overflow: 'auto', textOverflow: 'ellipsis' }}>
                                                    {p.description}
                                                </p>
                                            </div>

                                            <div className="card-footer text-muted" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                {/* Add your delete icon button here */}
                                                <Link to={`/dashboard/admin/product/${p.slug}`} className='product-link btn btn-outline-primary btn-sm '>
                                                    <i className="fa-sharp fa-solid fa-pen-to-square" style={{ "color": "#19b839" }} />
                                                </Link> &nbsp;
                                                <button
                                                    className="btn btn-outline-dark btn-sm"
                                                    onClick={() => handleDeleteProduct(p._id)}
                                                >
                                                    <i className="fa-solid fa-trash-can" style={{ "color": " #fe0606" }} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </div>


    )
}

export default Products


// pagination 
// import React, { useEffect, useState } from 'react';
// import AdminMenu from '../../components/Layout/AdminMenu';
// import Layout from './../../components/Layout/Layout';
// import toast from 'react-hot-toast';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import ReactPaginate from 'react-paginate';

// const Products = () => {
//   const [products, setProducts] = useState([]);
//   const [pageNumber, setPageNumber] = useState(0);

//   const productsPerPage = 8;
//   const pagesVisited = pageNumber * productsPerPage;

//   const displayProducts = products
//     .slice(pagesVisited, pagesVisited + productsPerPage)
//     .map((p) => (
//       <div key={p._id} className='col-lg-3 col-md-4 col-sm-6 mb-3'>
//         <div className="card" style={{ maxWidth: '260px', minHeight: '350px' }}>
//           <img
//             src={`/api/v1/product/product-photo/${p._id}`}
//             className="card-img-top"
//             alt={p.name}
//             style={{ height: '200px', width: '100%', objectFit: 'cover' }}
//           />
//           <div className="card-body">
//             <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//               <h5 className="card-title">{p.name}</h5>
//               <h5 className="card-title">₹ {p.price}</h5>
//             </div>
//             <p className="card-text" style={{ maxHeight: '50px', overflow: 'auto', textOverflow: 'ellipsis' }}>
//               {p.description}
//             </p>
//           </div>

//           <div className="card-footer text-muted" style={{ display: 'flex', justifyContent: 'flex-end' }}>
//             {/* Add your delete icon button here */}
//             <Link to={`/dashboard/admin/product/${p.slug}`} className='product-link btn btn-outline-primary btn-sm '>
//               <i className="fa-sharp fa-solid fa-pen-to-square" style={{ "color": "#19b839" }} />
//             </Link> &nbsp;
//             <button
//               className="btn btn-outline-dark btn-sm"
//               onClick={() => handleDeleteProduct(p._id)}
//             >
//               <i className="fa-solid fa-trash-can" style={{ "color": " #fe0606" }} />
//             </button>
//           </div>
//         </div>
//       </div>
//     ));

//   const pageCount = Math.ceil(products.length / productsPerPage);

//   const changePage = ({ selected }) => {
//     setPageNumber(selected);
//   };

//   // get all products
//   const getAllProducts = async () => {
//     try {
//       const { data } = await axios.get('/api/v1/product/get-product');
//       setProducts(data.products);
//     } catch (error) {
//       console.log(error);
//       toast.error('Something went wrong');
//     }
//   };

//   // delete product
//   const handleDeleteProduct = async (productId) => {
//     try {
//       let answer = alert('Are You Sure wnat to delete this product ?');
//       if (!answer) {
//         const { data } = await axios.delete(`/api/v1/product/delete-product/${productId}`);
//         toast.success('Product deleted');
//         getAllProducts();
//       }
//       const { data } = await axios.delete(`/api/v1/product/delete-product/${productId}`);
//       toast.success('Product deleted');
//       getAllProducts();
//     } catch (error) {
//       console.log(error);
//       toast.error('Something went wrong');
//     }
//   };

//   useEffect(() => {
//     getAllProducts();
//   }, []);

//   return (
//     <div>
//       <Layout>
//         <div className='container-fluid m-3 p-3'>
//           <div className='row'>
//             <div className='col-md-2'>
//               <AdminMenu />
//             </div>
//             <div className='col-md-10'>
//               <h1 className='text-center'>All Products List</h1>
//               <div className='row'>{displayProducts}</div>
//               <ReactPaginate
//                 previousLabel={'Previous'}
//                 nextLabel={'Next'}
//                 pageCount={pageCount}
//                 onPageChange={changePage}
//                 containerClassName={'pagination'}
//                 previousLinkClassName={'pagination__link'}
//                 nextLinkClassName={'pagination__link'}
//                 disabledClassName={'pagination__link--disabled'}
//                 activeClassName={'pagination__link--active'}
//               />
//             </div>
//           </div>
//         </div>
//       </Layout>
//     </div>
//   );
// };

// export default Products;
