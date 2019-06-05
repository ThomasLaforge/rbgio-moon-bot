import { Deck } from "./Deck";
import { Player } from "./Player";
import { Tools } from "./Tools";
import { Card } from "./Card";
import { PartStore } from "./PartStore";
import { NB_STORE_LINES, NB_STORE_COLUMNS } from "./defs";

export class Game {

    constructor(
        public players: Player[],
        shuffle = true,
        public deck = new Deck(),
        public currentPlayerIndex = 0,
        public store = new PartStore()
    ){
        shuffle && this.shufflePlayers()
        const cards = this.deck.drawCards(NB_STORE_LINES * NB_STORE_COLUMNS)
        this.store.init(cards)
    }

    checkIsPlayerToPlay(player: Player){
        if(!this.players[this.currentPlayerIndex].isEqual(player)){
            throw "not this player to player";
        }
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

    addCard(player: Player, card: Card){
        this.checkIsPlayerToPlay(player)
        player.addCard(card)
    }

    rollDices(player: Player){
        this.checkIsPlayerToPlay(player)
        return player.rollDices()
    }

    isGameOver(){
        const alivePlayers = this.players.filter(p => p.robot.isAlive())
        const nbAlivePlayers = alivePlayers.length
        return nbAlivePlayers > 1
    }

}