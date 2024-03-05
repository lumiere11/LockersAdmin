import React from "react";
import PanelInfoLockersWrapper from "./PanelInfoLockersWrapper";
import { Button, Card, Col, Row } from "react-bootstrap";
import { PanelDetallesLocker } from "@/types/PanelDetallesLocker";
import Link from "next/link";

const PanelInfoLockersDetalles = ({
  lockerSelect,
  paquete,
  recargasYservicios,
}: PanelDetallesLocker) => {
  return (
    <PanelInfoLockersWrapper>
      <Card>
        <Card.Body>
          <Row>
            <Col xs="12" md="8">
              <Row>
                <Col xs="6" md="6" className="mb-4">
                  <Card>
                    <Card.Body className="card-body d-flex  align-items-center justify-content-center flex-column">
                      <Link href="/dashboard/details">
                        <p>Paquetes </p>
                        <p>{paquete.qty}</p>
                      </Link>
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
                <Col xs="6" md="6" className="mb-4">
                  <Card>
                    <Card.Body className="card-body d-flex  align-items-center justify-content-center flex-column">
                      <p>Mi utilidad</p>
                      <p>${paquete.licenciatarioEarnings.toFixed(2)}</p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col xs="6" md="6" className="mb-4">
                  <Card>
                    <Card.Body className="card-body d-flex  align-items-center justify-content-center flex-column">
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
                <Col xs="6" md="6" className="mb-4">
                  <Card>
                    <Card.Body className="card-body d-flex  align-items-center justify-content-center flex-column">
                      <p>Mi utilidad</p>
                      <p>
                        $
                        {(
                          recargasYservicios.recargasLicenciatarioEarnings +
                          recargasYservicios.serviciosLicenciatarioEarnings
                        ).toFixed(2)}
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col xs="6" md="6" className="mb-4">
                  <Card>
                    <Card.Body className="card-body d-flex  align-items-center justify-content-center flex-column">
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
                <Col xs="6" md="6" className="mb-4">
                  <Card>
                    <Card.Body className="card-body d-flex  align-items-center justify-content-center flex-column">
                      <p>Mi utilidad</p>
                      <p>0</p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col xs="6" md="6" className="mb-4">
                  <Card style={{ height: "8rem" }}>
                    <Card.Body className="card-body d-flex  align-items-center justify-content-center flex-column">
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
                <Col xs="6" md="6" className="mb-4">
                  <Card style={{ height: "8rem" }}>
                    <Card.Body className="card-body d-flex  align-items-center justify-content-center flex-column">
                      <p>Mi utilidad</p>
                      <p>$0</p>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>

            <Col xs="12" md="4">
              <Card className="h-100">
                <Card.Body className="d-flex justify-content-center align-items-center  flex-column h-100">
                    <p>Mi utilidad por mis lockers</p>
                  <p>
                    ${" "}
                    {(
                      paquete.licenciatarioEarnings +
                      recargasYservicios.recargasLicenciatarioEarnings +
                      recargasYservicios.serviciosLicenciatarioEarnings
                    ).toFixed(2)}
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col xs="12" md="12" className="my-4">
              <Button onClick={() => lockerSelect(true)}>Volver</Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </PanelInfoLockersWrapper>
  );
};

export default PanelInfoLockersDetalles;
