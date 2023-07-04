import React from 'react'
import Time from "./Time";
import Panel from "./Panel";
import Fetch from "./Fetch";
import AgentData from "./AgentData"
import {BomgarLongestWaiting,BomgarQueue} from "./BomgarData"
import {CiscoLongestWaiting, CiscoQueue} from "./CiscoData";
import './App.css'
import SplitPane from "react-split-pane";
import {MDBCard, MDBCardBody, MDBCardImage, MDBCol, MDBContainer, MDBRow, MDBTypography} from "mdb-react-ui-kit";

class Dashboard extends React.Component {
    render(){
        return(
        <div className={"dashboard"}>
            <SplitPane split="vertical">
                <SplitPane split="horizontal" size={2}>
                    <SplitPane split="vertical" size={1}>
                        <SplitPane split="horizontal" size={1.75}>
                            <SplitPane split="vertical" size={1}>
                                <Panel title={"Longest Call in Queue"} titleStyle={1}>
                                    <CiscoLongestWaiting/>
                                </Panel>
                                <Panel title={"Calls in Queue"} titleStyle={1}>
                                    <CiscoQueue/>
                                </Panel>
                            </SplitPane>
                            <SplitPane split="vertical" size={1}>
                                <Panel title={"Longest Bomgar in Queue"} titleStyle={1}>
                                    <BomgarLongestWaiting/>
                                </Panel>
                                <Panel title={"Bomgars in Queue"} titleStyle={1}>
                                    <BomgarQueue/>
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
                    <Panel/>

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