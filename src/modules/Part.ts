import { PartType, Activator, ActivatorType, JsonEffect } from "./defs";
import { Dice } from "./Dice";

export abstract class Part {
    
    constructor(
        public activator: Activator,
        public effects: JsonEffect[]
    ){}

    isActivable(dices: Dice[]){
        let activable = false

        switch (this.activator.type) {
            case ActivatorType.DiceValues:
                if(dices.length !== 1){
                    throw Error("not good nb dice")   
                }
                else {
                    activable = this.activator.values.includes(dices[0].value)
                }
                break;
            case ActivatorType.MoreThan:
                if(dices.length !== 2){
                    throw Error("not good nb dice")
                }
                else {
                    const sum =dices.reduce((sum, d) => sum + d.value, 0)
                    activable = sum > this.activator.values[0]
                }
                break;
            case ActivatorType.LessThan:
                if(dices.length !== 2){
                    throw Error("not good nb dice")
                }
                else {
                    const sum =dices.reduce((sum, d) => sum + d.value, 0)
                    activable = sum < this.activator.values[0]
                }
                break;
            case ActivatorType.Equal:
                if(dices.length !== 2){
                    throw Error("not good nb dice")
                }
                else {
                    const sum =dices.reduce((sum, d) => sum + d.value, 0)
                    activable = sum === this.activator.values[0]
                }
                break;
            case ActivatorType.Same:
                if(dices.length !== 2){
                    throw Error("not good nb dice")
                }
                else {
                    activable = dices[0].value === dices[1].value
                }
                break;
            default:
                throw Error("Activator type not handled")
        }

        return activable
    }
}

export class Body extends Part {}
export class Head extends Part {}
export class LeftArm extends Part {}
export class RightArm extends Part {}
export class LeftLeg extends Part {}
export class RightLeg extends Part {}

export class PartFactory {
    public static createPart(type: PartType, activator: Activator, effects: JsonEffect[]) {
        switch (type) {
            case PartType.Body:     return new Body(activator, effects)
            case PartType.Head:     return new Head(activator, effects)
            case PartType.LeftArm:  return new LeftArm(activator, effects)
            case PartType.RightArm: return new RightArm(activator, effects)
            case PartType.LeftLeg:  return new LeftLeg(activator, effects)
            case PartType.RightLeg: return new RightLeg(activator, effects)
            default:
                throw Error("can't create part of this type " + type)
        }
    }
}