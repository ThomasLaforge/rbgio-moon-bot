import { Card } from "./Card";
import { StorePosition, NB_STORE_LINES, NB_STORE_COLUMNS } from "./defs";

export class PartStore {

    constructor(
        public cards: Card[][]
    )
    {}

    getCost(pos: StorePosition){
        return pos.row + this.getCard(pos).cost
    }

    getCard(pos: StorePosition){
        return this.cards[pos.row][pos.col]
    }

    isFull(){
        const nbCards = this.cards.reduce((nbCard, line) => nbCard + line.length, 0)
        const maxNbCard = NB_STORE_LINES * NB_STORE_COLUMNS
        return nbCards === maxNbCard
    }
}