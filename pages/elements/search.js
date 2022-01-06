import React from 'react';

class Search extends React.Component {
    render () {
        return (
            <div className = 'input-group mb-3'>
                <input type='text' className='form-control' placeholder='Enter existing Origin'/>
                <div className='input-group-append'>
                    <button className='btn btn-outline-secondary' type='button'>Get Cake</button>
                </div>
            </div>
        )
    }
}

export default Search;