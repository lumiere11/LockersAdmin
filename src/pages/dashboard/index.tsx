"use client"
import React, { useEffect, useState } from 'react'
import { Layout } from '../components/Layout'
import { Button, Container, Modal } from 'react-bootstrap'
import styles from '@/styles/dashboard.module.scss'
import PanelInfoLockers from '../components/PanelInfoLockers';
import PanelInfoLockersDetalles from '../components/PanelInfoLockersDetalles';
import { collection, query, where, getDocs } from "firebase/firestore";
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { db } from '@/firebase'
import LoadingOverlay from '../components/LoadingOverlay'
import { getPacketsEarnings } from '@/services/PaquetesServices';
import { getServiciosRecargas } from '@/services/RecargasServiciosService';
import { DocumentData } from 'firebase/firestore';
import { LockerEarnings } from '@/types/PanelInfoLockers'
import { ServiciosYRecargas } from '@/types/ServiciosYRecargas'
import { Paquete } from '@/types/Paquetes'
import { useSelector } from 'react-redux'
import { RootState } from '../../store';

export default function Dashboard() {
    const [isMain, setIsMain] = useState(true)
    const [recargasYServiciosProps, setRecargasYServiciosProps] = useState<ServiciosYRecargas>({} as ServiciosYRecargas)
    const [earnings, setEarnings] = useState<LockerEarnings[]>([] as LockerEarnings[])
    const [loading, setLoading] = useState(true)
    const [modal, setModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [totalEarnings, setTotalEarnings] = useState<number>(0)
    const [serviciosYRecargasEarnings, setServiciosYRecargasEarnings] = useState<ServiciosYRecargas[]>([] as ServiciosYRecargas[])
    const [paquetes, setPaquetes] = useState<Paquete[]>([] as Paquete[])
    const [selectedPaquete, setSelectedPaquete] = useState<Paquete>({} as Paquete)
    const router = useRouter();
    const date = useSelector((state: RootState) => state.date);
    const session = useSession({
        required: true,
        onUnauthenticated() {
            router.push('/')
        },
    });
    useEffect(() => {

    }, [session.status])
    function getFirstAndLastDayOfMonth(monthNumber: number) {
        const year = new Date().getFullYear(); // Get the current year
        const firstDay = new Date(year, monthNumber - 1, 1); // monthNumber is 1-based (January is 1)
        const lastDay = new Date(year, monthNumber, 0);

        return { firstDay, lastDay };
    }

    const handleLockerSelect = (isMain: boolean, lockerId: string) => {
        setIsMain(isMain)
        const selectedLocker2 = serviciosYRecargasEarnings.find(item => item.lockerId === lockerId);
        if (selectedLocker2) {

            setRecargasYServiciosProps(selectedLocker2)
        }
        const selectedPaquete2 = paquetes.find(item => item.lockerId === lockerId)
        if (selectedPaquete2) {
            setSelectedPaquete(selectedPaquete2)
        }
    }
    const lockerSelect = (isMain: boolean) => {
        setIsMain(isMain)

    }
    const getLockers = async () => {
        try {
            
            const q = query(collection(db, 'users_lockers'), where('user_id', '==', session?.data?.uid)) ;
            const querySnapshot = await getDocs(q);
            const dataArray: DocumentData[] = [];
            querySnapshot.forEach((doc) => {
                const data: DocumentData = doc.data();
                dataArray.push(data);
            });
            if (!dataArray) {
                setModal(true)
                setErrorMessage('No tienes asignado ningun locker')
                return null;

            }

            return dataArray;
        } catch (error) {
            setModal(true)
            setErrorMessage('No tienes asignado ningun locker')
        }


    }

    const getPacketEarnings = async (lockerId: string) => {
        try {
            const { firstDay, lastDay } = getFirstAndLastDayOfMonth(date.month);

            const data = await getPacketsEarnings(lockerId, firstDay, lastDay);
            if (data) {
                const { totalDagpacket, totalLicenciatario } = packetLogic(data);
                return { totalDagpacket: totalDagpacket ? totalDagpacket : 0, totalLicenciatario: totalLicenciatario ? totalLicenciatario : 0 }
            } else {
                return { totalDagpacket:  0, totalLicenciatario  : 0 }

            }
        } catch (error) {
            return { totalDagpacket:  0, totalLicenciatario  : 0 }

        }
        return null;
    }
    const sumEarnings = async () => {
        try {
            const lockers = await getLockers();
            if (lockers === null || lockers === undefined) {
                throw new Error('Error al traer los lockers')
                return;
            }
            lockers.forEach(async (item) => {
                const packetsEarnings = await getPacketEarnings(item.locker_id);
                packetsEarnings ? packetsEarnings: {totalDagpacket: 0, totalLicenciatario: 0}; 
                const totalDagpacket = packetsEarnings?.totalDagpacket ? packetsEarnings?.totalDagpacket : 0; 
                const totalLicenciatario = packetsEarnings?.totalLicenciatario ? packetsEarnings?.totalLicenciatario : 0;
                setPaquetes([...paquetes, {
                    globalEarnings: totalDagpacket,
                    licenciatarioEarnings: totalLicenciatario,
                    lockerId: item.locker_id,
                    qty: lockers.length
                }])
                const recargasYServiciosEarnings = await getRecargasYServiciosEarnings(item.locker_id);


                const recargasGlobalEarnings = recargasYServiciosEarnings?.recargasGlobalEarnings ? recargasYServiciosEarnings?.recargasGlobalEarnings : 0 ;
                const recargasLicenciatarioEarnings = recargasYServiciosEarnings?.recargasLicenciatarioEarnings ? recargasYServiciosEarnings?.recargasLicenciatarioEarnings : 0 ;
                const serviciosGlobalEarnings = recargasYServiciosEarnings?.serviciosGlobalEarnings ? recargasYServiciosEarnings?.serviciosGlobalEarnings : 0;
                const serviciosLicenciatarioEarnings = recargasYServiciosEarnings?.serviciosLicenciatarioEarnings ? recargasYServiciosEarnings?.serviciosLicenciatarioEarnings : 0;
                const qty = recargasYServiciosEarnings?.qty ? recargasYServiciosEarnings?.qty : 0;
                setServiciosYRecargasEarnings([...serviciosYRecargasEarnings,
                {
                    lockerId: item.locker_id,
                    recargasGlobalEarnings,
                    recargasLicenciatarioEarnings,
                    serviciosGlobalEarnings,
                    serviciosLicenciatarioEarnings,
                    qty
                }])
                const totalEarnings2 = totalEarnings + recargasLicenciatarioEarnings + serviciosLicenciatarioEarnings + totalLicenciatario;
                setTotalEarnings(totalEarnings2);
                setEarnings([...earnings, {
                    name: 'Sin nombre',
                    lockerId: item.locker_id,
                    globalEarnings: recargasGlobalEarnings + serviciosGlobalEarnings + totalDagpacket,
                    licenciatarioEarnings: recargasLicenciatarioEarnings + serviciosLicenciatarioEarnings + totalLicenciatario
                }])

            })
        } catch (error) {
            console.log(error)
            if(error instanceof Error){

                setModal(true)
                setErrorMessage(error.message)
            }
        }
    }

    const serviciosLogic = (servicios: DocumentData[]) => {
        let globalEarnings2 = 0;
        let totalTransacctions = 0;
        servicios.map((item) => {
            globalEarnings2 += item.totalAmount;
            totalTransacctions += 1;
        })
        return { serviciosGlobalEarnings: globalEarnings2, serviciosLicenciatarioEarnings: totalTransacctions * 9 }


    }
    const recargasLogic = (recargas: DocumentData[]) => {
        let globalEarnings2 = 0;
        let lockerRecargasEarnings = 0;
        recargas.map((item) => {
            globalEarnings2 += item.totalAmount;
            lockerRecargasEarnings += item.totalAmount * .05
        })
        return { recargasGlobalEarnings: globalEarnings2, recargasLicenciatarioEarnings: lockerRecargasEarnings }
    }
    const packetLogic = (data: DocumentData[]) => {
        console.log(data)
        const totalLicenciatario = data.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.utilidadEnvioLicen;
        }, 0)

        const totalDagpacket = data.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.utilidadEnvioDagpacket
        }, 0)
        return { totalDagpacket, totalLicenciatario }
    }

    const getRecargasYServiciosEarnings = async (lockerId: string) => {
        try {
            const { firstDay, lastDay } = getFirstAndLastDayOfMonth(date.month);

            const recargasServicios = await getServiciosRecargas(lockerId, firstDay, lastDay);
            // Find the index of the object where type is "servicios"
            if (recargasServicios) {
                const serviciosIndex = recargasServicios.findIndex(item => item.type === "servicios");

                // Find the index of the object where type is "recargas"
                const recargasIndex = recargasServicios.findIndex(item => item.type === "recargas");

                const servicios = recargasServicios.slice(0, serviciosIndex);

                const { serviciosGlobalEarnings, serviciosLicenciatarioEarnings } = serviciosLogic(servicios)
                const recargas = recargasServicios.slice(serviciosIndex + 1, recargasIndex);
                const { recargasGlobalEarnings, recargasLicenciatarioEarnings } = recargasLogic(recargas)
                return {
                    serviciosGlobalEarnings,
                    serviciosLicenciatarioEarnings,
                    recargasGlobalEarnings,
                    recargasLicenciatarioEarnings,
                    qty: recargasServicios.length
                }
            } else {
                return {
                    serviciosGlobalEarnings : 0,
                    serviciosLicenciatarioEarnings : 0,
                    recargasGlobalEarnings : 0,
                    recargasLicenciatarioEarnings : 0,
                    qty:  0
                }
            }
        } catch (error) {
            if(error instanceof Error){

                setModal(true)
                setErrorMessage(error.message)
            }

            return {
                serviciosGlobalEarnings : 0,
                serviciosLicenciatarioEarnings : 0,
                recargasGlobalEarnings : 0,
                recargasLicenciatarioEarnings : 0,
                qty:  0
            }
        }
    }

    const effect = async () => {

        await sumEarnings();
        setLoading(false)
    }

    useEffect(() => {
        if (session.status === 'authenticated') {
            effect();
        }

    }, [session])
    return (
        <Layout
            pageDescription="Home - Lockers"
            pageKeywords="Lockers Dagpacket"
            title="Homer - Dagpacket lockers"
        >
            {
                loading && (
                    <LoadingOverlay />
                )
            }
            {session.status === "authenticated" ? (<Container className={`shadow min-vh-100 py-2 ${styles.dashboard}`} >
                {
                    isMain ? (

                        <PanelInfoLockers earnings={earnings} lockerSelect={handleLockerSelect} totalLockersEarnings={totalEarnings} />
                    ) : (
                        <PanelInfoLockersDetalles recargasYservicios={recargasYServiciosProps} paquete={selectedPaquete} lockerSelect={lockerSelect} />
                    )
                }
                <Modal show={modal} onHide={() => setModal(!modal)}>
                    <Modal.Body><p>{errorMessage}</p></Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setModal(!modal)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>) : (<p>Loading</p>)}
        </Layout>
    )
}

//Dashboard.requireAuth = true;