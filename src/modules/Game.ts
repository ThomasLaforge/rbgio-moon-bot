import { Deck } from "./Deck";
import { Player } from "./Player";
import { Tools } from "./Tools";

export class Game {

    constructor(
        public players: Player[],
        public deck = new Deck(),
        public currentPlayerIndex = 0,
        shuffle = true
    ){
        shuffle && this.shufflePlayers()
    }



    shufflePlayers(){
        this.players = Tools.shuffle(this.players)
    }

    nextPlayer(){
        this.currentPlayerIndex++
        if(this.currentPlayerIndex === this.players.length){
            this.currentPlayerIndex = 0
        }
    }

    // AddCard
}