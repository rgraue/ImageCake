import React from 'react';

class CakeDisplay extends React.Component {
    render (props) {
        return (
            <div>
                {this.props.data}
            </div>
        )
    }
}

export default CakeDisplay;