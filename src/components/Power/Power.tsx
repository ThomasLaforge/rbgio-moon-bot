import React, { Component } from 'react'
import { Power as PowerType} from '../../modules/defs';

import './style.scss'

interface PowerProps {
    type: PowerType
} 

interface PowerState {
}

export default class Power extends Component<PowerProps, PowerState> {

    constructor(props: PowerProps){
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <div className={`power power-type-${this.props.type}`} />
        )
    }
}
