import {Card, DiceCard, ReRollCard, AccessoryCard, PartCard} from './Card';
import { Tools } from './Tools';
import { Power, JsonCard } from './defs';
import { Part, PartFactory } from './Part';

const initialDeck = []
// more dice
Tools.newArray(12).forEach(e => initialDeck.push( new DiceCard() ))
// reroll dice
Tools.newArray(4).forEach(e => initialDeck.push( new ReRollCard() ))
// accessories
const powers = [Power.Hit, Power.Rocket]
const values: (-1 | 1)[] = [-1, 1]
powers.forEach(p => {
    values.forEach(v => {
        for (let i = 0; i < 2; i++) {
            initialDeck.push( new AccessoryCard(p, v) )            
        }
    })
})
// parts
const parts = require('../datas/cards.json').map( (cardInfos: JsonCard) => {
    const part = PartFactory.createPart(cardInfos.type, cardInfos.activator, cardInfos.effects)
    new PartCard(part)
})
initialDeck.push(...parts)

export class Deck {

    public arrayDeck: Card[];

    constructor(arrayDeck?: Card[], shuffle = true) {
        this.arrayDeck = []

        if(arrayDeck){
            this.arrayDeck = arrayDeck
        }
        else {
            shuffle && this.shuffle()
        }
    }

    // States of arrays : deck and discard

    isEmpty(){
        return this.arrayDeck.length <= 0;
    }

    getNbCards(){
        return this.arrayDeck.length;
    }

    shuffle(){
        this.arrayDeck = this.arrayDeck.sort(() => Math.random() - 0.5)
    }

    addCard(card:Card){
        this.arrayDeck.push(card);
    }

    addCardsToTheEnd(cards:Array<Card>){ 
        cards.forEach( card => {
            this.addCard(card)
        });
    }
    
    addCardOnTop(cards:Array<Card>){
        cards.forEach( card => {    
            this.arrayDeck.unshift(card)
        });
    }

    // Missing control if empty
    drawCards( nbCards:number ){
        let res: Card[] = [];
        for( let i=0; i < nbCards; i++ ){
            if(this.arrayDeck.length > 0){
                res.push( this.drawOneCard() );
            }
        }

        return res;
    }

    // Could be recursive ?
    drawOneCard(){
        let res:any = null;

        if ( !this.isEmpty() ) {
            res = this.arrayDeck[0];
            this.arrayDeck.splice( 0, 1 );
        }
        else {
          throw new Error('No more cards in this deck');
        }

        return res;
    }

    getAllCards() : Array<Card>{
        return this.arrayDeck;
    }

    getCopyOfCard(index: number){
        if(index < 0 || index > this.arrayDeck.length - 1){
            throw new Error('Try to get a card at index : ' + index + ' who doesn\'t exist in deck')
        }
        return this.arrayDeck[index]
    }

    get length(){
        return this.arrayDeck.length
    }

}