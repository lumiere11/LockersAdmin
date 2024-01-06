import React, { useEffect, useState } from 'react'
import { Layout } from '../components/Layout'
import { Card, Col, Container, Form, Row } from 'react-bootstrap'
import styles from '@/styles/dashboard.module.scss'
import PanelInfoLockers from '../components/PanelInfoLockers';
import PanelInfoLockersDetalles from '../components/PanelInfoLockersDetalles';
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
const Dashboard = () => {
    const [lockers, setLockers] = useState<Array<Lockers>>([] as Array<Lockers>)
    const [isMain, setIsMain] = useState(true)
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
    useEffect(() => {
        generador()
    }, [])
    return (
        <Layout
            pageDescription="Home - Lockers"
            pageKeywords="Lockers Dagpacket"
            title="Homer - Dagpacket lockers"
        >
            <Container className= {`shadow min-vh-100 py-2 ${styles.dashboard}`} >
                {
                    isMain ? (

                        <PanelInfoLockers lockers={lockers} lockerSelect={handleLockerSelect} />
                    ): (
                        <PanelInfoLockersDetalles lockers={lockers} lockerSelect={handleLockerSelect} />
                    )
                }
            </Container>
        </Layout>
    )
}

export default Dashboard