import { Game } from "../modules/Game";
import { Tools } from "../modules/Tools";
import { Player } from "../modules/Player";
import { Card } from "../modules/Card";

it('store', () => {
    const players = Tools.newArray(2).map( (e: any, i: number) => new Player(i.toString()))
    let game = new Game(players)
    console.log('init', game.store.cards)
    const card = game.store.cards[0][0] as Card
    game.buyCard(game.players[0], card)
    console.log('store', game.store.cards)
    expect(game.store.isFull()).toBe(true);
});