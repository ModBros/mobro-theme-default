import {backColor, frontColor, loadDoughnutOrGauge, maxValue, redrawDoughnutOrGauge} from 'theme/utils/chart'
import Chart from 'theme/components/Chart.container'

// function createOptions(config, layoutConfig, channelData) {
//     return {
//         colors: [frontColor(config)],
//         chart: {
//             type: 'column',
//             inverted: true,
//             polar: true,
//             backgroundColor: 'rgba(0, 0, 0, 0)',
//             margin: [0, 0, 0, 0],
//             spacing: [0, 0, 0, 0],
//             events: {
//                 load: loadDoughnutOrGauge(config, layoutConfig),
//                 redraw: redrawDoughnutOrGauge(config, layoutConfig, channelData)
//             },
//             animation: {
//                 duration: 500
//             }
//         },
//         title: {
//             text: ''
//         },
//         credits: {
//             enabled: false
//         },
//         exporting: {
//             enabled: false
//         },
//         subtitle: {
//             text: ''
//         },
//         pane: {
//             center: ['50%', '100%'],
//             size: '200%',
//             startAngle: -90,
//             endAngle: 90,
//             background: {
//                 outerRadius: '100%',
//                 innerRadius: '76%',
//                 borderWidth: 0
//             }
//         },
//         legend: {
//             // no legend
//             enabled: false
//         },
//         tooltip: {
//             // no tooltip on hover
//             enabled: false
//         },
//         xAxis: {
//             // no borders, ticks what so ever
//             visible: false,
//         },
//         yAxis: {
//             min: 0,
//             max: maxValue(config, channelData, 'maxValue'),
//             // no borders, ticks what so ever
//             visible: false,
//             gridLineInterpolation: 'polygon',
//         },
//         plotOptions: {
//             series: {
//                 // necessary so that the start animation won't cause weird re-renderings
//                 // due to unfinished animations
//                 animation: false
//             },
//             column: {
//                 // remove border from bar
//                 borderWidth: 0
//             }
//         },
//         series: [{
//             data: [0]
//         }]
//     }
// }

function findMinMaxSettings(channelData, settings) {
    let minMaxSettings = defaultMinMaxSettings;

    if (mobro.enum.channelData.SENSOR_TYPE_TEMPERATURE !== channelData?.sensortype) {
        return minMaxSettings;
    }

    settings?.hardware?.temperature?.forEach((item) => {
        if (item.hardwaretype === channelData?._hardware?.hardwaretype) {
            minMaxSettings = item;
        }
    });

    return minMaxSettings;
}

function createOptions(configRef, layoutConfigRef, channelDataRef) {
    const max = maxValue(configRef, channelDataRef, 'max');

    return {
        colors: [frontColor(configRef)],
        chart: {
            type: 'solidgauge',
            backgroundColor: 'rgba(0, 0, 0, 0)',
            margin: [0, 0, 0, 0],
            spacing: [0, 0, 0, 0],
            events: {
                load: loadDoughnutOrGauge(configRef, layoutConfigRef),
                redraw: redrawDoughnutOrGauge(configRef, layoutConfigRef, channelDataRef)
            },
            animation: {
                duration: 500
            }
        },
        title: {
            text: ''
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
        pane: {
            center: ['50%', '70%'],
            size: '150%',
            startAngle: -115,
            endAngle: 115,
            background: {
                backgroundColor: backColor(configRef),
                innerRadius: '70%',
                outerRadius: '90%',
                borderWidth: 0,
                shape: 'arc'
            }
        },
        tooltip: {
            enabled: false
        },
        xAxis: {
            max: max,
            visible: false,
            endOnTick: false
        },
        yAxis: {
            length: 5,
            lineWidth: 0,
            minorTickInterval: null,
            tickAmount: 2,
            tickLength: 0,
            labels: {
                enabled: false
            },
            endOnTick: false,
            min: 0,
            max: max
        },
        plotOptions: {
            solidgauge: {
                innerRadius: '70%',
                radius: '90%',
                dataLabels: {
                    enabled: false
                },
                series: {
                    animation: {
                        duration: 200
                    }
                }
            },
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
            data: [0]
        }]
    }
}

function DoughnutOrGauge(props) {
    const {
        extractMaxValue = maxValue,
        writeDataToSeries = (channelDataRef, optionsRef, configRef) => {},
        ...chartProps
    } = props;

    return (
        <Chart
            {...chartProps}
            configKeyToListen={[
                'height',
                'color',
                'min',
                'max',
            ]}
            writeDataToSeries={(channelDataRef, optionsRef, configRef) => {
                optionsRef.current.series[0].data = [parseFloat(mobro.utils.channelData.extractValue(channelDataRef.current))];

                writeDataToSeries(channelDataRef, optionsRef, configRef);
            }}
            adaptOptions={(channelDataRef, optionsRef, configRef) => {
                optionsRef.current.yAxis.max = extractMaxValue(configRef, channelDataRef);
                optionsRef.current.pane.background.backgroundColor = backColor(configRef);
            }}
        />
    );
}

function PieChart(props) {
    return (
        <DoughnutOrGauge
            {...props}
            height={props.inline ? 50 : null}
            createOptions={(...args) => createOptions(...args, props.settings)}
            extractMaxValue={(...args) => maxValue(...args, 'max')}
        />
    );
}

export default PieChart;
