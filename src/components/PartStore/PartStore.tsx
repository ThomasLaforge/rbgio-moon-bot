import React, { Component } from 'react'
import { Card } from '../../modules/Card';

interface PartStoreProps {
    cards: Card[][]
} 

interface PartStoreState {
    selectedPosition?: Position
}

export default class PartStore extends Component<PartStoreProps, PartStoreState> {

    constructor(props: PartStoreProps){
        super(props)
        this.state = {

        }
    }

    onSelect = (card: Card) => {
        console.log('on select', card)
    }

    renderLines(){
        return this.props.cards.map( (line, i) => {
            <div className="line" key={i}>
                <div className="line-cost">
                    {i}
                </div>
                {line.map( (card, j) => {
                    <div className="slot" key={'slot-' + i + '-' + j}>
                        {/* <Card card={card} /> */}
                    </div>
                })}
            </div>
        })
    }
    
    render() {
        return (
            <div className='part-store'>
                {this.renderLines()}
            </div>
        )
    }
}
