import { Deck } from "./Deck";
import { Player } from "./Player";
import { Tools } from "./Tools";
import { Card } from "./Card";
import { PartStore } from "./PartStore";
import { NB_STORE_LINES, NB_STORE_COLUMNS, DiceUseDescription, ActivatorType, Power } from "./defs";

export class Game {

    constructor(
        public players: Player[],
        shuffle = true,
        public currentPlayerIndex = 0,
        public store = new PartStore(),
        public HasBought = false,
        public hasReRoll = false,        
    ){
        shuffle && this.shufflePlayers()
    }

    checkIsPlayerToPlay(player: Player){
        if(!this.players[this.currentPlayerIndex].isEqual(player)){
            throw "not this player to player";
        }
    }
    checkIsPlayerToBuy(player: Player){
        this.checkIsPlayerToPlay(player)
        if(this.HasBought){
            throw "can't buy";
        }
    }
    checkIsPlayerToRollDices(player: Player){
        this.checkIsPlayerToPlay(player)
        if(!this.HasBought || player.hasRolledDices){
            throw "can't roll dices";
        }
    }
    checkIfCanReRoll(player: Player){
        this.checkIsPlayerToPlay(player)
        if(this.hasReRoll){
            throw "already reroll";
        }
    }
    checkIfCanUseDices(player: Player){
        this.checkIsPlayerToPlay(player)
        if(!player.hasRolledDices){
            throw "roll dices before";
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
        this.HasBought = false
    }

    buyCard(player: Player, card: Card){
        this.checkIsPlayerToBuy(player)
        // consume energy
        const cost = this.store.getCost(card)
        player.robot.loseEnergy(cost)
        // add card
        this.store.takeCard(card)
        player.addCard(card)
        // update game state
        this.HasBought = true
    }

    rollDices(player: Player){
        this.checkIsPlayerToRollDices(player)
        return player.rollDices()
    }

    reRoll(player: Player, diceValuesToReRoll: number[]){
        this.checkIfCanReRoll(player)
        if(diceValuesToReRoll.length > 2){
            throw "too many dices to reroll"
        }
        this.currentPlayer.reRoll(diceValuesToReRoll)
    }

    // TODO
    getDefaultDiceUseDescriptions(): DiceUseDescription[]{
        return []
    }

    useDices(player: Player, descs: DiceUseDescription[]){
        this.checkIfCanUseDices(player)
        
        // check dices are ok
        const playerDices = player.diceValues.slice()
        const allDicesUsed = descs.reduce( (dices, desc) => dices.concat(desc.diceValues), [] as number[])
        allDicesUsed.forEach(value => {
            const i = playerDices.findIndex(d => d === value)
            if(i === -1){
                throw "dice not found on player dice collection " + value;
            }
            playerDices.splice(i, 1)
        })

        // check use conditions are ok
        descs.forEach( desc => {
            const activator = desc.part.activator
            switch (activator.type) {
                case ActivatorType.DiceValues:
                    if(!activator.values.includes(desc.diceValues[0])){
                        throw "ActivatorType.DiceValues failed";
                    }
                    break;
                case ActivatorType.Equal:
                    if(Tools.arraySum(activator.values) !== desc.diceValues[0]){
                        throw "ActivatorType.Equal failed";
                    }
                    break;
                case ActivatorType.LessThan:
                    if(Tools.arraySum(activator.values) >= desc.diceValues[0]){
                        throw "ActivatorType.LessThan failed";
                    }
                    break;
                case ActivatorType.MoreThan:
                    if(Tools.arraySum(activator.values) <= desc.diceValues[0]){
                        throw "ActivatorType.LessThan failed";
                    }
                    break;
                case ActivatorType.Same:
                    if(desc.diceValues[0] !== desc.diceValues[1]){
                        throw "ActivatorType.Same failed";
                    }
                    break;
                default:
                    throw "activator type not handled"
            }
        })

        // activate them
        descs.forEach(desc => {
            desc.part.effects.forEach(e => {
                if(e.power === Power.Energy){
                    player.robot.winEnergy(e.amount)
                }
                else if(e.power === Power.Hit){
                    const accessories = player.robot.accessories
                    const accessoriesBonus = accessories.filter(a => a.power === Power.Hit && a.values === 1).length
                    const opponent = desc.player as Player
                    const opponentsAccessories = opponent.robot.accessories
                    const opponentDefense = opponentsAccessories.filter(a => a.power === Power.Hit && a.values === -1).length
                    const amount = e.amount + accessoriesBonus - opponentDefense
                    if(amount > 0){
                        opponent.robot.loseEnergy(amount)
                    }
                }
                else if(e.power === Power.Rocket){
                    const accessories = player.robot.accessories
                    const accessoriesBonus = accessories.filter(a => a.power === Power.Rocket && a.values === 1).length
                    const opponent = desc.player as Player
                    const opponentsAccessories = opponent.robot.accessories
                    const opponentDefense = opponentsAccessories.filter(a => a.power === Power.Rocket && a.values === -1).length
                    const amount = e.amount + accessoriesBonus - opponentDefense
                    if(amount > 0){
                        opponent.robot.loseEnergy(amount)
                    }
                }
            })
        })

        this.nextPlayer()
        
    }

    isGameOver(){
        const alivePlayers = this.players.filter(p => p.robot.isAlive())
        const nbAlivePlayers = alivePlayers.length
        return nbAlivePlayers > 1
    }

    get currentPlayer(){
        return this.players[this.currentPlayerIndex]
    }
}