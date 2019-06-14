import React, { Component } from 'react'
import * as chroma from 'chroma-js'

import { MAX_ENERGY } from '../../modules/defs';

import './style.scss'

interface EnergyBarProps {
    energy: number
    max?: number
}
interface EnergyBarState {
}

export class EnergyBar extends Component<EnergyBarProps, EnergyBarState> {

    constructor(props: EnergyBarProps) {
        super(props)
        this.state = {
        }  
    }

    renderEnergies(){
        const max = this.props.max || MAX_ENERGY
        const colors = chroma.scale(['green', 'red']).colors(max + 1);
        console.log('colors', colors)
        let energies: JSX.Element[] = []
        
        for (let i = 0; i <= max; i++) {
            const energyValue = max - i
            const color = colors[i]
            energies.push(<Energy 
                key={i} 
                value={energyValue} 
                color={color} 
                current={this.props.energy === energyValue}
            />)
        }

        return energies
    }

    render() {
        return (
            <div className='energy-bar'>
                {this.renderEnergies()}
            </div>
        )
    }
}

const Energy = (props: {value: number, color: string, current: boolean}) => {
    return <div 
        className={'energy-elt ' + (props.current ? 'energy-elt-current' : '')}
        style={{backgroundColor: props.color}}
    >
        {props.value}
    </div>;
}

export default EnergyBar