import React, { Component } from 'react'

import { Card as CardModel } from '../modules/Card'

interface Cardrops {
    card: CardModel
} 

interface CardState {

}

export default class Card extends Component<Cardrops, CardState> {

    constructor(props: Cardrops){
        super(props)
        this.state = {

        }
    }

    render() {
        const {card} = this.props
        return (
            <div className='card'>
                {card.cost === 1 && 
                    <div className="card-cost">cost 1</div>
                }
                {this.render}
            </div>
        )
    }
}
