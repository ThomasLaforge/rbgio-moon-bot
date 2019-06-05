import { Game } from "../modules/Game";
import { Tools } from "../modules/Tools";
import { Player } from "../modules/Player";

it('store', () => {
    const players = Tools.newArray(2).map( (e: any, i: number) => new Player(i.toString()))
    let game = new Game(players)
    console.log('init', game.store.cards)
    game.playCard(game.players[0], game.store.cards[0][0])
    expect(game.store.isFull()).toBe(true);
});