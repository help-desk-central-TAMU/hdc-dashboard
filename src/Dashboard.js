import React from 'react'
import Time from "./Time";
import Panel from "./Panel";
import {BomgarLongestWaiting,BomgarQueue} from "./BomgarData"
import {CiscoLongestWaiting, CiscoQueue} from "./CiscoData";
import './App.css'
import SplitPane from "react-split-pane";
import Carousel from "./Carousel";
import AgentQueueTable from "./AgentQueue";

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
                                    <CiscoLongestWaiting/>
                                </Panel>
                                <Panel title={"Calls waiting"} titleStyle={1}>
                                    <CiscoQueue/>
                                </Panel>
                            </SplitPane>
                            <SplitPane split="vertical" size={1}>
                                <Panel title={"Longest Bomgar waiting"} titleStyle={1}>
                                    <BomgarLongestWaiting/>
                                </Panel>
                                <Panel title={"Bomgars waiting"} titleStyle={1}>
                                    <BomgarQueue/>
                                </Panel>
                            </SplitPane>
                            <SplitPane split="vertical" size={1}>
                                <Panel><Time className={"time-panel"}/></Panel>
                                <Panel></Panel>
                            </SplitPane>
                        </SplitPane>
                        <Panel title={"Current Shift"} titleStyle={1}>
                        </Panel>
                    </SplitPane>
                    <Panel>
                        <Carousel/>
                    </Panel>

                </SplitPane>
                <SplitPane split="vertical" minSize={"400"} >
                    <Panel title={"Phone Queue"} titleStyle={1}>
                        <AgentQueueTable/>
                    </Panel>
                </SplitPane>
            </SplitPane>

        </div>
        )
    }
}

export default Dashboard