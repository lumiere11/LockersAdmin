import React, { ReactNode, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import styles from "@/styles/dashboard.module.scss";

interface Props {
  children: ReactNode;
}
import { useDispatch, useSelector } from "react-redux";
import { setDate } from "@/features/dateSlice";
import moment from "moment";
import { RootState } from "@/store";
import Image from "next/image";

const PanelInfoLockersWrapper: React.FC<Props> = ({ children }) => {
  const [startDate, setStartDate] = useState(
    moment().startOf("month").format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(
    moment().startOf("month").format("YYYY-MM-DD")
  );
  const dispatch = useDispatch();
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(
      setDate({
        ...{ dateStart, dateEnd }, // Keep the existing values for the other property
        [name]: value, // Update the property that matches the input name
      })
    );
  };
  const { dateStart, dateEnd } = useSelector((state: RootState) => state.date);

  return (
    <Row>
      <Col xs="2" md="3">
        <p>Historial</p>
        <div>
          <Form>
            <Form.Group controlId="dateInput">
              <Form.Label>Fecha de inicio</Form.Label>
              <Form.Control
                type="date"
                name="dateStart"
                value={dateStart}
                onChange={handleDateChange}
              />
            </Form.Group>
            <Form.Group controlId="dateInput">
              <Form.Label>Fecha de fin</Form.Label>
              <Form.Control
                type="date"
                name="dateEnd"
                value={dateEnd}
                onChange={handleDateChange}
              />
            </Form.Group>
            <div className="d-grid ">
              {/* <Button type="submit" className="d-block mt-2">
                Buscar
              </Button> */}
            </div>
          </Form>
        </div>
      </Col>
      <Col xs="9" md="9">
        <div className="d-flex  align-items-center justify-content-center">
          <Image src={"/icon.svg"} alt="logo" width={400} height={100} />
        </div>
        <p
          className={`d-flex  align-items-center justify-content-center ${styles.title}`}
        >
          Dashboard inversionistas
        </p>

        {/* <div className="d-flex justify-content-evenly">
          <p className={styles.name}>{user.name}</p>
          <p className={styles.lockers_number}>#{locker.number}</p>
        </div> */}
        <div className="d-flex justify-content-center">
          <p className={styles.period}>
            Periodo del {moment(startDate).format("DD-MM-YYYY")} al{" "}
            {moment(endDate).format("DD-MM-YYYY")}{" "}
          </p>
        </div>
        {children}
      </Col>
    </Row>
  );
};

export default PanelInfoLockersWrapper;
