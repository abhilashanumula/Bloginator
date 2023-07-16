import React, { Children } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const FormComp = ({children}) => {
  return (
    <Container >
      <Row className='mt-5'>
        <Col className='card p-5'>
          {children}
        </Col>
      </Row>
    </Container>
  )
}

export default FormComp