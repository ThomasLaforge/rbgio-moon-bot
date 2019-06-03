import { Head } from "./Head";
import { MAX_NB_DICE, DEFAULT_START_ENERGY, DEFAULT_NB_DICE } from "./defs";

export class Robot {

    
    constructor(
        public energy = DEFAULT_START_ENERGY,
        public nbDice = DEFAULT_NB_DICE,
        public head?: Head,
        public body?: Body,
    )
    {}

    addDice(){
        if(this.nbDice === MAX_NB_DICE){
            throw "can't add more dice"
        }
        this.nbDice++
    }

    

}