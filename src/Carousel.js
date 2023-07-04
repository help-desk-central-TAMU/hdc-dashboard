import React from 'react';
import {Card, Carousel as CarouselRS} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Panel from "./Panel";
import SNQueueStatChart from "./SNQueueStatChart";

const Carousel = () => {

    return (
         <SNQueueStatChart/>
    );
};


export default Carousel;