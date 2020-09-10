
import React from 'react'
import { useDispatch } from 'react-redux'
import { removeCart } from '../actions/cartAction'
import { Card, Typography, Avatar, Row, Col, Button } from 'antd'

const { Text } = Typography;

const Cart = ({ stateCart }) => {
   const dispatch = useDispatch();

   const handleRemoveCart = (id) => {
      dispatch(removeCart(id));
   }

   return (
      <div>
         <Row>
            {
               stateCart.map((val) => (
                  <Col span={24} style={{ marginBottom: '10px' }} key={val.id}>
                     <Card hoverable>
                        <Row justify="space-between">
                           <Col span={14}>
                              <Row style={{
                                 display: "flex",
                                 width: '100%'
                              }}>
                                 <Col span={9}>
                                    <Avatar size='large' shape="square" src={val.image} />
                                 </Col>

                                 <Col span={15}>
                                    <Text>{val.name}</Text> <br />
                                    <Text type="secondary">{`${val.price} Vnd`}</Text>
                                 </Col>
                              </Row>
                           </Col>

                           <Col span={6}>
                              <Button style={{ marginTop: 5 }} onClick={() => handleRemoveCart(val.id)} danger>Remove</Button>
                           </Col>
                        </Row>
                     </Card>
                  </Col>
               ))
            }
         </Row>
      </div >
   )
}

export default Cart