import { MAX_NB_DICE, DEFAULT_START_ENERGY, DEFAULT_NB_DICE } from "./defs";
import { Head, Body, LeftArm, RightArm, LeftLeg, RightLeg, Part } from "./Part";
import { PartCard } from "./Card";

export class Robot {

    constructor(
        public energy = DEFAULT_START_ENERGY,
        public nbDice = DEFAULT_NB_DICE,
        public head?: Head,
        public body?: Body,
        public leftArm?: LeftArm,
        public rightArm?: RightArm,
        public leftLeg?: LeftLeg,
        public rightLeg?: RightLeg
    )
    {}

    addDice(){
        if(this.nbDice === MAX_NB_DICE){
            throw "can't add more dice"
        }
        this.nbDice++
    }

    addPart(card: PartCard){
        const part = card.part
        if(part instanceof Head){ this.head = part }
        else if(part instanceof Body){ this.body = part }
        else if(part instanceof LeftArm){ this.leftArm = part }
        else if(part instanceof RightArm){ this.rightArm = part }
        else if(part instanceof LeftLeg){ this.leftLeg = part }
        else if(part instanceof RightLeg){ this.rightLeg = part }
        else { 
            throw "error adding part"; 
        }
    }

    getAllParts(){
        return [
            this.head,
            this.body,
            this.leftArm,
            this.rightArm,
            this.leftLeg,
            this.rightLeg
        ].filter(part => !!part) // get all parts not undefined
    }

}