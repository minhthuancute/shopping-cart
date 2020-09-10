
import React, { useState } from 'react'
import { Row, Col, Input, Button } from 'antd'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'

const Counter = ({ setValue }) => {
   const [valueInput, setValueInput] = useState(null);

   const changeInput = e => {
      setValue(e.target.value);
      setValueInput(e.target.value);
   }

   const handleIncre = () => setValueInput(parseInt(valueInput) + 1);
   const handleDecre = () => setValueInput(parseInt(valueInput) - 1);
   return (
      <>
         <Row align='middle' justify='space-between'>
            <Col span={2}>
               <Button onClick={handleDecre} shape='circle' icon={<MinusOutlined />} />
            </Col>

            <Col span={15}>
               <Input onChange={changeInput} value={valueInput} style={{ textAlign: "center" }} type='number' />
            </Col>

            <Col span={2}>
               <Button onClick={handleIncre} shape='circle' icon={<PlusOutlined />} />
            </Col>
         </Row>
      </>
   )
}
export default Counter