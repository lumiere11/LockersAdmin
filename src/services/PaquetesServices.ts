import { db } from "@/firebase";
import { DocumentData, collection, getDocs, query, where } from "firebase/firestore";

export const getPacketsEarnings = async(lockerId: string, firstDay:Date, lastDay:Date) =>{
    const q = query(
        collection(db, 'cotizaciones'), 
        where('lockerId', '==', lockerId),
        where('state', '==', "PAGADO"),
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
        return [];
    }

    return dataArray;
}