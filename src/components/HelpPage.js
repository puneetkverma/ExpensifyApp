import React from 'react';
import './flex.css';
import Atsamodal from './Modal/Atsamodal';

const HelpPage = () => (
    <div>
    <div className="row">
        <div className=" col col2">Colomn2</div>
    </div>
    <Atsamodal/>
    <div className="row">
        <div className=" col col3 col31">Colomn31</div>
        <div className=" col col3 col32">Colomn32</div>
        <div className=" col col3 col33">Colomn33</div>
        <div className=" col col3 col34">Colomn34</div>
    </div>
    </div>
);
export default HelpPage;