import React from 'react';
import SVG from 'react-inlinesvg';

class CakeDisplay extends React.Component {
    render (props) {
        let svg;
        if (this.props.data){
            svg = <SVG src={this.props.data}/>
        }
        return (
            <div>
                {svg}
            </div>
        )
    }
}

export default CakeDisplay;