import React from 'react'

class Button extends React.Component{
    render () {
        return (
            <button type='button' className='btn btn-primary btn-lg'>{this.props.text}</button>
        )
    }
}

export default Button;