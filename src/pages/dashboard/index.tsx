"use client"
import React, { useEffect, useState } from 'react'
import { Layout } from '../components/Layout'
import { Card, Col, Container, Form, Row } from 'react-bootstrap'
import styles from '@/styles/dashboard.module.scss'
import PanelInfoLockers from '../components/PanelInfoLockers';
import PanelInfoLockersDetalles from '../components/PanelInfoLockersDetalles';
import { collection, query, where, getDocs, DocumentData } from "firebase/firestore";
import { useRouter } from 'next/router'
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react'
import { app, db } from '@/firebase'

const meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril',
    'Mayo', 'Junio', 'Julio', 'Agosto',
    'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];
interface Lockers {

    nombre: string;
    gananciaGlobal: number;
    gananciaTotal: number;

}
export default function Dashboard () {
    const [lockers, setLockers] = useState<Array<Lockers>>([] as Array<Lockers>)
    const [isMain, setIsMain] = useState(true)
    const router = useRouter();
    const session = useSession({
        required: true,
        onUnauthenticated() {
          redirect('/');
        },
      });
    console.log(session);
    const generador = () => {
        function generarNombre() {
            const prefijo = "Calle ";
            const numeroAleatorio = Math.floor(Math.random() * 1000);
            return `${prefijo} ${numeroAleatorio}`;
        }

        // Función para generar un número entero aleatorio menor a 1000
        function generarNumeroAleatorio() {
            return Math.floor(Math.random() * 1000);
        }

        // Crear un array de objetos con datos aleatorios
        const arrayDeObjetos = [];

        for (let i = 0; i < 3; i++) {  // Puedes ajustar el número de objetos en el array (en este caso, 5)
            const objeto = {
                nombre: generarNombre(),
                gananciaGlobal: generarNumeroAleatorio(),
                gananciaTotal: generarNumeroAleatorio()
            };

            arrayDeObjetos.push(objeto);
        }
        setLockers(arrayDeObjetos);
    }
    const handleLockerSelect = (isMain: boolean) => {
        setIsMain(isMain)
    }
    const getLocker = async () => {
        const q = query(collection(db, 'users_lockers'), where('user_id', '==', "3"));
        const querySnapshot = await getDocs(q);
        const dataArray: DocumentData[] = [];
        querySnapshot.forEach((doc) => {
            const data: DocumentData = doc.data();
            dataArray.push(data);
        });
        if(!dataArray[0]?.locker_id){
            return null;
        }

        return dataArray[0].locker_id;

    }
    const getSumOfCosts = async (): Promise<number> => {
        try {
            const lockerId = await getLocker();
            if(lockerId === null){
                alert('No se ha asignado un locker')
            }

            const q = query(collection(db, 'cotizaciones'), where('lockerId', '==', lockerId));

            const querySnapshot = await getDocs(q);
            let totalCost = 0;

            querySnapshot.forEach((doc) => {
                const data: DocumentData = doc.data();
                if (data.costo && typeof data.costo === 'number') {
                    totalCost += data.costo;
                }
            });

            console.log('Total Cost:', totalCost);
            return totalCost;
        } catch (error) {
            console.error('Error getting documents:', error);
            return 0;
        }
    };



    useEffect(() => {
        getLocker();
        getSumOfCosts();
        generador()
    }, [])
    return (
        <Layout
            pageDescription="Home - Lockers"
            pageKeywords="Lockers Dagpacket"
            title="Homer - Dagpacket lockers"
        >
                <Container className={`shadow min-vh-100 py-2 ${styles.dashboard}`} >
                <div className=''>{session?.data?.user?.email }</div>

                    {
                        isMain ? (

                            <PanelInfoLockers lockers={lockers} lockerSelect={handleLockerSelect} />
                        ) : (
                            <PanelInfoLockersDetalles lockers={lockers} lockerSelect={handleLockerSelect} />
                        )
                    }
                </Container>
        </Layout>
    )
}

//Dashboard.requireAuth = true;