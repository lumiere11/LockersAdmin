/* eslint-disable no-unused-vars */
import { Locker } from "./Locker"

export interface PanelInfoLockers{
    lockers: Array<Locker>
    lockerSelect: (isMain: boolean, lockerId: string) => void
}