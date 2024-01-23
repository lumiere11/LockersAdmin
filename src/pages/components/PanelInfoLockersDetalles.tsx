import React, { useEffect, useState } from 'react'
import PanelInfoLockersWrapper from './PanelInfoLockersWrapper'
import { Button, Card, Col } from 'react-bootstrap';
import { getServiciosRecargas } from '@/services/RecargasServiciosService';
import { DocumentData } from 'firebase/firestore';
import { PanelInfoLockersDetalles } from '@/types/PanelInfoLockersDetalles';


const PanelInfoLockersDetalles = ({lockerId , lockerSelect}: PanelInfoLockersDetalles) => {
    const [globalServiciosEarnings, setGlobalServiciosEarnings] = useState(0)
    const [serviciosLockerTotalEarnings, setServiciosLockerTotalEarnings] = useState(0)

    const [globalRecargasEarnings, setGlobalRecargasEarnings] = useState(0)
    const [recargasLockerEarnings, setRecargasLockerEarnings] = useState(0)

    const [quantity, setQuantity] = useState(0)
    
    const serviciosLogic = (servicios: DocumentData[]) => {
        let globalEarnings2 = 0;
        let totalTransacctions = 0;
        servicios.map((item) => {
            globalEarnings2 += item.totalAmount;
            totalTransacctions += 1;
        })
        setGlobalServiciosEarnings(globalEarnings2)
        setServiciosLockerTotalEarnings(totalTransacctions * 9)

    }
    const recargasLogic = (recargas: DocumentData[]) => {
        let globalEarnings2 = 0;
        let lockerRecargasEarnings = 0;
        recargas.map((item) => {
            globalEarnings2 += item.totalAmount;
            lockerRecargasEarnings += item.totalAmount *.05
        })
        setGlobalRecargasEarnings(globalEarnings2)
        setRecargasLockerEarnings(lockerRecargasEarnings)

    }
    const getData = async () => {
        const recargasServicios = await getServiciosRecargas(lockerId);
        console.log(recargasServicios)
        // Find the index of the object where type is "servicios"
        if (recargasServicios) {
            setQuantity(recargasServicios.length);
            const serviciosIndex = recargasServicios.findIndex(item => item.type === "servicios");

            // Find the index of the object where type is "recargas"
            const recargasIndex = recargasServicios.findIndex(item => item.type === "recargas");

            const servicios = recargasServicios.slice(0, serviciosIndex);
            serviciosLogic(servicios)
            const recargas = recargasServicios.slice(serviciosIndex + 1, recargasIndex);
            recargasLogic(recargas)
        }

    }
    useEffect(() => {
        getData();

    }, [])

    return (
        <PanelInfoLockersWrapper>
            <>
                <Col xs="4" md="4" className='mb-4' >
                    <Card>
                        <Card.Body className='card-body d-flex  align-items-center justify-content-center flex-column'>
                            <p>Paquetes </p>
                            <p>0</p>

                        </Card.Body>
                    </Card>
                </Col>
                <Col xs="4" md="4" className='mb-4' >

                    <Card>
                        <Card.Body className='card-body d-flex  align-items-center justify-content-center flex-column'>
                            <p>Utilidad global</p>
                            <p>$0</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs="4" md="4" className='mb-4' >

                    <Card>
                        <Card.Body className='card-body d-flex  align-items-center justify-content-center flex-column'>
                            <p>Mi utilidad</p>
                            <p>$0</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs="4" md="4" className='mb-4' >

                    <Card>
                        <Card.Body className='card-body d-flex  align-items-center justify-content-center flex-column'>
                            <p>Pagos y recargas</p>
                            <p>{quantity}</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs="4" md="4" className='mb-4' >

                    <Card>
                        <Card.Body className='card-body d-flex  align-items-center justify-content-center flex-column'>
                            <p>Utilidad global</p>
                            <p>${globalRecargasEarnings + globalServiciosEarnings}</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs="4" md="4" className='mb-4' >

                    <Card>
                        <Card.Body className='card-body d-flex  align-items-center justify-content-center flex-column'>
                            <p>Mi utilidad</p>
                            <p>${recargasLockerEarnings + serviciosLockerTotalEarnings }</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs="4" md="4" className='mb-4' >

                    <Card>
                        <Card.Body className='card-body d-flex  align-items-center justify-content-center flex-column'>
                            <p>Anunciantes patalla</p>
                            <p>0</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs="4" md="4" className='mb-4' >

                    <Card>
                        <Card.Body className='card-body d-flex  align-items-center justify-content-center flex-column'>
                            <p>Utilidad global</p>
                            <p>0</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs="4" md="4" className='mb-4' >

                    <Card>
                        <Card.Body className='card-body d-flex  align-items-center justify-content-center flex-column'>
                            <p>Mi utilidad</p>
                            <p>0</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs="4" md="4" className='mb-4'  >

                    <Card style={{ height: '8rem' }} >
                        <Card.Body className='card-body d-flex  align-items-center justify-content-center flex-column'>
                            <p>Anunciantes rotulados</p>
                            <p>0</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs="4" md="4" className='mb-4'   >

                    <Card style={{ height: '8rem' }} >
                        <Card.Body className='card-body d-flex  align-items-center justify-content-center flex-column'>
                            <p>Utilidad global</p>
                            <p>0</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs="4" md="4" className='mb-4' >

                    <Card style={{ height: '8rem' }} >
                        <Card.Body className='card-body d-flex  align-items-center justify-content-center flex-column'>
                            <p>Mi utilidad</p>
                            <p>$0</p>
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