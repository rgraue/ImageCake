import React from 'react';
import SVG from 'react-inlinesvg';

class CakeDisplay extends React.Component {
    render (props) {
        let svg;
        let origin;
        if (this.props.data){
            if (this.props.data.payload.error){
                svg = <p>{this.props.data.payload.error}</p>
            } else {
                svg = <SVG src={this.props.data.payload.svg}/>
                origin = <h2>This Cake&#39;s Origin: {this.props.data.payload.origin}</h2>
            }
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