import React from'react';

class Banner extends React.Component{
    render () {
        return (
            <div style = {{
                backgroundColor : "#E1D7D5",
                width : "100%",
                height : "20em",
                textAlign : 'center',
                paddingTop : "5em"
            }}>
                <h1 className='display-1' style={{
                    
                }}>Image Cake</h1>
            </div>
        )
    }
}

export default Banner;