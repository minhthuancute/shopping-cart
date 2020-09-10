
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addCart } from '../actions/cartAction'
import { Card, Layout, Row, Col, Button, Modal, Image, Typography, Select } from 'antd'
import { isEmpty } from '../functions/isEmpty'
import Counter from './Counter'

const { Meta } = Card;
const { Content } = Layout;
const { Text } = Typography;
const { Option } = Select;

const Products = ({ products }) => {
   const dispatch = useDispatch();
   const [loadingAddCart, setLoadingAddCart] = useState({
      loading: false,
      index: -1
   });
   const [propsProduct, setPropsProduct] = useState(null);
   const [valueModal, setValueModal] = useState({});
   const [valueInput, setValueInput] = useState(null);
   const [valueOption, setValueOption] = useState('All');

   useEffect(() => {
      setPropsProduct(products)
      return () => { }
   }, [products])

   const handleShowModal = (obj) => setValueModal(obj);

   const handleAddCart = (product, price, index) => {
      dispatch(addCart(product, price, valueInput * price));
      setLoadingAddCart({
         loading: true,
         index
      });
   }

   const changeOption = value => {
      setValueOption(value);
   }

   useEffect(() => {
      const res = valueOption === 'All' ? products : products.filter(val => val.category === valueOption.toLowerCase());
      setPropsProduct(res);
      return () => {
         const res = valueOption === 'All' ? products : products.filter(val => val.category === valueOption.toLowerCase());
         setPropsProduct(res);
      }
   }, [valueOption, products])

   return (
      <Layout>
         <Content>
            <Modal
               visible={!isEmpty(valueModal)}
               footer={false}
               onCancel={() => setValueModal({})}
            >
               {
                  !isEmpty(valueModal) && <>
                     <Image src={valueModal.image} />
                     <Text>{valueModal.name}</Text>
                     <br />
                     <Text type='secondary'>{valueModal.price} Vnd</Text>
                  </>
               }
            </Modal>

            <div style={{
               display: "flex",
               justifyContent: "center"
            }}>
               <div style={{ width: 1125, marginTop: 16, marginLeft: 15 }}>
                  <Select onChange={changeOption} defaultValue='All' style={{ width: 150, textAlign: "center" }}>
                     <Option value="All">All</Option>
                     <Option value="Vegetables">Vegetables</Option>
                     <Option value="Fruits">Fruits</Option>
                     <Option value="Nuts">Nuts</Option>
                  </Select>
               </div>
            </div>

            <div style={{
               display: "flex",
               justifyContent: "center"
            }}>

               <Row gutter={16} style={{
                  display: "flex",
                  paddingTop: 16,
                  width: 1125,
                  justifyContent: "flex-start",
                  flexWrap: "wrap"
               }}>

                  {
                     Array.isArray(propsProduct) && propsProduct.map((val, index) => (
                        <Col style={{ marginBottom: 18, flexBasis: '25%' }} key={val.id}>
                           <Card
                              hoverable
                              cover={<img alt={val.name} src={val.image} onClick={() => handleShowModal(val)} />}
                           >
                              <Meta style={{ textAlign: "center", marginBottom: 16 }} title={val.name} description={`${val.price} Vnd`} />

                              <Row>
                                 <Col span={24}>
                                    <Counter setValue={setValueInput} />
                                 </Col>
                              </Row>

                              <Button onClick={() => handleAddCart(val, val.price, index)} type="primary" danger block style={{ marginTop: 16 }}>
                                 {loadingAddCart.loading && loadingAddCart.index === index ? "Added" : "Add To Cart"}
                              </Button>
                           </Card>
                        </Col>
                     ))
                  }
               </Row>

            </div>
         </Content>
      </Layout>
   )
}

export default React.memo(Products)