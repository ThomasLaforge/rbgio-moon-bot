import React, { Component } from 'react'

interface RobotProps {
    energy: number
} 

interface RobotState {

}

export default class Robot extends Component<RobotProps, RobotState> {


    render() {
        return (
            <div className='robot'>
                <div className="energy">
                    {this.props.energy}
                </div>
            </div>
        )
    }
}
