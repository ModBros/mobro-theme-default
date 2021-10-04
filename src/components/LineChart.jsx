import {useState, useRef} from 'react';
import Chart from 'theme/components/Chart.container';
import {defaultFontColor, maxValue, minValue} from 'theme/utils/chart'
import {colorToRgba} from 'theme/utils/color'
import {getWidgetFontColor, getWidgetFontFamily} from 'theme/utils/widget'

const defaultLineColor = 'rgba(15, 150, 200, 1)';

function createOptions(configRef, layoutConfigRef, channelDataRef, settings, optionsRef) {
    const min = minValue(configRef, 'min', null);
    const max = maxValue(configRef, null, 'max', null);

    return {
        colors: [colorToRgba(configRef.current?.lineColor, defaultLineColor)],
        chart: {
            backgroundColor: 'rgba(0, 0, 0, 0)',
            margin: [0, 0, 0, 0],
            spacing: [0, 0, 0, 0],
            animation: {
                duration: 500
            }
        },
        title: {
            text: undefined,
            floating: true
        },
        credits: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        subtitle: {
            text: ''
        },
        tooltip: {
            enabled: false
        },
        legend: {
            enabled: false
        },
        xAxis: {
            visible: false,
        },
        yAxis: {
            endOnTick: true,
            gridLineWidth: 0,
            startOnTick: true,
            tickAmount: 2,
            tickWidth: 0,
            min: min,
            max: max,
            title: {
                text: undefined
            },
            labels: {
                style: {
                    fontFamily: getWidgetFontFamily(configRef.current, layoutConfigRef.current),
                    color: colorToRgba(getWidgetFontColor(configRef.current, layoutConfigRef.current), defaultFontColor)
                }
            }
        },
        plotOptions: {
            series: {
                // necessary so that the start animation won't cause weird re-renderings
                // due to unfinished animations
                animation: false
            },
            column: {
                // remove border from bar
                borderWidth: 0
            }
        },
        series: [{
            marker: {
                enabled: false
            },
            enableMouseTracking: false,
            lineWidth: configRef.current.lineWidth || 2,
            data: optionsRef.current?.series?.[0]?.data ?? (function () {
                const data = [];
                const time = (new Date()).getTime();

                for (let i = 0; i < 14; i++) {
                    data.push({
                        x: time - i * 1000,
                        y: 0
                    });
                }

                return data.reverse();
            })()
        }]
    }
}

function ChartValue(props) {
    const {
        config
    } = props;

    const [channelData, setChannelData] = useState(null);

    mobro.utils.component.useChannelListener(config?.channel, (data) => {
        setChannelData(data);
    });

    const label = config?.label ? config?.label : channelData?.label;

    return (
        <div className={'w-100 d-flex align-items-center justify-content-between mb-2'}>
            <span className="text-left d-block">
                {label}
                &nbsp;-&nbsp;
                <span>{mobro.utils.channelData.extractRawUnit(channelData)}</span>
            </span>
            <h3 className="text-right">
                {mobro.utils.channelData.extractValue(channelData)}
            </h3>
        </div>
    );
}

function LineChart(props) {
    const {
        ...chartProps
    } = props;

    const container = useRef(null);
    const containerSize = useRef([0, 0]);

    return (
        <div className={'d-flex flex-column w-100'} ref={container}>
            <Chart
                {...chartProps}
                createOptions={createOptions}
                configKeyToListen={[
                    'min',
                    'max',
                    'width',
                    'height',
                    'lineWidth',
                    'lineColor',
                    'widgetFontColor'
                ]}
                writeDataToSeries={(channelDataRef, optionsRef, configRef, layoutConfigRef, chartRef) => {
                    const [width, height] = containerSize.current;
                    const [currentWidth, currentHeight] = [container.current.offsetWidth, container.current.offsetHeight];

                    if(width !== currentWidth || height !== currentHeight) {
                        chartRef.current?.chart?.reflow();
                    }

                    const point = [
                        (new Date()).getTime(),
                        parseFloat(mobro.utils.channelData.extractValue(channelDataRef.current))
                    ];

                    chartRef.current?.chart?.series?.[0]?.addPoint(point, false, true);
                }}
                adaptOptions={(channelDataRef, optionsRef, configRef) => {
                }}
            />
        </div>
    );
}

export default LineChart;