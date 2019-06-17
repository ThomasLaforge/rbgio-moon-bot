import { Part } from "./Part";
import { Power } from "./defs";

export abstract class Card {
    constructor(
        public cost: 0 | 1 = 0
    ){}

    isEqual(card: Card){
        return JSON.stringify(card) === JSON.stringify(this)
    }
}

export class PartCard extends Card {
    
    constructor(
        public part: Part
    ){
        super()
    }

}

export class DiceCard extends Card {
    
    constructor(){
        super(1)
    }
    
}

export class AccessoryCard extends Card {
    
    constructor(
        public power: Power,
        public values: -1 | 1
    ){
        super()
    }
    
}

export class ReRollCard extends Card {
    
}