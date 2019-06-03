import { Deck } from "./Deck";
import { Player } from "./Player";

export class Game {

    constructor(
        public players: Player[],
        public deck = new Deck()
    ){}


}