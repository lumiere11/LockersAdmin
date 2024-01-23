import React from 'react'
import { Card, Col } from 'react-bootstrap'
import styles from '@/styles/dashboard.module.scss'
import PanelInfoLockersWrapper from './PanelInfoLockersWrapper';

interface Lockers {

    nombre: string;
    gananciaGlobal: number;
    gananciaTotal: number;

}
const meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril',
    'Mayo', 'Junio', 'Julio', 'Agosto',
    'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];
interface LockersInfo {
    lockers: Array<Lockers>
    lockerSelect: (isMain: boolean) => void
}
const PanelInfoLockers = ({ lockers, lockerSelect }: LockersInfo) => {
    return (
        <PanelInfoLockersWrapper>
            <>
                {
                    lockers.map((item, index) => (
                        <>
                            <Col xs="4" md="4" className={`mb-4 cursor-pointer ${styles.locker}`} onClick={() => lockerSelect(false)}>
                                <Card>
                                    <Card.Body className='card-body d-flex  align-items-center justify-content-center flex-column'>
                                        <p>Locker {index + 1}</p>
                                        <p>{item.nombre}</p>

                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xs="4" md="4" className='mb-4' >

                                <Card>
                                    <Card.Body className='card-body d-flex  align-items-center justify-content-center flex-column'>
                                        <p>Utilidad global</p>
                                        <p>${item.gananciaGlobal}</p>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xs="4" md="4" className='mb-4' >

                                <Card>
                                    <Card.Body className='card-body d-flex  align-items-center justify-content-center flex-column'>
                                        <p>Mi utilidad</p>
                                        <p>${item.gananciaTotal}</p>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </>
                    ))
                }
            </>
        </PanelInfoLockersWrapper>

    )
}

export default PanelInfoLockers