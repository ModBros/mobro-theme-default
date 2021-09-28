export function getWidgetConfigValue(key, widgetConfig, layoutConfig) {
    return widgetConfig?.[key] ?? layoutConfig?.[key];
}

export function getWidgetBackgroundColor(widgetConfig, layoutConfig) {
    return getWidgetConfigValue('widgetBackgroundColor', widgetConfig, layoutConfig);
}

export function getWidgetFontSize(widgetConfig, layoutConfig) {
    return getWidgetConfigValue('widgetFontSize', widgetConfig, layoutConfig);
}

export function getWidgetFontColor(widgetConfig, layoutConfig) {
    return getWidgetConfigValue('widgetFontColor', widgetConfig, layoutConfig);
}

export function getWidgetPadding(widgetConfig, layoutConfig) {
    return getWidgetConfigValue('widgetPadding', widgetConfig, layoutConfig);
}

export function getWidgetFontFamily(widgetConfig, layoutConfig) {
    return getWidgetConfigValue('widgetFontFamily', widgetConfig, layoutConfig)?.family ?? "";
}