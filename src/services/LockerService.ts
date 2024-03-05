import { db } from "@/firebase.prod";
import { collection, getDocs, limit, query, where } from "firebase/firestore";

export const getUbicacionLocker = async(lockerId :string ) => {
    const ubicacion = query(
        collection(db, 'ubicacion_locker'),
        where('locker_id', '==', lockerId),
        limit(1) // Limit the query to only retrieve the first document
    );

    const querySnapshot2 = await getDocs(ubicacion);
    const lockerData = !querySnapshot2.empty ? querySnapshot2.docs[0].data() : null;
    return lockerData;

}