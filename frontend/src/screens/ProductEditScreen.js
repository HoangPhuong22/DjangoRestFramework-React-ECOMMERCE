import React, {useState, useEffect, useId} from 'react';
import {Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { productDetailAction, productUpdateAction } from '../actions/productActions';
import { productUpdateSlice } from '../reducers/productSlice';
import axios from 'axios';

function ProductEditScreen() {
  const {id} =  useParams();
  const productId = id
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();
  const productDetail = useSelector(state => state.productDetail);
  const {loading, product, error} = productDetail;
  const useLogin = useSelector(state => state.userLogin);
  const {userInfo} = useLogin;
  
  const productUpdate = useSelector(state => state.productUpdate);
  const {loading: loadingUpdate, success: successUpdate, error: errorUpdate} = productUpdate;

  const navigate = useNavigate();

  useEffect(() => {

      if(successUpdate)
      {
          dispatch(productUpdateSlice.actions.Reset());
          navigate('/admin/productlist');
      }
      else
      {
          if(!product || (product && product._id !== Number(productId)))
          {
              dispatch(productDetailAction(productId));
          }
          else
          {
              setName(product.name);
              setPrice(product.price);
              setImage(product.image);
              setBrand(product.brand);
              setCategory(product.category);
              setCountInStock(product.countInStock);
              setDescription(product.description);
          }
      }
  }, [dispatch, productId, product, navigate, successUpdate]);
  const submitHandler = (e) =>{
      e.preventDefault();
      dispatch(productUpdateAction({_id: productId, name, price, image, brand, category, countInStock, description}));
  }

  const uploadFileHandler = async (e) =>{
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    formData.append('product_id', productId);
    setUploading(true);
    try{
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`
        }
      }
      const {data} = await axios.post('http://127.0.0.1:8000/api/products/upload/', formData, config);
      setImage(data);
      console.log(data);
      setUploading(false);
    }catch(error){
      console.error(error);
      setUploading(false);
    }
  }

  return (
    <div>
      <Link to={`/admin/productlist`} className='btn btn-light my-3'>
        Quay lại
      </Link>
      <FormContainer>
        <h1>Chỉnh sửa sản phẩm</h1>
        {loadingUpdate && <Loader/>}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> :
          (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='name'>
                <Form.Label>Tên sản phẩm</Form.Label>
                <Form.Control 
                  type='name' 
                  placeholder='Nhập tên sản phẩm' 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  >
                  </Form.Control>
              </Form.Group>
              <Form.Group controlId='price'>
                <Form.Label>Giá tiền</Form.Label>
                <Form.Control 
                  type='number' 
                  placeholder='Nhập giá sản phẩm' 
                  value={price} 
                  onChange={(e) => setPrice(e.target.value)}
                  >
                  </Form.Control>
              </Form.Group>
              <Form.Group controlId='image'>
                <Form.Label>Ảnh</Form.Label>
                <Form.Control 
                  type='text' 
                  placeholder='Thêm ảnh sản phẩm' 
                  value={image} 
                  onChange={(e) => setImage(e.target.value)}
                  >
                  </Form.Control>
                  <Form.Control 
                    type="file" 
                    onChange={uploadFileHandler} 
                  />
                  {uploading && <Loader/>}
              </Form.Group>
              <Form.Group controlId='brand'>
                <Form.Label>Thương hiệu</Form.Label>
                <Form.Control 
                  type='text' 
                  placeholder='Thêm tên thương hiệu' 
                  value={brand} 
                  onChange={(e) => setBrand(e.target.value)}
                  >
                  </Form.Control>
              </Form.Group>
              <Form.Group controlId='countInStock'>
                <Form.Label>Số lượng sản phẩm</Form.Label>
                <Form.Control 
                  type='number' 
                  placeholder='Nhập số lượng sản phẩm' 
                  value={countInStock} 
                  onChange={(e) => setCountInStock(e.target.value)}
                  >
                  </Form.Control>
              </Form.Group>
              <Form.Group controlId='category'>
                <Form.Label>Danh mục sản phẩm</Form.Label>
                <Form.Control 
                  type='text' 
                  placeholder='Nhập danh mục' 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)}
                  >
                  </Form.Control>
              </Form.Group>
              <Form.Group controlId='description'>
                <Form.Label>Mô tả</Form.Label>
                <Form.Control 
                  type='text' 
                  placeholder='Nhập mô tả' 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)}
                  >
                  </Form.Control>
              </Form.Group>
              <Button type='submit' variant='primary'>Chấp nhận</Button>
            </Form>
          )
        }

      </FormContainer>
    </div>
  )
}

export default ProductEditScreen
