import Head from 'next/head';
import IntroControls from './components/introControls';
import CakeDisplay from './components/cakeDisplay';
import React from 'react';

class Index extends React.Component {
    constructor(props){
        super(props);
        this.state = {msg:''};
    }

    handleCallBack = async (childData) => {
        this.setState({msg:childData})
    }
    render () {
        return (
            <body>
                <h1>Image Cake</h1>
                <IntroControls createCake = {this.handleCallBack}/>
                <CakeDisplay data={this.state.msg}/>
            </body>
        )
    }
}

export default Index;