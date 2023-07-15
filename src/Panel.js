// Panel.js
import React from "react";
import './App.css'

class Panel extends React.Component {
    render(){
        const fadeClass = this.props.isHigh ? "red-fade" : "";
        return(
            <div className={'panel'} >
                <center>
                    <div className={((this.props.titleStyle === 1) ? "panel-title" :
                        (this.props.titleStyle === 2) ? "panel-title2" : null) +" align-self-center "+ fadeClass}>
                        {this.props.title}
                    </div>
                </center>
                {this.props.children}
            </div>
        )
    }
}

export default Panel;