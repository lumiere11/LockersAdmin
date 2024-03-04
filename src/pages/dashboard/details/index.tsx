import { Layout } from "@/components/Layout";
import { collection, query, where, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { DocumentData } from "firebase/firestore";
import { db } from "@/firebase";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { getPacketsEarnings } from "@/services/PaquetesServices";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Link from "next/link";

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
      console.log(session?.data?.uid);
      const cotizacionesResponse = await getPacketsEarnings(
        date.dateStart,
        date.dateEnd,
        session?.data?.uid
      );
      console.log(cotizacionesResponse);
      setCotizaciones(cotizacionesResponse);
    } catch (error) {
      setModal(true);
      setErrorMessage("No tienes asignado ningun locker");
    }
  };
  useEffect(() => {
    getLockers();
  }, []);
  useEffect(() => {
    if (session.status === "authenticated") {
      getLockers();
    }
  }, [date, session.status]);
  return (
    <Layout
      pageDescription="Home - Detalles"
      pageKeywords="Lockers Dagpacket"
      title="Homer - Dagpacket Detalles"
    >
      <Container className={`shadow min-vh-100 py-2`}>
        <Link href="/dashboard" className="btn btn-success mb-2">
          Volver
        </Link>
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
                <td>{item.created_at}</td>
                <td>{item.originalEnvioValue}</td>
                <td>{item.costo}</td>
                <td>{Number(item.originalEnvioValue) - Number(item.costo)}</td>
                <td>
                  {(Number(item.originalEnvioValue) - Number(item.costo)) * 0.4}
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
