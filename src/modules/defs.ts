export const DEFAULT_NB_DICE = 1
export const MAX_NB_DICE = 4
export const NB_STORE_LINES = 3
export const NB_STORE_COLUMNS = 3
export const DEFAULT_START_ENERGY = 15

export interface StorePosition {
    col: number
    row: number
}

export enum Power {
    Energy,
    Hit,
    Shoot
}

export interface JsonCard {
    diceValues: number[],
    effect: 
}