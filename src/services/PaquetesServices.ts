import { db } from "@/firebase";
import {
  DocumentData,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export const getPacketsEarnings = async (
  firstDay: string,
  lastDay: string,
  userId = ''
) => {
  const q = query(
    collection(db, "cotizaciones"),
    where("hostUser_id", '==', userId),
    where("state", "==", "PAGADO"),
    where("created_at", ">=", new Date(firstDay)),
    where("created_at", "<=", new Date(lastDay))
  );
  console.log(firstDay)
  
  const querySnapshot = await getDocs(q);
  const dataArray: DocumentData[] = [];
  querySnapshot.forEach((doc) => {
    const data: DocumentData = doc.data();
    dataArray.push(data);
  });
  console.log(dataArray)
  if (!dataArray) {
    return [];
  }

  return dataArray;
};
