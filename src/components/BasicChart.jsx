import React, {Fragment, useState} from "react";
import {mapChannelDataToSingleChartData} from "theme/utils/chart";
import {Line, LineChart, PolarAngleAxis, RadialBar, RadialBarChart, YAxis} from "recharts";

function getLabel(config, historyData) {
    if (!config?.showLabel) {
        return null;
    }

    if (config?.customLabel) {
        return config.customLabel;
    }

    if (mobro.utils.helper.empty(historyData)) {
        return null;
    }

    return mobro.utils.channelData.extractLabel(mobro.utils.helper.first(historyData));
}

function BasicLineChart(props) {
    const {
        width,
        height,
        unit,
        chartData,
        data
    } = props;

    return (
        <LineChart data={chartData} width={width} height={height}>
            <Line
                dot={false}
                isAnimationActive={false}
                strokeWidth={2}
                dataKey={"value"}
            />

            <YAxis
                dataKey={"value"}
                orientation={"right"}
                width={35}
                axisLine={false}
                tickLine={false}
                tickSize={5}
                unit={unit}
                tick={{fontSize: 12}}
                allowDecimals={false}
                interval={0}
                ticks={[data.min, data.max]}
            />
        </LineChart>
    );
}

function BasicPieChart(props) {
    const {
        width,
        height,
        chartData,
        data
    } = props;

    const value = {
        ...mobro.utils.helper.last(chartData)
    };

    if (mobro.utils.channelData.isPercentageData(data)) {
        value.max = 100;
    } else {
        value.max = data.max;
    }

    return (
        <Fragment>
            <RadialBarChart
                innerRadius={"85%"}
                outerRadius={"100%"}
                data={[value]}
                startAngle={180}
                endAngle={0}
                cy={"50%"}
                width={width}
                height={height * 2}
            >
                <PolarAngleAxis
                    type={"number"}
                    domain={[0, 100]}
                    angleAxisId={0}
                    tick={false}
                />

                <RadialBar
                    minAngle={0}
                    clockWise={true}
                    dataKey={"value"}
                    denominator={"max"}
                    background
                    isAnimationActive={false}
                    cy={"100%"}
                />
            </RadialBarChart>

            <small className={"pie-chart-label"}>
                {mobro.utils.channelData.extractValue(data)}{mobro.utils.channelData.extractRawUnit(data)}
            </small>
        </Fragment>
    );
}

function BasicChart(props) {
    const {
        config
    } = props;

    const [container, setContainer] = useState(null);
    const historyData = mobro.utils.component.useHistoryChannelListener(config?.channel, 20);
    const lastData = mobro.utils.helper.last(historyData);
    const chartData = mapChannelDataToSingleChartData(historyData);

    const AlignCenter = mobro.hooks.getComponent("shared.layout.align-center");
    const LoadingIndicator = mobro.hooks.getComponent("shared.loading-indicator");
    const ComponentLabel = mobro.hooks.getComponent("shared.component-label");

    if (!config?.displayType) {
        return (<AlignCenter><LoadingIndicator className={"small"}/></AlignCenter>)
    }

    if (mobro.utils.helper.empty(chartData) || chartData.length < 3) {
        return (<AlignCenter><LoadingIndicator className={"small"}/></AlignCenter>)
    }

    const label = getLabel(config, historyData);
    const unit = mobro.utils.channelData.extractRawUnit(mobro.utils.helper.first(historyData));
    let ChartComponent = null;

    switch (config.displayType) {
        case "line":
            ChartComponent = BasicLineChart;
            break;

        case "pie":
            ChartComponent = BasicPieChart;
            break;
    }

    let width = 0;
    let height = 0;

    if (container) {
        width = container.clientWidth;
        height = container.clientHeight;
    }

    return (
        <div className={"w-100 d-flex flex-column position-relative"}>
            <ComponentLabel label={label} className={"chart-label"}/>

            <div className={"flex-fill d-flex overflow-hidden"} ref={setContainer}>
                <div className={"chart-container position-absolute"}>
                    <ChartComponent
                        width={width}
                        height={height}
                        unit={unit}
                        chartData={chartData}
                        data={lastData}
                    />
                </div>
            </div>
        </div>
    );
}

export default BasicChart;