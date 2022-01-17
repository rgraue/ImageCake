import React from 'react';

class Search extends React.Component {

    constructor (props){
        super(props);
        this.getOrigin = this.getOrigin.bind(this);
        this.updateOrigin = this.updateOrigin.bind(this);
        this.state = {
            origin:''
        };
    }

    getOrigin = () => {
        // Callback to send data (origin) to caller (introControls.js)
        this.props.cakeOrigin(this.state.origin);
    }

    updateOrigin = (event) => {
        const val = event.target.value;
        this.setState({origin:val});
    }

    render () {
        return (
            <div className = 'input-group mb-3'>
                <input type='text' value={this.state.origin}  onChange={evt => this.updateOrigin(evt)} className='form-control' placeholder='Enter existing Origin'/>
                <div className='input-group-append'>
                    <button className='btn btn-outline-secondary' 
                            type='button' onClick={this.getOrigin}>Get Cake</button>
                </div>
            </div>
        )
    }
}

export default Search;