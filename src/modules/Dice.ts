export class Dice {
    
    constructor(
        private _value?: number
    ){
        if(!_value){
            this.roll()
        }
    }

    roll(){
        const min = 1; 
        const max = 6;  
        const random = Math.floor(Math.random() * (max - min)) + min; 

        this.value = random
    }

    get value(): number {
        return this._value as number
    }
    set value(num: number){
        this._value = num
    }
}