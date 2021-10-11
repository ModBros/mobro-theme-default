import mobro from "mobro";

export function mapChannelDataToSingleChartData(channelData) {
    return mobro.utils.helper.map(channelData, (item, index) => ({
        name: index,
        value: mobro.utils.channelData.extractValue(item)
    }));
}

import {colorToRgba} from './color'
import {getWidgetFontFamily} from './widget'

export const defaultFontColor = 'black';
export const defaultFrontColor = 'rgb(0, 0, 0)';
export const defaultBackColor = '#efefef';

export function basicTextColor(configRef, layoutConfigRef) {
    return colorToRgba(configRef.current.widgetFontColor, colorToRgba(layoutConfigRef.current.widgetFontColor, defaultFontColor));
}

export function valueTextColor(configRef) {
    return colorToRgba(configRef.current.color, defaultFrontColor);
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
        const centerY = this.plotHeight / 1.25 + this.plotTop;
        const valueFontSize = Math.min(this.plotWidth, this.plotHeight) / 4

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
    }
}