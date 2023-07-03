import React from 'react'
import Panel from "./Panel";
import './App.css'
import SplitPane from "react-split-pane";

class Dashboard extends React.Component {
    render(){
        return(
        <div className={"dashboard"}>
            <SplitPane split="vertical">
                <SplitPane split="horizontal" size={2}>
                    <SplitPane split="vertical" size={1}>
                        <SplitPane split="horizontal" size={1}>
                            <SplitPane split="vertical" size={1}>
                                <Panel/>
                                <Panel/>
                            </SplitPane>
                            <SplitPane split="vertical" size={1}>
                                <Panel/>
                                <Panel/>
                            </SplitPane>
                            <SplitPane split="vertical" size={1}>
                                <Panel/>
                                <Panel/>
                            </SplitPane>
                        </SplitPane>
                        <Panel/>
                    </SplitPane>
                    <Panel/>

                </SplitPane>
                <SplitPane split="vertical" minSize={"400"} >
                    <Panel/>
                </SplitPane>
            </SplitPane>

        </div>
        )
    }
}

export default Dashboard