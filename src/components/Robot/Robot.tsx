import React, { Component } from 'react'
import EnergyBar from '../EnergyBar/EnergyBar';

interface RobotProps {
    energy: number
} 

interface RobotState {

}

export default class Robot extends Component<RobotProps, RobotState> {


    render() {
        return (
            <div className='robot'>
                <EnergyBar energy={this.props.energy} />
            </div>
        )
    }
}
