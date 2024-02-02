import { Layout } from "@/components/Layout";
import { auth } from "@/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import styles from "@/styles/home.module.scss";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RestablecerPassword = () => {
  const [email, setEmail] = useState("");
  const showToast = () => {
    toast.success("Se envio un link a tú correo electrónico", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await sendPasswordResetEmail(auth, email);
    showToast();
    setEmail("");
  };
  return (
    <Layout
      pageDescription="Restablecer password - Lockers"
      pageKeywords="Lockers Dagpacket"
      title="Restablecer password- Dagpacket lockers"
    >
      <div className={styles["home"]}>
        <Card style={{ width: "25rem" }}>
          <Card.Body>
            <Card.Title>Restablecer contraseña</Card.Title>
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3" controlId="register.email">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Form.Group>
              <div className="d-flex justify-content-center">
                <Button type="submit">Registrase</Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
        <ToastContainer />
      </div>
    </Layout>
  );
};

export default RestablecerPassword;
