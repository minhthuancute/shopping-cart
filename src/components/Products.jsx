
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addCart } from '../actions/cartAction'
import { Card, Layout, Row, Col, Button, Modal, Image, Typography } from 'antd'
import { isEmpty } from '../functions/isEmpty'
import Counter from './Counter'

const { Meta } = Card;
const { Content } = Layout;
const { Text } = Typography;

const Products = ({ products }) => {
   const dispatch = useDispatch();
   const [loadingAddCart, setLoadingAddCart] = useState({
      loading: false,
      index: -1
   });
   const [valueModal, setValueModal] = useState({});
   const [valueInput, setValueInput] = useState(null);

   const handleShowModal = (obj) => setValueModal(obj);

   const handleAddCart = (product, price, index) => {
      dispatch(addCart(product, price, valueInput * price));
      setLoadingAddCart({
         loading: true,
         index
      });
   }

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

            <Row align='middle' justify='center' gutter={16} style={{
               display: "flex",
               paddingTop: 16,
               width: '100%',
            }}>

               {
                  Array.isArray(products) && products.map((val, index) => (
                     <Col span={5} style={{ marginBottom: 16 }} key={val.id}>
                        <Card
                           hoverable
                           cover={<img alt={val.name} src={val.image} onClick={() => handleShowModal(val)} />}
                        >
                           <Meta style={{ textAlign: "center", marginBottom: 16 }} title={val.name} description={`${val.price} Vnd`} />

                           <Counter setValue={setValueInput} />

                           <Button onClick={() => handleAddCart(val, val.price, index)} type="primary" danger block style={{ marginTop: 16 }}>
                              {loadingAddCart.loading && loadingAddCart.index === index ? "Added" : "Add To Cart"}
                           </Button>
                        </Card>
                     </Col>
                  ))
               }
            </Row>
         </Content>
      </Layout>
   )
}

export default React.memo(Products)