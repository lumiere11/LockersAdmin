import { db } from "@/firebase";
import { DocumentData, collection, getDocs, query, where } from "firebase/firestore";

export const getServiciosRecargas = async (lockerId: string,  firstDay: string, lastDay: string) => {
    const q = query(
        collection(db, 'servicioRecarga'),
        where('lockerId', '==', lockerId),
        where('status', '==', "PAGADO"),
        where('created_at', '>=', firstDay),
        where('created_at', '<=', lastDay)
    );
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