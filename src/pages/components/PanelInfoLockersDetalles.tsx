import React from 'react'
import PanelInfoLockersWrapper from './PanelInfoLockersWrapper'
import { Button, Card, Col, Row } from 'react-bootstrap';
import { PanelDetallesLocker } from '@/types/PanelDetallesLocker';


const PanelInfoLockersDetalles = ({ lockerSelect, paquete, recargasYservicios }: PanelDetallesLocker) => {

    return (
        <PanelInfoLockersWrapper>
            <Card >
                <Card.Body>
                    <Row>
                        <Col xs="8" md="8">
                            <Row>

                                <Col xs="6" md="6" className='mb-4' >
                                    <Card>
                                        <Card.Body className='card-body d-flex  align-items-center justify-content-center flex-column'>
                                            <p>Paquetes </p>
                                            <p>{paquete.qty}</p>

                                        </Card.Body>
                                    </Card>
                                </Col>
                                {/* <Col xs="4" md="4" className='mb-4' >

                                    <Card>
                                        <Card.Body className='card-body d-flex  align-items-center justify-content-center flex-column'>
                                            <p>Utilidad global</p>
                                            <p>${paquete.globalEarnings}</p>
                                        </Card.Body>
                                    </Card>
                                </Col> */}
                                <Col xs="6" md="6" className='mb-4' >

                                    <Card>
                                        <Card.Body className='card-body d-flex  align-items-center justify-content-center flex-column'>
                                            <p>Mi utilidad</p>
                                            <p>${paquete.licenciatarioEarnings.toFixed(4)}</p>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col xs="6" md="6" className='mb-4' >

                                    <Card>
                                        <Card.Body className='card-body d-flex  align-items-center justify-content-center flex-column'>
                                            <p>Pagos y recargas</p>
                                            <p>{recargasYservicios.qty}</p>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                {/* <Col xs="4" md="4" className='mb-4' >

                                    <Card>
                                        <Card.Body className='card-body d-flex  align-items-center justify-content-center flex-column'>
                                            <p>Utilidad global</p>
                                            <p>${recargasYservicios.recargasGlobalEarnings + recargasYservicios.serviciosGlobalEarnings}</p>
                                        </Card.Body>
                                    </Card>
                                </Col> */}
                                <Col xs="6" md="6" className='mb-4' >

                                    <Card>
                                        <Card.Body className='card-body d-flex  align-items-center justify-content-center flex-column'>
                                            <p>Mi utilidad</p>
                                            <p>${(recargasYservicios.recargasLicenciatarioEarnings + recargasYservicios.serviciosLicenciatarioEarnings).toFixed(4)}</p>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col xs="6" md="6" className='mb-4' >

                                    <Card>
                                        <Card.Body className='card-body d-flex  align-items-center justify-content-center flex-column'>
                                            <p>Anunciantes patalla</p>
                                            <p>0</p>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                {/* <Col xs="4" md="4" className='mb-4' >

                                    <Card>
                                        <Card.Body className='card-body d-flex  align-items-center justify-content-center flex-column'>
                                            <p>Utilidad global</p>
                                            <p>0</p>
                                        </Card.Body>
                                    </Card>
                                </Col> */}
                                <Col xs="6" md="6" className='mb-4' >

                                    <Card>
                                        <Card.Body className='card-body d-flex  align-items-center justify-content-center flex-column'>
                                            <p>Mi utilidad</p>
                                            <p>0</p>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col xs="6" md="6" className='mb-4'  >

                                    <Card style={{ height: '8rem' }} >
                                        <Card.Body className='card-body d-flex  align-items-center justify-content-center flex-column'>
                                            <p>Anunciantes rotulados</p>
                                            <p>0</p>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                {/* <Col xs="4" md="4" className='mb-4'   >

                                    <Card style={{ height: '8rem' }} >
                                        <Card.Body className='card-body d-flex  align-items-center justify-content-center flex-column'>
                                            <p>Utilidad global</p>
                                            <p>0</p>
                                        </Card.Body>
                                    </Card>
                                </Col> */}
                                <Col xs="6" md="6" className='mb-4' >

                                    <Card style={{ height: '8rem' }} >
                                        <Card.Body className='card-body d-flex  align-items-center justify-content-center flex-column'>
                                            <p>Mi utilidad</p>
                                            <p>$0</p>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col xs="12" md="12" className='mb-4' >
                                    <Button onClick={() => lockerSelect(true )} >Volver</Button>
                                </Col>
                            </Row>

                        </Col>

                        <Col xs="4" md="4">
                            <Card className='h-100'>
                                <Card.Body className='d-flex justify-content-center align-items-center  flex-column h-100'>
                                    <p>Mi utilidad por mis lockers</p>
                                    <p>$ {(paquete.licenciatarioEarnings + recargasYservicios.recargasLicenciatarioEarnings + recargasYservicios.serviciosLicenciatarioEarnings).toFixed(4) }</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

        </PanelInfoLockersWrapper>
    )
}

export default PanelInfoLockersDetalles