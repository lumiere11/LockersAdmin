import React from 'react'
import PanelInfoLockersWrapper from './PanelInfoLockersWrapper'
import { Button, Card, Col } from 'react-bootstrap';
interface Lockers {

    nombre: string;
    gananciaGlobal: number;
    gananciaTotal: number;

}
interface LockersInfo {
    lockers: Array<Lockers>
    lockerSelect: (isMain: boolean) => void
}
const PanelInfoLockersDetalles = ({ lockers, lockerSelect }: LockersInfo) => {
    return (
        <PanelInfoLockersWrapper>
            <>
                <Col xs="4" md="4" className='mb-4' onClick={() => lockerSelect(false)}>
                    <Card>
                        <Card.Body className='card-body d-flex  align-items-center justify-content-center flex-column'>
                            <p>Paquetes </p>
                            <p>12</p>

                        </Card.Body>
                    </Card>
                </Col>
                <Col xs="4" md="4" className='mb-4' >

                    <Card>
                        <Card.Body className='card-body d-flex  align-items-center justify-content-center flex-column'>
                            <p>Utilidad global</p>
                            <p>$100.00</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs="4" md="4" className='mb-4' >

                    <Card>
                        <Card.Body className='card-body d-flex  align-items-center justify-content-center flex-column'>
                            <p>Mi utilidad</p>
                            <p>$100</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs="4" md="4" className='mb-4' >

                    <Card>
                        <Card.Body className='card-body d-flex  align-items-center justify-content-center flex-column'>
                            <p>Pagos y recargas</p>
                            <p>$100</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs="4" md="4" className='mb-4' >

                    <Card>
                        <Card.Body className='card-body d-flex  align-items-center justify-content-center flex-column'>
                            <p>Utilidad global</p>
                            <p>$100.00</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs="4" md="4" className='mb-4' >

                    <Card>
                        <Card.Body className='card-body d-flex  align-items-center justify-content-center flex-column'>
                            <p>Mi utilidad</p>
                            <p>$100</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs="4" md="4" className='mb-4' >

                    <Card>
                        <Card.Body className='card-body d-flex  align-items-center justify-content-center flex-column'>
                            <p>Anunciantes patalla</p>
                            <p>100</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs="4" md="4" className='mb-4' >

                    <Card>
                        <Card.Body className='card-body d-flex  align-items-center justify-content-center flex-column'>
                            <p>Utilidad global</p>
                            <p>$100.00</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs="4" md="4" className='mb-4' >

                    <Card>
                        <Card.Body className='card-body d-flex  align-items-center justify-content-center flex-column'>
                            <p>Mi utilidad</p>
                            <p>$100</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs="4" md="4" className='mb-4'  >

                    <Card style={{height: '8rem'}} >
                        <Card.Body className='card-body d-flex  align-items-center justify-content-center flex-column'>
                            <p>Anunciantes rotulados</p>
                            <p>100</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs="4" md="4" className='mb-4'   >

                    <Card style={{height: '8rem'}} >
                        <Card.Body className='card-body d-flex  align-items-center justify-content-center flex-column'>
                            <p>Utilidad global</p>
                            <p>$100.00</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs="4" md="4" className='mb-4' >

                    <Card style={{height: '8rem'}} >
                        <Card.Body className='card-body d-flex  align-items-center justify-content-center flex-column'>
                            <p>Mi utilidad</p>
                            <p>$100</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs="12" md="12" className='mb-4' >
                    <Button onClick={() => lockerSelect(true)} >Volver</Button>
                </Col>

            </>
        </PanelInfoLockersWrapper>
    )
}

export default PanelInfoLockersDetalles