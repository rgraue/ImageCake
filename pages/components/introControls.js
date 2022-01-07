import React from 'react';
import Search from '../elements/search';
import ImageCake from '../api/cakeAPI'

class IntroControls extends React.Component{
    constructor(props){
        super(props);
        this.handleEnterOrgin = this.handleEnterOrgin.bind(this);
        this.handleGenerateCake = this.handleGenerateCake.bind(this);
        this.state = {
            showSubmit : false,
            cake : ""
        };
    }

    handleEnterOrgin = () =>{
        this.setState({showSubmit : true});
    }

    handleGenerateCake = async () => {
        let cake = await fetch('http://localhost:3000/api/cakeAPI')
        .then((res) => {
            return res.json()
        });
        this.props.createCake(cake.payload);
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
                            onClick={this.handleGenerateCake}>Bake New Cake</button>
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