import React from "react";
import './App.css'

class Panel extends React.Component {

    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div className={"panel"}  style={{height: this.props.height, width: this.props.width}}>
            </div>
        )
    }
}

export default Panel