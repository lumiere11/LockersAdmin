/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth, db } from "@/firebase.prod";
import styles from "@/styles/home.module.scss";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Layout } from "../components/Layout";
import { signIn } from "next-auth/react";
import { doc, setDoc } from "firebase/firestore";
import Link from "next/link";
import Image from "next/image";
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

      </div>
    </Layout>
  );
}
