import { Part } from "./Part";
import { Power, CardType } from "./defs";

export abstract class Card {
    constructor(
        public type: CardType,
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
        super(CardType.Part)
    }

}

export class DiceCard extends Card {
    
    constructor(){
        super(CardType.Dice, 1)
    }
    
}

export class AccessoryCard extends Card {
    
    constructor(
        public power: Power,
        public values: -1 | 1
    ){
        super(CardType.Accessory)
    }
    
}

export class ReRollCard extends Card {
    
    constructor(){
        super(CardType.ReRoll)
    }

}