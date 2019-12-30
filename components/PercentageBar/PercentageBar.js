import React from "react";

import "./styles.scss";

const PercentageBar = ({percentage}) => (
    <div className="percentage-container">
        <div
            className="percentage-bar"
            style={{ width: `${percentage}%` }}
        >
            {percentage.toFixed(0)}%
        </div>
    </div>
);

export default PercentageBar;
