import React from 'react';
import Search from '../elements/search';
import ImageCake from '../../modules/cake'

class IntroControls extends React.Component{
    constructor(props){
        super(props);
        this.handleEnterOrgin = this.handleEnterOrgin.bind(this);
        this.createCake = this.createCake.bind(this);
        this.state = {
            showSubmit : false,
            cake : ""
        };
    }

    createCake = () => {
        let svg = new ImageCake().generateCake();
        this.setState({cake:svg});
        this.props.createCake(this.state.cake);
    }

    handleEnterOrgin = () =>{
        this.setState({showSubmit : true});
    }

    render () {
        let submit;
        if (this.state.showSubmit) {
            submit =    <div className='row'>
                            <Search/>
                        </div>
        }
        return (
            <div>
                <div className='row'>
                    <div className='col'>
                        <button type='button' className='btn btn-primary btn-lg' 
                            onClick={this.createCake}>Bake New Cake</button>
                    </div>
                    <div className='col'>
                        <button type='button' className='btn btn-primary btn-lg' 
                            onClick={this.handleEnterOrgin}>Already Have Cake Origin</button>
                    </div>
                </div>
                {submit}
            </div>
        )
    }
}

export default IntroControls;