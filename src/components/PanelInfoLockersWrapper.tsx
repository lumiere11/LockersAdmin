import React, { ReactNode, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import styles from "@/styles/dashboard.module.scss";

interface Props {
  children: ReactNode;
}
import { useDispatch } from "react-redux";
import { setDate } from "@/features/dateSlice";
import moment from 'moment';

const PanelInfoLockersWrapper: React.FC<Props> = ({ children }) => {
  const [startDate, setStartDate] = useState(moment().startOf('month').format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState(moment().startOf('month').format('YYYY-MM-DD'));
  const dispatch = useDispatch();


  const handleSubmit = (e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault();
    if (startDate && endDate) {
      dispatch(
        setDate({
          dateStart: moment(startDate).format('YYYY-MM-DD HH:mm:ss'),
          dateEnd: moment(endDate).format('YYYY-MM-DD HH:mm:ss'),
        })
      );
    }
  };
  return (
    <Row>
      <Col xs="2" md="3">
        <p>Historial</p>
        <div>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="dateInput">
              <Form.Label>Fecha de inicio</Form.Label>
              <Form.Control
                type="date"
                name="start_date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                max={startDate}
            />
            </Form.Group>
            <Form.Group controlId="dateInput">
              <Form.Label>Fecha de fin</Form.Label>
              <Form.Control
                type="date"
                name="end_date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}

              />
            </Form.Group>
            <div className="d-grid ">
              <Button  type="submit" className="d-block mt-2">Buscar</Button>
            </div>
          </Form>
        </div>
      </Col>
      <Col xs="9" md="9">
        <p
          className={`d-flex  align-items-center justify-content-center ${styles.title}`}
        >
          Dashboard inversionistas VIP (Multilocker)
        </p>
        {/* <div className="d-flex justify-content-evenly">
          <p className={styles.name}>{user.name}</p>
          <p className={styles.lockers_number}>#{locker.number}</p>
        </div> */}
        <div className="d-flex justify-content-center">
          <p className={styles.period}>Periodo del {moment(startDate).format('DD-MM-YYYY')} al {moment(endDate).format('DD-MM-YYYY')} </p>
        </div>
        {children}
      </Col>
    </Row>
  );
};

export default PanelInfoLockersWrapper;
