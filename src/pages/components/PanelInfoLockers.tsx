import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import styles from '@/styles/dashboard.module.scss'
import PanelInfoLockersWrapper from './PanelInfoLockersWrapper';
import { PanelInfoLockers } from '@/types/PanelInfoLockers';

const PanelInfoLockers = ({ earnings,  totalLockersEarnings , lockerSelect }: PanelInfoLockers) => {

    return (
        <PanelInfoLockersWrapper>
            <Card>
                <Card.Body>
                    <Row>
                        <Col xs="8" md="8">
                            <Row>
                                {
                                    earnings.map((item, index) => (
                                        <>
                                            <Col xs="4" md="4" className={`mb-4 cursor-pointer ${styles.locker}`} onClick={() => lockerSelect(false, item.lockerId)}>
                                                <Card>
                                                    <Card.Body className='card-body d-flex  align-items-center justify-content-center flex-column'>
                                                        <p>Locker {index + 1}</p>
                                                        <p>{item.name}</p>

                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                            <Col xs="4" md="4" className='mb-4' >

                                                <Card>
                                                    <Card.Body className='card-body d-flex  align-items-center justify-content-center flex-column'>
                                                        <p>Utilidad global</p>
                                                        <p>${item.globalEarnings}</p>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                            <Col xs="4" md="4" className='mb-4' >

                                                <Card>
                                                    <Card.Body className='card-body d-flex  align-items-center justify-content-center flex-column'>
                                                        <p>Mi utilidad</p>
                                                        <p>${item.licenciatarioEarnings} </p>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        </>
                                    ))
                                }
                            </Row>
                        </Col>
                        <Col xs="4" md="4">
                            <Card className='h-100'>
                                <Card.Body className='d-flex justify-content-center align-items-center  flex-column h-100'>
                                    <p>Mi utilidad por mis lockers</p>
                                    <p>$ {totalLockersEarnings}</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </PanelInfoLockersWrapper>
    )
}

export default PanelInfoLockers