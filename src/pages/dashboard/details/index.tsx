import { Layout } from "@/components/Layout";
import { collection, query, where, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { DocumentData } from "firebase/firestore";
import { db } from "@/firebase.prod";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { getPacketsEarnings } from "@/services/PaquetesServices";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Link from "next/link";
import { mapLockerToSucursal } from "@/utils";
import * as XLSX from "xlsx";

export default function Details() {
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [cotizaciones, setCotizaciones] = useState<DocumentData[]>();
  const router = useRouter();
  const date = useSelector((state: RootState) => state.date);

  const session = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });
  const getLockers = async () => {
    try {
      const q = query(
        collection(db, "users_lockers"),
        where("user_id", "==", session?.data?.uid)
      );
      const querySnapshot = await getDocs(q);
      const dataArray: DocumentData[] = [];
      querySnapshot.forEach((doc) => {
        const data: DocumentData = doc.data();
        dataArray.push(data);
      });
      if (dataArray.length <= 0) {
        setModal(true);
        setErrorMessage("No tienes asignado ningun locker");
        return null;
      }

      return dataArray;
    } catch (error) {
      setModal(true);
      setErrorMessage("No tienes asignado ningun locker");
    }
  };
  const effect = async () => {
    try {
      console.log(session?.data?.uid);
      const lockers = await getLockers();
      if (lockers === null || lockers === undefined) {
        throw new Error("No tienes un locker asignado");
        return;
      }

      const cotizacionesResponse = await getPacketsEarnings(
        date.dateStart,
        date.dateEnd,
        mapLockerToSucursal(lockers[0].locker_id)
      );
      console.log(lockers[0].locker_id);
      setCotizaciones(cotizacionesResponse);
    } catch (error) {
      setModal(true);
      setErrorMessage("No tienes asignado ningun locker");
    }
  };

  useEffect(() => {
    if (session.status === "authenticated") {
      effect();
    }
  }, [date, session.status]);
  const convertDate = (seconds: number, nanoseconds: number) => {
    return new Date(seconds * 1000 + nanoseconds / 1000000).toLocaleString();
  };
  const convertToExcelArray = () => {
    const excelArrayHeader = [
      "Fecha de creación",
      "Precio venta",
      "Costo",
      "Utilidad global",
      "Utilidad licenciatario",
      "Proveedor",
      "Origen",
      "Destino",
    ];
    const excelArrayBody = cotizaciones?.map((item) => {
      return [
        convertDate(item.created_at.seconds, item.created_at.seconds),
        Number(item.originalEnvioValue).toFixed(2),
        Number(item.costo).toFixed(2),
        (Number(item.originalEnvioValue) - Number(item.costo)).toFixed(2),
        ((Number(item.originalEnvioValue) - Number(item.costo)) * 0.4).toFixed(
          2
        ),
        item.rate_provider,
        "Guadalajara",
        item.city_to,
      ];
    });
    if (!excelArrayBody || excelArrayBody?.length < 0) {
      return null;
    }
    return [excelArrayHeader, ...excelArrayBody];
  };
  const handleConverToExcel = () => {
    const excelArray = convertToExcelArray();
    if (!excelArray) {
      return;
    }
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(excelArray);
    XLSX.utils.book_append_sheet(wb, ws, "Paquetes");
    XLSX.writeFile(wb, `${Date.now()}.xlsx`);
  };
  return (
    <Layout
      pageDescription="Home - Detalles"
      pageKeywords="Lockers Dagpacket"
      title="Homer - Dagpacket Detalles"
    >
      <Container className={`shadow min-vh-100 py-2`}>
        <div className="d-flex justify-content-between mb-3">
          <Link href="/dashboard" className="btn btn-success mb-2">
            Volver
          </Link>
          <Button onClick={handleConverToExcel} type="button">
            Descargar Excel
          </Button>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Fecha de creación</th>
              <th>Precio venta</th>
              <th>Costo</th>
              <th>Utilidad global</th>
              <th>Utilidad licenciatario</th>
              <th>Proveedor</th>
              <th>Origen</th>
              <th>Destino</th>
            </tr>
          </thead>
          <tbody>
            {cotizaciones?.map((item) => (
              <tr key={item.docId}>
                <td>
                  {convertDate(
                    item.created_at.seconds,
                    item.created_at.seconds
                  )}
                </td>
                <td>{Number(item.originalEnvioValue).toFixed(2)}</td>
                <td>{Number(item.costo).toFixed(2)}</td>
                <td>
                  {(
                    Number(item.originalEnvioValue) - Number(item.costo)
                  ).toFixed(2)}
                </td>
                <td>
                  {(
                    (Number(item.originalEnvioValue) - Number(item.costo)) *
                    0.4
                  ).toFixed(2)}
                </td>
                <td>{item.rate_provider}</td>
                <td>Guadalajara</td>
                <td>{item.city_to}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </Layout>
  );
}
