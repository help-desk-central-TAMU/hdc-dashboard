import React, {useState} from 'react'
import Time from "./Time";
import Panel from "./Panel";
import {BomgarLongestWaiting, BomgarQueue} from "./BomgarData"
import {CiscoLongestWaiting, CiscoQueue} from "./CiscoData";
import './App.css'
import SplitPane from "react-split-pane";
import Carousel from "./Carousel";
import AgentQueueTable from "./AgentQueue";
import {ShiftBoard} from "./ShiftBoard";
import WeatherDisplay from "./Weather";
import {ThemeContext} from './ThemeContext';
import {Button} from "@mui/material";
import {Message, useToaster} from "rsuite";
import 'rsuite/dist/rsuite.min.css';

function Dashboard() {
    const [theme, setTheme] = useState('dark');
    const [isHigh, setIsHigh] = useState(false);
    const toaster = useToaster();
    const message = (
        <Message showIcon type={'info'} closable>
            Theme switched to '{theme}'.
        </Message>
    );
    const switchTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
        toaster.push(message,{ label: 'topCenter', value: 'topCenter' })
        console.log("toaster should have displayed")
    }

    const style = {
        color: "#f0f",
        background: "#f0f"
    }
    return (
        <ThemeContext.Provider value={{ theme, switchTheme }}>
        <div className={"dashboard "+ theme}>
        <SplitPane split="vertical" resizerStyle={style}>
            <SplitPane split="horizontal" size={2} resizerStyle={style}>
                <SplitPane split="vertical" size={1} resizerStyle={style}>
                    <SplitPane split="horizontal" size={1.75} resizerStyle={style}>
                        <SplitPane split="vertical" size={1} resizerStyle={style}>
                            <Panel title={"Longest Call waiting"} titleStyle={1}>
                                <CiscoLongestWaiting/>
                            </Panel>
                            <Panel title={"Calls waiting"} titleStyle={1} >
                                <CiscoQueue/>
                            </Panel>
                        </SplitPane>
                        <SplitPane split="vertical" size={1} resizerStyle={style}>
                            <Panel title={"Longest Bomgar waiting"} titleStyle={1}>
                                <BomgarLongestWaiting />
                            </Panel>
                            <Panel isHigh={isHigh} title={"Bomgars waiting"} titleStyle={1}>
                                <BomgarQueue setIsHigh={setIsHigh} />
                            </Panel>
                        </SplitPane>
                        <SplitPane split="vertical" size={1} resizerStyle={style}>
                            <Panel><Time className={"time-panel"}/></Panel>
                            <Panel>
                                <WeatherDisplay/>
                            </Panel>
                        </SplitPane>
                    </SplitPane>
                    <Panel title={"Current Shift"} titleStyle={1} resizerStyle={style}>
                        <ShiftBoard/>
                    </Panel>
                </SplitPane>
                <Panel>
                    <Carousel/>
                </Panel>
            </SplitPane>
            <SplitPane split="vertical" minSize={"400"} resizerStyle={style}>
                <Panel title={"Phone Queue"} titleStyle={1}>
                    <AgentQueueTable/>
                    <Button size={"large"} style={{width: "100%"}} color={"info"} onClick={switchTheme}>
                    </Button>
                </Panel>
            </SplitPane>
        </SplitPane>
    </div>
        </ThemeContext.Provider>
    )
}

export default Dashboard