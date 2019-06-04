export const DEFAULT_NB_DICE = 1
export const MAX_NB_DICE = 4
export const NB_STORE_LINES = 3
export const NB_STORE_COLUMNS = 3
export const DEFAULT_START_ENERGY = 15

export interface StorePosition {
    col: number
    row: number
}

export interface Activator {
    type: ActivatorType,
    values: number[],
}

export interface JsonEffect {
    power: Power,
    amount: number
}

export interface JsonCard {
    activator: Activator,
    effects: JsonEffect[],
    type: PartType
}

export enum PartType {
    Head = 0,
    LeftArm = 1,
    RightArm = 2,
    Body = 3,
    LeftLeg = 4,
    RightLeg = 5
}

export enum Power {
    Energy = 0,
    Hit = 1,
    Rocket = 2
}

export enum ActivatorType {
    DiceValues = 0,
    MoreThan = 1,
    LessThan = 2,
    Equal = 3,
    Same = 4
}