import React from 'react';

class Search extends React.Component {

    getOrigin () {
        
        // Callback to send data (origin) to caller (introControls.js)
        this.props.getOrigin();
    }

    render () {
        return (
            <div className = 'input-group mb-3'>
                <input type='text' className='form-control' placeholder='Enter existing Origin'/>
                <div className='input-group-append'>
                    <button className='btn btn-outline-secondary' 
                            type='button' onClick={this.getOrigin}>Get Cake</button>
                </div>
            </div>
        )
    }
}

export default Search;