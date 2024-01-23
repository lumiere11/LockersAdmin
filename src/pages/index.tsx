import { auth } from "@/firebase";
import styles from "@/styles/home.module.scss";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Layout } from "./components/Layout";
import { signIn } from "next-auth/react";
export default function Home() {
    const [email, setEmail] = useState("");
    const [passwordOne, setPasswordOne] = useState("");
    const [passwordTwo, setPasswordTwo] = useState("");
    const router = useRouter();
    const [error, setError] = useState("");
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

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        // event.preventDefault();
        // if (passwordOne === passwordTwo) {
        //     await createUserWithEmailAndPassword(auth, email, passwordOne);
        //     router.push('/dashboard');
        // } else {
        //     showNotification("Las contraseñas no coinciden.");
        // }
    };
    const onLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await signIn('credentials', {email, password : passwordOne, redirect: true, callbackUrl: '/dashboard'})
        } catch (error: any) {
            console.log(error);
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
                <Card style={{ width: "18rem" }}>
                    <Card.Body>
                        <Card.Title>Autenticación</Card.Title>
                        {isRegister ? (
                            <Form onSubmit={onSubmit}>
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
                                        value={passwordOne}
                                        onChange={(event) => setPasswordOne(event.target.value)}
                                    />
                                </Form.Group>
                                <div className={styles.center}>
                                    <Button type="submit" >Ingresar</Button>
                                </div>
                            </Form>
                        )}

                        <Button
                            type="submit"
                            onClick={() => setIsRegister(!isRegister)}
                            className={styles.button}
                        >
                            {
                                isRegister ? ('Ir a Login') : ('Ir aRegistrarse')
                            }
                        </Button>
                    </Card.Body>
                </Card>
                <ToastContainer />
            </div>
        </Layout>
    );
}
