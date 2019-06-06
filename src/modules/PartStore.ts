import { Card } from "./Card";
import { StorePosition, NB_STORE_LINES, NB_STORE_COLUMNS } from "./defs";
import { Tools } from "./Tools";
import { Deck } from "./Deck";

export class PartStore {

    constructor(
        public cards: (Card | null)[][] = Tools.newArray(NB_STORE_LINES).map(line => Tools.newArray(NB_STORE_COLUMNS)),
        // First line = index 0 = free line
        // Second line = index 1 = cost 1
        // Third line = index 2 = cost 2
        public deck = new Deck()
    )
    {
        this.init()
    }

    init(){
        const cards = this.deck.drawCards(NB_STORE_LINES * NB_STORE_COLUMNS)
        if(cards.length !== NB_STORE_LINES * NB_STORE_COLUMNS){
            throw "not good number of cards to init the store";
        }
        const lines: Card[][] = []
        for (let i = 0; i < NB_STORE_LINES; i++) {
            lines[i] = cards.filter( (c, index) => index % NB_STORE_LINES === i)            
        }
        this.cards = lines
    }

    takeCard(card: Card){
        const pos = this.getPosition(card)
        console.log('pos', pos)
        this.cards[pos.row][pos.col] = null
        this.complete()
    }

    getCost(pos: StorePosition){
        const card = this.getCard(pos)
        return card ? pos.row + card.cost : 0
    }

    getCard(pos: StorePosition){
        return this.cards[pos.row][pos.col]
    }

    getPosition(card: Card){
        let i = 0
        let col = -1
        while(i < NB_STORE_LINES && this.cards[i].findIndex(c => (c as Card).isEqual(card)) === 1) {
            i++
        }

        if(i === NB_STORE_LINES) {
            throw "not found";
        }
        else {
            return { 
                col: this.cards[i].findIndex(c => (c as Card).isEqual(card)) as number, 
                row: i
            }
        }
    }

    isFull(){
        const nbCards = this.cards.reduce((nbCard, line) => nbCard + line.filter(e => e !== null).length, 0)
        const maxNbCard = NB_STORE_LINES * NB_STORE_COLUMNS
        return nbCards === maxNbCard
    }

    complete(){
        console.log('cards before complete', this.cards)
        for (let i = 0; i < NB_STORE_LINES; i++) {
            for (let j = 0; j < NB_STORE_COLUMNS; j++) {
                if(this.cards[i][j] === null){
                    for (let index = i + 1; index < NB_STORE_LINES; index++) {
                        this.cards[index - 1][j] = this.cards[index][j]
                        this.cards[index][j] = null                
                    }
                    const card = this.deck.drawOneCard()
                    this.cards[NB_STORE_LINES - 1][j] = card
                }                
            }
        }
    }
}