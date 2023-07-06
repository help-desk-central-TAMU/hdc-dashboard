import React from "react";
import SNQueueStatChart from "./SNQueueStatChart";

class Carousel extends React.Component {

    constructor(props) {
        super(props);
    }

    render(){
        return(
              <SNQueueStatChart />
        )
    }
}


export default Carousel;