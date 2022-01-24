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
                origin = <p>This Cake&#39;s Origin: <strong>{this.props.data.payload.origin}</strong></p>
            }
        }
        return (
            <div style={{
                padding : "1em"
            }}>
                <div className='row justify-content-lg-center'>
                    <div className='col col-lg-4'>
                        {svg}
                    </div>
                </div>
                <div className='row justify-content-lg-center'>
                    <div className='col col-lg-6'>
                        {origin}
                    </div>
                </div>
            </div>
            
        )
    }
}

export default CakeDisplay;