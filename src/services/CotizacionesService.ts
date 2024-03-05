import { db } from "@/firebase.prod";
import { DocumentData, collection, getDocs, query, where } from "firebase/firestore";

export const getCotizaciones = async(lockerId: string) => {

    const q = query(collection(db, 'cotizaciones'), where('lockerId', '==', lockerId));


    const querySnapshot = await getDocs(q);
    let totalCost = 0;

    querySnapshot.forEach((doc) => {
        const data: DocumentData = doc.data();
        if (data.costo && typeof data.costo === 'number') {
            totalCost += data.costo;
        }
    });
    return totalCost;
}   


