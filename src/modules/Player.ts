import { Robot } from "./Robot";
import { Dice } from "./Dice";

export class Player {

    constructor(
        public username: string,
        public robot = new Robot(),
        public diceValues: number[] = []
    ){}

    rollDices(){
        let diceValues: number[] = []

        for (let i = 0; i < this.robot.nbDice; i++) {
            diceValues.push(new Dice().value)
        }
        this.diceValues = diceValues
    }

    resetDices(){
        this.diceValues = []
    }

    dicesAreRolled(){
        return this.diceValues.length > 0
    }

}