import mobro from "mobro";

export function mapChannelDataToSingleChartData(channelData) {
    return mobro.utils.helper.map(channelData, (item, index) => ({
        name: index,
        value: mobro.utils.channelData.extractValue(item)
    }));
}

import {colorToRgba} from './color'
import {getWidgetFontFamily} from './widget'

export const defaultFontColor = 'white';
export const defaultFrontColor = 'rgb(0 255 255)';
export const defaultBackColor = '#506e78';

export function basicTextColor(configRef, layoutConfigRef) {
    return colorToRgba(configRef.current.widgetFontColor, colorToRgba(layoutConfigRef.current.widgetFontColor, defaultFontColor));
}

export function valueTextColor(configRef) {
    return colorToRgba(configRef.current.frontColor, defaultFrontColor);
}

export function frontColor(configRef) {
    return valueTextColor(configRef);
}

export function backColor(configRef) {
    return colorToRgba(configRef.current.backColor, defaultBackColor);
}

export function maxValue(configRef, channelData, key = 'max', fallback = 100) {
    if (key && configRef.current?.[key]) {
        return parseInt(configRef.current[key])
    }

    if (channelData?.current) {
        if (mobro.utils.channelData.isPercentageData(channelData.current)) {
            return 100;
        }

        return mobro.utils.channelData.extractRawMaxValue(channelData.current)
    }

    return fallback;
}

export function minValue(configRef, key = 'min', fallback) {
    if (key && configRef.current?.[key]) {
        return parseInt(configRef.current[key])
    }

    return fallback;
}

export function redrawDoughnutOrGauge(
    configRef,
    layoutConfigRef,
    channelData,
    basicTextFontColor = basicTextColor,
    valueTextFontColor = valueTextColor
) {
    return function () {
        if (!channelData.current) {
            return;
        }

        const centerX = this.plotWidth / 2 + this.plotLeft;
        const centerY = this.plotHeight + this.plotTop;
        const valueFontSize = Math.min(this.plotWidth, this.plotHeight) / 5
        const labelFontSize = valueFontSize / 2.5;

        this.widgetLabel
            .attr({
                text: configRef.current.label ?? channelData.current?.label,
                x: centerX,
                y: centerY - (this.plotHeight / 6)
            })
            .css({
                color: basicTextFontColor(configRef, layoutConfigRef),
                fontSize: `${labelFontSize}px`,
                fontFamily: getWidgetFontFamily(configRef.current, layoutConfigRef.current)
            });

        this.widgetValue
            .attr({
                text: mobro.utils.channelData.extractValue(channelData.current) + mobro.utils.channelData.extractRawUnit(channelData.current),
                x: centerX,
                y: centerY
            })
            .css({
                color: valueTextFontColor(configRef),
                fontSize: `${valueFontSize}px`,
                fontFamily: getWidgetFontFamily(configRef.current, layoutConfigRef.current)
            });
    }
}

export function loadDoughnutOrGauge(
    configRef,
    layoutConfigRef,
    basicTextFontColor = basicTextColor,
    valueTextFontColor = valueTextColor
) {
    return function () {
        this.widgetLabel = this.renderer.text('')
            .attr({
                align: 'center',
                zIndex: 1
            })
            .css({
                color: basicTextFontColor(configRef, layoutConfigRef),
                fontFamily: getWidgetFontFamily(configRef.current, layoutConfigRef.current)
            })
            .add()

        this.widgetValue = this.renderer.text('')
            .attr({
                align: 'center',
                zIndex: 2
            })
            .css({
                color: valueTextFontColor(configRef),
                fontFamily: getWidgetFontFamily(configRef.current, layoutConfigRef.current)
            })
            .add();

        this.widgetUnit = this.renderer.text('')
            .attr({
                align: 'center',
                zIndex: 1
            })
            .css({
                color: basicTextFontColor(configRef, layoutConfigRef),
                fontFamily: getWidgetFontFamily(configRef.current, layoutConfigRef.current)
            })
            .add()
    }
}