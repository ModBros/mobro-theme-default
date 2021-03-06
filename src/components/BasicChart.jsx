import React, {Fragment, useState} from "react";
import {mapChannelDataToSingleChartData} from "theme/utils/chart";
import {Line, LineChart, PolarAngleAxis, RadialBar, RadialBarChart, YAxis} from "recharts";

const AlignCenter = mobro.hooks.getComponent("shared.layout.align-center");
const LoadingIndicator = mobro.hooks.getComponent("shared.loading-indicator");
const ComponentLabel = mobro.hooks.getComponent("shared.component-label");

function getColor(color) {
    if (mobro.utils.helper.empty(color)) {
        return "black";
    }

    return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
}

function isNumeric(value) {
    if (value === null || value === "") {
        return false;
    }

    return !isNaN(parseFloat(value));
}

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
        config,
        layoutConfig,
        width,
        height,
        unit,
        color,
        chartData
    } = props;

    let fontColor = null;
    let fontColorRgb = config?.widgetFontColor || layoutConfig?.widgetFontColor;

    if (fontColorRgb) {
        fontColor = getColor(fontColorRgb);
    }

    let min = "dataMin";
    let max = "dataMax";
    let ticks = null;
    let allowDataOverflow = false;

    if (isNumeric(config?.min)) {
        min = parseFloat(config?.min);
    }

    if (isNumeric(config?.max)) {
        max = parseFloat(config?.max) ;
    }

    if(isNumeric(config?.min) && isNumeric(config?.max)) {
        ticks = [parseFloat(min), parseFloat(max)];
        allowDataOverflow = true;
    }

    console.log(min, max);

    return (
        <LineChart data={chartData} width={width} height={height}>
            <Line
                dot={false}
                isAnimationActive={false}
                strokeWidth={2}
                dataKey={"value"}
                stroke={getColor(color)}
            />

            <YAxis
                height={height}
                dataKey={"value"}
                orientation={"right"}
                ticks={ticks}
                domain={[min, max]}
                allowDataOverflow={allowDataOverflow}
                width={35}
                axisLine={false}
                tickLine={false}
                unit={unit}
                tick={{fontSize: 10, dy: -5, fill: fontColor}}
                interval={"preserveStartEnd"}
            />
        </LineChart>
    );
}

function BasicPieChart(props) {
    const {
        config,
        width,
        height,
        chartData,
        color,
        inverseColor,
        data
    } = props;

    const value = {
        ...mobro.utils.helper.last(chartData)
    };

    if (mobro.utils.channelData.isPercentageData(data)) {
        value.min = 0;
        value.max = 100;
    } else {
        value.max = data.max;
    }

    if (isNumeric(config.max)) {
        value.max = parseInt(config.max);
    }

    if (isNumeric(config.min)) {
        value.min = parseInt(config.min);
    }

    let background = {};

    if(inverseColor) {
        background.fill = getColor(inverseColor);
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
                    domain={[value.min, value.max]}
                    angleAxisId={0}
                    tick={false}
                />

                <RadialBar
                    minAngle={0}
                    clockWise={true}
                    dataKey={"value"}
                    denominator={"max"}
                    background={background}
                    fill={getColor(color)}
                    isAnimationActive={false}
                    cy={"100%"}
                />
            </RadialBarChart>

            <span className={"pie-chart-label"}>
                <strong>
                    {mobro.utils.channelData.extractValue(data)}
                </strong>

                <small className={"text-muted ml-1"}>
                    {mobro.utils.channelData.extractRawUnit(data)}
                </small>
            </span>
        </Fragment>
    );
}

function BasicChart(props) {
    const {
        layoutConfig,
        config
    } = props;

    const [container, setContainer] = useState(null);
    const historyData = mobro.utils.component.useHistoryChannelListener(config?.channel, 20);
    const lastData = mobro.utils.helper.last(historyData);
    const chartData = mapChannelDataToSingleChartData(historyData);

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
                        layoutConfig={layoutConfig}
                        width={width}
                        height={height}
                        color={config?.color}
                        inverseColor={config?.inverseColor}
                        config={config}
                        unit={unit}
                        chartData={chartData}
                        data={lastData}
                    />
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    layoutConfig: mobro.reducers.layout.getLayoutConfig(state)
});

export default mobro.lib.component.container.create("theme.widget.basic-chart", BasicChart)
    .connect(mapStateToProps)
    .generate();
