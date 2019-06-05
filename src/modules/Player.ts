import { Robot } from "./Robot";
import { Dice } from "./Dice";
import { Card } from "./Card";

export class Player {

    constructor(
        public username: string,
        public robot = new Robot(),
        public diceValues: number[] = []
    ){}

    addCard(card: Card){
        this.robot.addCard(card)
    }

    rollDices(){
        let diceValues: number[] = []

        for (let i = 0; i < this.robot.nbDice; i++) {
            diceValues.push(new Dice().value)
        }
        this.diceValues = diceValues
        return this.diceValues
    }

    resetDices(){
        this.diceValues = []
    }

    dicesAreRolled(){
        return this.diceValues.length > 0
    }

    isEqual(player: Player){
        return this.username === player.username
    }

}