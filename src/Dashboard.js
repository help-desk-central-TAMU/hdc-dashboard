import React from 'react'
import Panel from "./Panel";
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
                                    <div className={"panel-body"}>
                                        00:22:34
                                    </div>
                                </Panel>
                                <Panel title={"Calls in Queue"} titleStyle={1}>
                                    <div className={"panel-body"}>
                                        3 Calls
                                    </div>
                                </Panel>
                            </SplitPane>
                            <SplitPane split="vertical" size={1}>
                                <Panel title={"Longest Bomgar in Queue"} titleStyle={1}>
                                    <div className={"panel-body"}>
                                        3 Calls
                                    </div>
                                </Panel>
                                <Panel title={"Bomgars in Queue"} titleStyle={1}>
                                    <div className={"panel-body"}>
                                        3 Calls
                                    </div>
                                </Panel>
                            </SplitPane>
                            <SplitPane split="vertical" size={1}>
                                <Panel/>
                                <Panel/>
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