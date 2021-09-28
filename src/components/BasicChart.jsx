import React from 'react';
import LineChart from 'theme/components/LineChart';
import PieChart from 'theme/components/PieChart'

const AlignCenter = mobro.hooks.getComponent('shared.layout.align-center');
const LoadingIndicator = mobro.hooks.getComponent('shared.loading-indicator');

function BasicChart(props) {
    const {
        config
    } = props;

    if (!config?.displayType) {
        return (<AlignCenter><LoadingIndicator className={'small'}/></AlignCenter>)
    }

    let ChartComponent = null;

    switch (config.displayType) {
        case 'line':
            ChartComponent = LineChart;
            break;

        case 'pie':
            ChartComponent = PieChart;
            break;
    }

    return (
        <ChartComponent {...props}/>
    );
}

export default BasicChart;