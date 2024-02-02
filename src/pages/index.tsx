/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth, db } from "@/firebase";
import styles from "@/styles/home.module.scss";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Layout } from "../components/Layout";
import { signIn } from "next-auth/react";
import { doc, setDoc } from "firebase/firestore";
export default function Home() {
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [name, setName] = useState("");
  const [isRegister, setIsRegister] = useState(true);

  const showNotification = (message: string) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  const showSuccessNotification = (message: string) => {
    toast.success(message, {
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
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (passwordOne === passwordTwo) {
        setName("");
        setEmail("");
        setPasswordOne("");
        setPasswordTwo("");

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          passwordOne
        );
        const user = userCredential.user;
        await setDoc(doc(db, "user2_lockers", user.uid), {
          name: name,
        });
        showSuccessNotification("Registrado exitosamente.");
        setIsRegister(false);
        //router.push('/dashboard');
      } else {
        showNotification("Las contraseñas no coinciden.");
      }
    } catch (Error) {
      showNotification("El correo ya esta en uso.");
    }
  };
  const onLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await signIn("credentials", {
        email,
        password: passwordOne,
        redirect: true,
        callbackUrl: "/dashboard",
      });
    } catch (error: any) {
      showNotification("Error al hacer login.");
    }
  };
  return (
    <Layout
      pageDescription="Home - Lockers"
      pageKeywords="Lockers Dagpacket"
      title="Homer - Dagpacket lockers"
    >
      <div className={styles.home}>
        <Card style={{ width: "25rem" }}>
          <Card.Body>
            <Card.Title>{isRegister ? "Registro" : "Ingresar"}</Card.Title>
            {isRegister ? (
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
                <Form.Group className="mb-3" controlId="register.name">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    placeholder="example"
                    onChange={(event) => setName(event.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="register.password">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="password"
                    value={passwordOne}
                    onChange={(event) => setPasswordOne(event.target.value)}
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId="register.password_confirmation"
                >
                  <Form.Label>Contraseña confirmación</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirmación de password"
                    value={passwordTwo}
                    onChange={(event) => setPasswordTwo(event.target.value)}
                  />
                </Form.Group>

                <div className="d-flex justify-content-center">
                  <Button type="submit">Registrase</Button>
                </div>
              </Form>
            ) : (
              <Form onSubmit={onLogin}>
                <Form.Group className="mb-3" controlId="register.email">
                  <Form.Label>Correo electronico</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="register.password">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Contraseña"
                    value={passwordOne}
                    onChange={(event) => setPasswordOne(event.target.value)}
                  />
                </Form.Group>
                <div className={styles.center}>
                  <Button type="submit">Ingresar</Button>
                </div>
              </Form>
            )}

            <Button
              type="submit"
              onClick={() => setIsRegister(!isRegister)}
              className={styles.button}
            >
              {isRegister ? "Ir a login" : "Ir a registrarse"}
            </Button>
          </Card.Body>
        </Card>
        <ToastContainer />
      </div>
    </Layout>
  );
}
