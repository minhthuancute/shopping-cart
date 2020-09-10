
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Input, Button, Layout, Popover, Typography, Image, Row, Col } from 'antd'
import { SearchOutlined, ShoppingCartOutlined, FrownOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css'
import { fetchProduct } from './actions/productsAction'
import { isEmpty } from './functions/isEmpty'
import Product from './components/Products';
import Cart from './components/Cart';
import './App.scss'

const { Header } = Layout;
const { Text } = Typography;

const styleMid = {
   height: '100%',
   display: 'flex',
   alignItems: 'center'
}

const App = () => {
   const dispatch = useDispatch();
   const stateProducts = useSelector(state => state.productsReducer);
   const stateCart = useSelector(state => state.cartReducer);
   const [total, setTotal] = useState(null);
   const [productFilter, setProductFilter] = useState([]);
   const [isSearch, setIsSearch] = useState(false);

   useEffect(() => {
      dispatch(fetchProduct());
      const reduceTotal = JSON.parse(localStorage.getItem('carts')).reduce((acc, val) => {
         return acc + val.price;
      }, 0)
      setTotal(reduceTotal);
      return () => { }
   }, [dispatch, stateCart])

   useEffect(() => {
      setProductFilter(stateProducts);
      return () => { }
   }, [stateProducts])

   const handleChange = (e) => {
      setIsSearch(true);
      let value = e.target.value;
      let res = stateProducts.filter(val => {
         let name = val.name.slice(0, val.name.indexOf(" "));
         return name.toLowerCase().includes(value.toLowerCase())
      });
      setProductFilter(res);
   }

   return (
      <Layout>
         <Header>
            <Row style={{
               display: "flex",
               justifyContent: "space-between",
               alignItems: "center",
            }}>
               <Col span={8}>
                  <Image
                     width={120}
                     src="./assets/Veggy.png"
                  />
               </Col>

               <Col span={8} style={styleMid}>
                  <Input onChange={handleChange} addonAfter={<SearchOutlined />} placeholder="Search Products" />
               </Col>

               <Col span={8} style={{
                  display: "flex",
                  justifyContent: "flex-end"
               }}>
                  <Popover placement="bottomRight"
                     title={stateCart.length === 0
                        ? <Text> Your Cart Is Empty <FrownOutlined /></Text>
                        : <Text>Total: {total} Vnd</Text>}
                     content={<Cart stateCart={stateCart} />} trigger="click">
                     <Button icon={<ShoppingCartOutlined style={{ fontSize: 20 }} />} ghost />
                     <Button style={{
                        transform: 'translate(-2px, -16px)'
                     }} type='primary' danger shape="circle" size="small"> {stateCart.length}</Button>
                  </Popover>
               </Col>
            </Row>
         </Header>

         {
            isEmpty(productFilter) && isSearch
               ? <Text style={{ textAlign: "center", padding: '20px 0' }}>No Result <FrownOutlined /></Text>
               : <Product products={productFilter} />
         }
      </Layout >
   )
}

export default App