import { MAX_NB_DICE, DEFAULT_START_ENERGY, DEFAULT_NB_DICE, NB_ACCESSORIES_SLOTS, MAX_ENERGY } from "./defs";
import { Head, Body, LeftArm, RightArm, LeftLeg, RightLeg, Part } from "./Part";
import { PartCard, AccessoryCard, Card, ReRollCard, DiceCard } from "./Card";

export class Robot {

    constructor(
        public energy = DEFAULT_START_ENERGY,
        public nbDice = DEFAULT_NB_DICE,
        public head?: Head,
        public body?: Body,
        public leftArm?: LeftArm,
        public rightArm?: RightArm,
        public leftLeg?: LeftLeg,
        public rightLeg?: RightLeg,
        public accessories: AccessoryCard[] = [],
        public canReRoll = false
    )
    {}

    winEnergy(amount: number){
        this.energy += amount
        if(this.energy > MAX_ENERGY){
            this.energy = MAX_ENERGY
        }
    }
    loseEnergy(amount: number){
        this.energy -= amount
    }
    
    addCard(card: Card){
        if(card instanceof PartCard){
            this.addPart(card.part)
        }
        else if(card instanceof AccessoryCard){
            this.addAccessory(card)
        }
        else if(card instanceof ReRollCard){
            this.addReRollCard()
        }
        else if(card instanceof DiceCard){
            this.addDice()
        }
    }
        
    addDice(){
        if(this.nbDice === MAX_NB_DICE){
            throw "can't add more dice"
        }
        this.nbDice++
    }

    addAccessory(card: AccessoryCard){
        if(this.accessories.length < NB_ACCESSORIES_SLOTS){
            this.accessories.push(card)
        }
        else {
            throw "no more free accessories slots";
        }
    }

    addReRollCard(){
        if(!this.canReRoll){
            this.canReRoll = true
        }
        else {
            throw "already have reroll capacity";   
        }
    }

    addPart(part: Part){
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

    isAlive(){
        return this.energy > 0
    }
    isDead(){
        return !this.isAlive()
    }

}