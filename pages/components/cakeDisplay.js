import React from 'react';
import SVG from 'react-inlinesvg';

class CakeDisplay extends React.Component {
    render (props) {
        let svg;
        let origin;
        if (this.props.data){
            svg = <SVG src={this.props.data.payload.svg}/>
            origin = <h2>This Cake&#39;s Origin: {this.props.data.payload.origin}</h2>
        }
        return (
            <div>
                {svg}
                {origin}
            </div>
        )
    }
}

export default CakeDisplay;