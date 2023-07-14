// Panel.js
import React from "react";
import './App.css'

class Panel extends React.Component {
    render(){
        const panelClass = this.props.isHigh ? 'panel red-fade' : 'panel';
        return(
            <div className={panelClass} >
                <center>
                    <div className={(this.props.titleStyle === 1) ? "panel-title" :
                        (this.props.titleStyle === 2) ? "panel-title2" : null +" align-self-center"}>
                        {this.props.title}
                    </div>
                </center>
                {this.props.children}
            </div>
        )
    }
}

export default Panel;