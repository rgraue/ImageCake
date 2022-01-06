import React from 'react';
import Button from '../elements/button';
import Search from '../elements/search';

class IntroControls extends React.Component{
    render () {
        return (
            <div>
                <div className='row'>
                    <div className='col'>
                        <Button text={'Create new Cake'}/>
                    </div>
                    <div className='col'>
                        <Button text={'Already have Cake Origin'} />
                    </div>
                </div>
                <div className='row'>
                    <Search/>
                </div>
            </div>
        )
    }
}

export default IntroControls;