import { Paquete } from "./Paquetes";
import { ServiciosYRecargas } from "./ServiciosYRecargas";

export interface PanelDetallesLocker{
    recargasYservicios: ServiciosYRecargas,
    paquete: Paquete,
    lockerSelect: (isMain: boolean, lockerId?: string) => void
}