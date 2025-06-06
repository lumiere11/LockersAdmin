"use client";
import React, { useEffect, useState } from "react";
import { Layout } from "../../components/Layout";
import { Button, Container, Modal } from "react-bootstrap";
import styles from "@/styles/dashboard.module.scss";
import PanelInfoLockers from "../../components/PanelInfoLockers";
import PanelInfoLockersDetalles from "../../components/PanelInfoLockersDetalles";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { db } from "@/firebase.prod";
import LoadingOverlay from "../../components/LoadingOverlay";
import { getPacketsEarnings } from "@/services/PaquetesServices";
import { getServiciosRecargas } from "@/services/RecargasServiciosService";
import { DocumentData } from "firebase/firestore";
import { LockerEarnings } from "@/types/PanelInfoLockers";
import { ServiciosYRecargas } from "@/types/ServiciosYRecargas";
import { Paquete } from "@/types/Paquetes";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { getUbicacionLocker } from "@/services/LockerService";

export default function Dashboard() {
  const [isMain, setIsMain] = useState(true);
  const [recargasYServiciosProps, setRecargasYServiciosProps] =
    useState<ServiciosYRecargas>({} as ServiciosYRecargas);
  const [earnings, setEarnings] = useState<LockerEarnings[]>(
    [] as LockerEarnings[]
  );
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [totalEarnings, setTotalEarnings] = useState<number>(0);
  const [serviciosYRecargasEarnings, setServiciosYRecargasEarnings] = useState<
    ServiciosYRecargas[]
  >([] as ServiciosYRecargas[]);
  const [paquetes, setPaquetes] = useState<Paquete[]>([] as Paquete[]);
  const [selectedPaquete, setSelectedPaquete] = useState<Paquete>({} as Paquete);
  const router = useRouter();
  const date = useSelector((state: RootState) => state.date);
  const session = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });
  useEffect(() => {}, [session.status]);

  const handleLockerSelect = (isMain: boolean, lockerId: string) => {
    setIsMain(isMain);
    const selectedLocker2 = serviciosYRecargasEarnings.find(
      (item) => item.lockerId === lockerId
    );
 
    if (selectedLocker2) {
      setRecargasYServiciosProps(selectedLocker2);
    }
    const selectedPaquete2 = paquetes.filter(
      (item) => item.lockerId === lockerId
    );
    if (selectedPaquete2) {
      const totalGlobalEarnings = paquetes.reduce((sum, paquete) => sum + paquete.globalEarnings, 0);
      const totalLicenciatarioEarnings = paquetes.reduce((sum, paquete) => sum + paquete.licenciatarioEarnings, 0);
      const paqueteInfo : Paquete = {
        lockerId: paquetes[0].lockerId,
        qty: paquetes[0].qty,
        globalEarnings: totalGlobalEarnings,
        licenciatarioEarnings: totalLicenciatarioEarnings
      }
      setSelectedPaquete(paqueteInfo);
    }
  };
  const lockerSelect = (isMain: boolean) => {
    setIsMain(isMain);
  };
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
  const mapLockerToSucursal = (lockerId: string) =>{
    if(lockerId == '1' ||  lockerId == '4'){
      return '63hUV4X1zcNb7jboNgwIAYJi7sD2'
    }else if(lockerId == '2' ||  lockerId == '3'){
      return '3DH4KtVAhXaAEN8CFKh5zP6rdLr2';
    }
  }
  const getPacketEarnings = async (lockerId: string) => {
    try {
      const userMapped = mapLockerToSucursal(lockerId);
      const data = await getPacketsEarnings(
        date.dateStart,
        date.dateEnd,
        userMapped
      );

      if (data) {
        const { totalDagpacket, totalLicenciatario } = packetLogic(data);
        return {
          totalDagpacket: totalDagpacket ? totalDagpacket : 0,
          totalLicenciatario: totalLicenciatario ? totalLicenciatario : 0,
          packetQty: data.length
        };
      } else {
        return { totalDagpacket: 0, totalLicenciatario: 0 };
      }
    } catch (error) {
      return { totalDagpacket: 0, totalLicenciatario: 0 };
    }
    return null;
  };
  const sumEarnings = async () => {
    try {
      const lockers = await getLockers();
      if (lockers === null || lockers === undefined) {
        throw new Error("No tienes un locker asignado");
        return;
      }
      
      lockers.forEach(async (item) => {
        const packetsEarnings = await getPacketEarnings(item.locker_id);
        packetsEarnings
          ? packetsEarnings
          : { totalDagpacket: 0, totalLicenciatario: 0 };
        const totalDagpacket = packetsEarnings?.totalDagpacket
          ? packetsEarnings?.totalDagpacket
          : 0;
        const totalLicenciatario = packetsEarnings?.totalLicenciatario
          ? packetsEarnings?.totalLicenciatario
          : 0;
        setPaquetes([
          {
            globalEarnings: totalDagpacket,
            licenciatarioEarnings: totalLicenciatario,
            lockerId: item.locker_id,
            qty: packetsEarnings?.packetQty ?? 0,
          },
        ]);
        const recargasYServiciosEarnings = await getRecargasYServiciosEarnings(
          item.locker_id
        );

        const recargasGlobalEarnings =
          recargasYServiciosEarnings?.recargasGlobalEarnings
            ? recargasYServiciosEarnings?.recargasGlobalEarnings
            : 0;
        const recargasLicenciatarioEarnings =
          recargasYServiciosEarnings?.recargasLicenciatarioEarnings
            ? recargasYServiciosEarnings?.recargasLicenciatarioEarnings
            : 0;
        const serviciosGlobalEarnings =
          recargasYServiciosEarnings?.serviciosGlobalEarnings
            ? recargasYServiciosEarnings?.serviciosGlobalEarnings
            : 0;
        const serviciosLicenciatarioEarnings =
          recargasYServiciosEarnings?.serviciosLicenciatarioEarnings
            ? recargasYServiciosEarnings?.serviciosLicenciatarioEarnings
            : 0;
        const qty = recargasYServiciosEarnings?.qty
          ? recargasYServiciosEarnings?.qty
          : 0;
        setServiciosYRecargasEarnings([
          {
            lockerId: item.locker_id,
            recargasGlobalEarnings,
            recargasLicenciatarioEarnings,
            serviciosGlobalEarnings,
            serviciosLicenciatarioEarnings,
            qty,
          },
        ]);
        const totalEarnings2 =
          totalEarnings +
          recargasLicenciatarioEarnings +
          serviciosLicenciatarioEarnings +
          totalLicenciatario;
        setTotalEarnings(totalEarnings2);
        const lockerName = await getUbicacionLocker(item.locker_id);
        setEarnings([
          {
            name: lockerName?.name,
            lockerId: item.locker_id,
            globalEarnings:
              recargasGlobalEarnings + serviciosGlobalEarnings + totalDagpacket,
            licenciatarioEarnings:
              recargasLicenciatarioEarnings +
              serviciosLicenciatarioEarnings +
              totalLicenciatario,
          },
        ]);
      });
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        setModal(true);
        setErrorMessage(error.message);
      }
    }
  };

  const serviciosLogic = (servicios: DocumentData[]) => {
    let globalEarnings2 = 0;
    let totalTransacctions = 0;
    servicios.map((item) => {
      globalEarnings2 += item.totalAmount;
      totalTransacctions += 1;
    });
    return {
      serviciosGlobalEarnings: globalEarnings2,
      serviciosLicenciatarioEarnings: totalTransacctions * 9,
    };
  };
  const recargasLogic = (recargas: DocumentData[]) => {
    let globalEarnings2 = 0;
    let lockerRecargasEarnings = 0;
    recargas.map((item) => {
      globalEarnings2 += item.totalAmount;
      lockerRecargasEarnings += item.totalAmount * 0.05;
    });
    return {
      recargasGlobalEarnings: globalEarnings2,
      recargasLicenciatarioEarnings: lockerRecargasEarnings,
    };
  };
  const packetLogic = (data: DocumentData[]) => {
      const totalLicenciatario = data.reduce((accumulator, currentValue) => {
        const costo = currentValue.costo
        const originalEnvioValue =  currentValue.originalEnvioValue
        const cardFee = costo * 0.05
        const totalCostOfPackage = cardFee + costo
  
        const utility = originalEnvioValue - totalCostOfPackage;
        const utilidadLic = utility * 0.4;
  
        return accumulator + Number(utilidadLic.toFixed(2));
      }, 0);
      const totalDagpacket = data.reduce((accumulator, currentValue) => {
        const costoBruto = currentValue.costo * 0.95;
        const utilidadBruta = currentValue.shippingValue - costoBruto;
        const utilidadDag = utilidadBruta * 0.6;
        return accumulator + utilidadDag;
      }, 0);
      return { totalDagpacket, totalLicenciatario };

  };

  const getRecargasYServiciosEarnings = async (lockerId: string) => {
    try {
      const recargasServicios = await getServiciosRecargas(
        lockerId,
        date.dateStart,
        date.dateStart
      );
      // Find the index of the object where type is "servicios"
      if (recargasServicios) {
        const serviciosIndex = recargasServicios.findIndex(
          (item) => item.type === "servicios"
        );

        // Find the index of the object where type is "recargas"
        const recargasIndex = recargasServicios.findIndex(
          (item) => item.type === "recargas"
        );

        const servicios = recargasServicios.slice(0, serviciosIndex);

        const { serviciosGlobalEarnings, serviciosLicenciatarioEarnings } =
          serviciosLogic(servicios);
        const recargas = recargasServicios.slice(
          serviciosIndex + 1,
          recargasIndex
        );
        const { recargasGlobalEarnings, recargasLicenciatarioEarnings } =
          recargasLogic(recargas);
        return {
          serviciosGlobalEarnings,
          serviciosLicenciatarioEarnings,
          recargasGlobalEarnings,
          recargasLicenciatarioEarnings,
          qty: recargasServicios.length,
        };
      } else {
        return {
          serviciosGlobalEarnings: 0,
          serviciosLicenciatarioEarnings: 0,
          recargasGlobalEarnings: 0,
          recargasLicenciatarioEarnings: 0,
          qty: 0,
        };
      }
    } catch (error) {
      if (error instanceof Error) {
        setModal(true);
        setErrorMessage(error.message);
      }

      return {
        serviciosGlobalEarnings: 0,
        serviciosLicenciatarioEarnings: 0,
        recargasGlobalEarnings: 0,
        recargasLicenciatarioEarnings: 0,
        qty: 0,
      };
    }
  };
  const handleLogout = () => {
    signOut();
    router.push("/");
  };
  const effect = async () => {
    setEarnings([]);
    await sumEarnings();
    setLoading(false);
  };

  useEffect(() => {
    if (session.status === "authenticated") {      
      effect();
    }
  }, [date, session.status]);
  return (
    <Layout
      pageDescription="Home - Lockers"
      pageKeywords="Lockers Dagpacket"
      title="Homer - Dagpacket lockers"
    >
      {loading && <LoadingOverlay />}
      <div className="d-flex justify-end ">
        <Button variant="secondary" onClick={handleLogout} className="mb-3">
          Cerrar sesión
        </Button>
      </div>
      {session.status === "authenticated" ? (
        <Container className={`shadow min-vh-100 py-2 ${styles.dashboard}`}>
          {isMain ? (
            <PanelInfoLockers
              earnings={earnings}
              lockerSelect={handleLockerSelect}
              totalLockersEarnings={totalEarnings}
            />
          ) : (
            <PanelInfoLockersDetalles
              recargasYservicios={recargasYServiciosProps}
              paquete={selectedPaquete}
              lockerSelect={lockerSelect}
            />
          )}
          <Modal show={modal} onHide={() => setModal(!modal)}>
            <Modal.Body>
              <p>{errorMessage}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setModal(!modal)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      ) : (
        <p>Loading</p>
      )}
    </Layout>
  );
}

//Dashboard.requireAuth = true;
