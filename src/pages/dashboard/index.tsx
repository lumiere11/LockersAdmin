"use client"
import React, { useEffect, useState } from 'react'
import { Layout } from '../components/Layout'
import { Container } from 'react-bootstrap'
import styles from '@/styles/dashboard.module.scss'
import PanelInfoLockers from '../components/PanelInfoLockers';
import PanelInfoLockersDetalles from '../components/PanelInfoLockersDetalles';
import { collection, query, where, getDocs, DocumentData, doc, getDoc } from "firebase/firestore";
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { db } from '@/firebase'
import { useDispatch } from 'react-redux'
import { setUser } from '@/features/userSlice'
import { setLocker } from '@/features/lockerSlice'
import { getCotizaciones } from '@/services/CotizacionesService'
import { getUbicacionLocker } from '@/services/LockerService'

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
export default function Dashboard() {
    const [lockers, setLockers] = useState<Array<Lockers>>([] as Array<Lockers>)
    const [isMain, setIsMain] = useState(true)
    const router = useRouter();
    const dispatch = useDispatch();

    const session = useSession({
        required: true,
        onUnauthenticated() {
            router.push('/')
        },
    });
    useEffect(() => {

    }, [session.status])
    const handleLockerSelect = (isMain: boolean) => {
        setIsMain(isMain)
    }
    const getLocker = async () => {
        const q = query(collection(db, 'users_lockers'), where('user_id', '==', session.data.uid));
        const querySnapshot = await getDocs(q);
        const dataArray: DocumentData[] = [];
        querySnapshot.forEach((doc) => {
            const data: DocumentData = doc.data();
            dataArray.push(data);
        });
        if (!dataArray) {
            return null;
        }

        return dataArray;

    }
    console.log(session)
    const getUserData = async() => {
        const userRef = doc(db, "user2_lockers", session?.data?.uid);
        const docSnap = await getDoc(userRef);
        const userName = docSnap.exists() ? docSnap.data().name : "Sin Nombre"
        return userName;
    }
    const getSumOfCosts = async (): Promise<void> => {
        try {
            const lockersData = await getLocker();
            if (lockersData === null) {
                console.log('modal')
            }
            let lockerTotalEarnings = 0;
            lockersData?.forEach(async (item) => {
                const totalCost = await getCotizaciones(item.locker_id);
                
                const globalEarnings = parseFloat(totalCost.toFixed(2));
                const total = globalEarnings * .40
                lockerTotalEarnings += parseFloat(total.toFixed());
                const lockerData = await getUbicacionLocker(item.locker_id);
                const lockerObkj = {
                    nombre: lockerData?.name ? lockerData?.name  : 'Sin nombre',
                    gananciaGlobal: globalEarnings,
                    gananciaTotal: parseFloat(total.toFixed())
                }
                setLockers([...lockers, lockerObkj]);
            })
            dispatch(setUser({
                uid: session?.data?.uid, 
                name: await getUserData()
            }))
            dispatch(setLocker({
                number: lockersData?.length ? lockersData.length : 0,
                total: lockerTotalEarnings
            }))
        } catch (error) {
            console.error('Error getting documents:', error);
        }
    };



    useEffect(() => {
        if(session.status === 'authenticated'){

            getLocker();
            getSumOfCosts();
        }

    }, [session])
    return (
        <Layout
            pageDescription="Home - Lockers"
            pageKeywords="Lockers Dagpacket"
            title="Homer - Dagpacket lockers"
        >
            {session.status === "authenticated" ? (<Container className={`shadow min-vh-100 py-2 ${styles.dashboard}`} >
                {
                    isMain ? (

                        <PanelInfoLockers lockers={lockers} lockerSelect={handleLockerSelect} />
                    ) : (
                        <PanelInfoLockersDetalles lockers={lockers} lockerSelect={handleLockerSelect} />
                    )
                }
            </Container>) : (<p>Loading</p>)}
        </Layout>
    )
}

//Dashboard.requireAuth = true;