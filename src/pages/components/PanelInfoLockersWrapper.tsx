import React, { ReactNode } from 'react'
import { Card, Col, Form, Row } from 'react-bootstrap'
import styles from '@/styles/dashboard.module.scss'

const meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril',
    'Mayo', 'Junio', 'Julio', 'Agosto',
    'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];
interface Props {
    children: ReactNode
}
const PanelInfoLockersWrapper : React.FC<Props> = ({children}) => {
    return (
        <Row>
            <Col xs="2" md="3">
                <p>
                    Historial
                </p>
                <div>
                    <Form.Select aria-label="Selector">
                        <option selected>Seleccione periodo</option>
                        {meses.map((item, index) => (
                            <option value={index + 1} key={index}>{item}</option>
                        ))}
                    </Form.Select>
                </div>
            </Col>
            <Col xs="9" md="9">
                <p className={`d-flex  align-items-center justify-content-center ${styles.title}`}>Dashboard inversionistas VIP (Multilocker)</p>
                <div className="d-flex justify-content-evenly">
                    <p className={styles.name}>Juan Perez Sanchez</p>
                    <p className={styles.lockers_number}>#10</p>
                </div>
                <div className="d-flex justify-content-center">
                    <p className={styles.period}>Periodo del 01 al 20 2023</p>
                </div>
                <Card >
                    <Card.Body>
                        <Row>
                            <Col xs="8" md="8">
                                <Row>
                                    {children}
                                </Row>

                            </Col>

                            <Col xs="4" md="4">
                                <Card className='h-100'>
                                    <Card.Body className='d-flex justify-content-center align-items-center  flex-column h-100'>
                                        <p>Mi utilidad por mis lockers</p>
                                        <p>$ 10000</p>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>

        </Row>
    )
}

export default PanelInfoLockersWrapper