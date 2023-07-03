import React from 'react'
import Panel from "./Panel";
import './App.css'

class Dashboard extends React.Component {
    render(){
        return(
        <div className={"dashboard"}>
            <Panel height={200} width={300}/>
            <Panel height={100} width={200}/>
            <Panel height={300} width={500}/>
            <Panel height={100} width={200}/>
            <Panel height={340} width={400}/>
            <Panel height={130} width={320}/>
        </div>
        )
    }
}

export default Dashboard