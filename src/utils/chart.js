import mobro from "mobro";

export function mapChannelDataToSingleChartData(channelData) {
    return mobro.utils.helper.map(channelData, (item, index) => ({
        name: index,
        value: mobro.utils.channelData.extractValue(item)
    }));
}
