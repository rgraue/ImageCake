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

    /**
     * Reveals search bar to input Origin
     */
    handleEnterOrgin = () =>{
        this.setState({showSubmit : true});
    }

    /**
     * Handles the API to retrieve new Cake.
     * {payload:{svg,origin}}
     */
    handleGenerateCake = async () => {
        let cake = await fetch('/api/cakeAPI',{
            method:'GET'
        })
        .then((res) => {
            return res.json()
        });
        this.props.createCake(cake);
    }

    handleOriginGetCallBack = async (childData) =>{

    }

    /**
     * Controls what to render on the site
     * @returns JSX to be rendered on site
     */
    render () {
        let submit;
        if (this.state.showSubmit) {
            submit =    <div className='row'>
                            <Search getOrigin = {this.handleOriginGetCallBack}/>
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