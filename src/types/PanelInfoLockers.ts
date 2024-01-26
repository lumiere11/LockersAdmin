/* eslint-disable no-unused-vars */

export interface PanelInfoLockers{
    earnings: LockerEarnings[],
    lockerSelect: (isMain: boolean, lockerId: string) => void
    totalLockersEarnings: number
}

export interface LockerEarnings {
    name: string,
    globalEarnings: number,
    licenciatarioEarnings: number,
    lockerId: string,
}