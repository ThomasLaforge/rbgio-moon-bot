import { Card } from "./Card";
import { StorePosition, NB_STORE_LINES, NB_STORE_COLUMNS } from "./defs";
import { Tools } from "./Tools";

export class PartStore {

    constructor(
        public cards: Card[][] = Tools.newArray(NB_STORE_LINES, [])
    )
    {}

    init(cards: Card[]){
        if(cards.length !== NB_STORE_LINES * NB_STORE_COLUMNS){
            throw "not good number of cards to init the store";
        }
        const lines: Card[][] = []
        for (let i = 0; i < NB_STORE_LINES; i++) {
            lines[i] = cards.filter( (c, index) => index % NB_STORE_LINES === i)            
        }
        this.cards = lines
    }

    useCard(card: Card){
        const pos = this.getPosition(card)
        this.complete()
    }

    getCost(pos: StorePosition){
        return pos.row + this.getCard(pos).cost
    }

    getCard(pos: StorePosition){
        return this.cards[pos.row][pos.col]
    }

    getPosition(card: Card){
        let i = 0
        let col
        while(i < NB_STORE_LINES && !col) {
            col = this.cards[i].findIndex(c => c.isEqual(card))
            i++
        }

        if(i === NB_STORE_LINES) {
            throw "not found";
        }
        else {
            return { col, row: i}
        }
    }

    isFull(){
        const nbCards = this.cards.reduce((nbCard, line) => nbCard + line.length, 0)
        const maxNbCard = NB_STORE_LINES * NB_STORE_COLUMNS
        return nbCards === maxNbCard
    }

    complete(){

    }
}