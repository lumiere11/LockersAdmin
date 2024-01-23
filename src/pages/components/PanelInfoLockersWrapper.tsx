import React, { ReactNode } from 'react'
import { Card, Col, Form, Row } from 'react-bootstrap'
import styles from '@/styles/dashboard.module.scss'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril',
    'Mayo', 'Junio', 'Julio', 'Agosto',
    'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];
interface Props {
    children: ReactNode
}
import { RootState } from '../../store';
import { useSelector } from 'react-redux';

const PanelInfoLockersWrapper : React.FC<Props> = ({children}) => {
    const router = useRouter();
    const user = useSelector((state: RootState) => state.user);
    const locker = useSelector((state: RootState) => state.locker);

    const session = useSession({
        required: true,
        onUnauthenticated() {
            router.push('/')
        },
    });

    return (
        <Row>
            <Col xs="2" md="3">
                <p>
                    Historial
                </p>
                <div>
                    <Form.Select aria-label="Selector" defaultValue={"default"} >
                        <option  value={"default"}>Seleccione periodo</option>
                        {meses.map((item, index) => (
                            <option value={index + 1} key={index}>{item}</option>
                        ))}
                    </Form.Select>
                </div>
            </Col>
            <Col xs="9" md="9">
                <p className={`d-flex  align-items-center justify-content-center ${styles.title}`}>Dashboard inversionistas VIP (Multilocker)</p>
                <div className="d-flex justify-content-evenly">
                    <p className={styles.name}>{user.name}</p>
                    <p className={styles.lockers_number}>#{locker.number}</p>
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
                                        <p>$ {locker.total}</p>
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