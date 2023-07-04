import React from 'react'
import Time from "./Time";
import Panel from "./Panel";
import Fetch from "./Fetch";
import AgentData from "./AgentData"
import './App.css'
import SplitPane from "react-split-pane";
import Carousel from "./Carousel"

class Dashboard extends React.Component {

    render(){
        return(
        <div className={"dashboard"}>
            <SplitPane split="vertical">
                <SplitPane split="horizontal" size={2}>
                    <SplitPane split="vertical" size={1}>
                        <SplitPane split="horizontal" size={1.75}>
                            <SplitPane split="vertical" size={1}>
                                <Panel title={"Longest Call waiting"} titleStyle={1}>
                                    <div className={"panel-body"}>
                                        00:22:34
                                    </div>
                                </Panel>
                                <Panel title={"Calls waiting"} titleStyle={1} >
                                    <div className={"panel-body"}>
                                        3 Calls
                                    </div>
                                </Panel>
                            </SplitPane>
                            <SplitPane split="vertical" size={1}>
                                <Panel title={"Longest Bomgar waiting"} titleStyle={1}>
                                    <div className={"panel-body"}>
                                        00:00
                                    </div>
                                </Panel>
                                <Panel title={"Bomgars waiting"} titleStyle={1}>
                                    <div className={"panel-body"}>
                                        3 Calls
                                    </div>
                                </Panel>
                            </SplitPane>
                            <SplitPane split="vertical" size={1}>
                                <Panel><Time className={"time-panel"}/></Panel>
                                <Panel><AgentData/></Panel>
                            </SplitPane>
                        </SplitPane>
                        <Panel title={"Current Shift"} titleStyle={1}>
                            <h1>Student Leader</h1>
                            <h1>Dinesh B.</h1>
                            <hr/>
                        </Panel>
                    </SplitPane>
                    <Panel>
                        <Carousel />
                    </Panel>

                </SplitPane>
                <SplitPane split="vertical" minSize={"400"} >
                    <Panel title={"Phone Queue"} titleStyle={1}/>
                </SplitPane>
            </SplitPane>

        </div>
        )
    }
}

export default Dashboard