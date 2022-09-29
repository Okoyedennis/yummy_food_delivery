import axios from 'axios';
import "./AdminProduct.css";
import React, { useRef, useState } from 'react'
import { useEffect } from 'react';
import CurrencyFormat from 'react-currency-format';
import {AiOutlineReload} from "react-icons/ai"
import Product from '../../Models/Product';
import BASE_URL from '../../services/Constant';
import ProductSave from './AdminProductImp/ProductSave';
import ProductImageSave from './AdminProductImp/ProductImageSave';
import ProductDelete from './AdminProductImp/ProductDelete';
import { authHeader } from '../../services/BaseService';
import Navbar from '../Navbar/Navbar';

const AdminProduct = () => {
  const [productList, setProductList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(
    new Product("", "", "", "", "", "", 0, "")
  );
  const [errorMessage, setErrorMessage] = useState(false);
  const saveComponent = useRef();
  const saveImageComponent = useRef();
  const deleteComponent = useRef();

  const createdProductRequest = () => {
    setSelectedProduct(new Product("", "", "", "", "", "", 0));
    saveComponent.current?.showProductModal();
  };

  const uploadProductImage = () => {
    setSelectedProduct(new Product("", "", "", "", "", "", 0, ""));
    saveImageComponent.current?.showProductModal();
  };

  const editProductRequest = (item) => {
    setSelectedProduct(Object.assign({}, item));
    saveComponent.current?.showProductModal();
  };

  const deleteProductRequest = (product) => {
    setSelectedProduct(product);
    deleteComponent.current?.showDeleteModal();
  };

  const deleteProduct = () => {
    axios
      .delete(
        `${BASE_URL}/api/admin/delete-product/${selectedProduct.productId}`,
        {
          headers: authHeader(),
        }
      )
      .then(() => {
        setProductList(
          productList.filter(
            (del) => del.productId !== selectedProduct.productId
          )
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/v1/auth/users/getAllProducts`)
      .then((resp) => {
        setProductList(resp.data.content);
      })
      .catch(() => {
        setErrorMessage(true);
      });
  }, []);

  const reload = () => {
    window.location.reload();
  };

  return (
    <>
      <Navbar />
      <div className="admin">
        <div className="admin__page-wrapper container pt-5 ">
          {errorMessage ? (
            <div className="row mt-5 text-white">
              <div className="col-md-12 text-center">
                <div className="mb-4 lead">
                  NETWORK ERROR: Please reload the page.
                </div>
                <div onClick={reload}>
                  <AiOutlineReload className="icon" />
                </div>
              </div>
            </div>
          ) : (
            <div className="card bg-dark ">
              <div className="card-header">
                <div className="row">
                  <div className="col-6">
                    <h3>All Products</h3>
                  </div>
                  <div className="col-6 text-end">
                    <button
                      className="btn btn-primary"
                      onClick={() => createdProductRequest()}
                    >
                      Create Product
                    </button>
                    <button
                      className="btn btn-warning text-dark mx-2"
                      onClick={() => uploadProductImage()}
                    >
                      Upload Image
                    </button>
                  </div>
                </div>
              </div>
              <div className="card-body ">
                <table className="table text-white">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Product Name</th>
                      <th scope="col">Product Category</th>
                      <th scope="col">ProductId</th>
                      <th scope="col">Product Image</th>
                      <th scope="col">Product Price</th>
                      <th scope="col">Size</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  {
                    <tbody className="text-white">
                      {productList.map((item, index) => (
                        <tr key={item.productId}>
                          <th scope="row">{index + 1}</th>
                          <td>{item.productName}</td>
                          <td>{item.categoryName}</td>
                          <td>{item.productId}</td>
                          <td>
                            <img
                              src={item.productImage}
                              alt={item.productName}
                            />
                          </td>
                          <td>
                            <CurrencyFormat
                              renderText={(value) => <p>{value}</p>}
                              decimalScale={2}
                              value={item.productPrice}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"₦"}
                            />
                          </td>
                          <td>{item.size}</td>
                          <td className="">
                            <button
                              className="btn btn-primary"
                              onClick={() => editProductRequest(item)}
                            >
                              Edit
                            </button>

                            <button
                              className="btn btn-danger mx-2"
                              onClick={() => deleteProductRequest(item)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                      {/* <div class="spinner-border text-primary" role="status">
                      <span class="sr-only">Loading...</span>
                    </div> */}
                    </tbody>
                  }
                </table>
              </div>
            </div>
          )}
        </div>
        <ProductSave
          product={selectedProduct}
          ref={saveComponent}
          reload={reload}
        />
        <ProductImageSave image={selectedProduct} ref={saveImageComponent} />
        <ProductDelete
          reload={reload}
          ref={deleteComponent}
          onConfirmed={() => deleteProduct()}
        />
      </div>
    </>
  );
};

export default AdminProduct;