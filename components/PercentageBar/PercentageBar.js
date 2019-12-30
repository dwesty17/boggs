import React from "react";

import "./styles.scss";

const PercentageBar = ({percentage}) => (
    <div className="percentage-container">
        {percentage ?
            <div
                className="percentage-bar"
                style={{ width: `${percentage}%` }}
            >
                {percentage.toFixed(0)}%
            </div> :
            <div className="empty-percentage-bar">
                {percentage.toFixed(0)}%
            </div>
        }
    </div>
);

export default PercentageBar;
