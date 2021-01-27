import React from "react";
import mobro from "mobro";

import "styles/theme.scss";

mobro.hooks.globalConfig((event) => {
    event.setEditConfig({
        tabs: {
            type: "tabs",
            children: [{
                label: "General",
                children: event.getEditConfig() // original edit config in general tab
            }, {
                label: "Widgets",
                children: {
                    widgetFontSize: {
                        type: "numeric"
                    },
                    widgetFontColor: {
                        type: "color"
                    },
                    widgetBackgroundColor: {
                        type: "color"
                    },
                    disableWidgetBorder: {
                        type: "checkbox"
                    }
                }
            }]
        }
    });
});

mobro.hooks.addGlobalEditModificator((config) => ({
    tabs: {
        type: "tabs",
        children: [{
            label: "General",
            children: config
        }, {
            label: "Styling",
            children: {
                widgetFontSize: {
                    type: "numeric"
                },

                widgetFontColor: {
                    type: "color"
                },

                widgetBackgroundColor: {
                    type: "color"
                }
            }
        }]
    }
}));

mobro.hooks.redux.mapStateToProps("entry", (event) => {
    event.mergeMapStateToProps({
        layoutConfig: mobro.reducers.layout.getLayoutConfig(event.getState())
    });
})

mobro.hooks.component("entry", (Component) => (props) => {
    const {
        layoutConfig,
        ...rest
    } = props;

    const style = {};

    if(layoutConfig?.widgetFontSize) {
        style.fontSize = `${layoutConfig?.widgetFontSize}px`;
    }

    return (
        <div style={style} className={"d-flex w-100"}>
            <Component {...rest}/>
        </div>
    );
});

// map the layoutConfig prop from the redux store to the base component that surrounds every widget
mobro.hooks.redux.mapStateToProps("widget.base-component", (event) => {
    event.mergeMapStateToProps({
        layoutConfig: mobro.reducers.layout.getLayoutConfig(event.getState())
    });
});

// override the base component to add the background color and border option from the global config
mobro.hooks.component("widget.base-component", () => (props) => {
    const {
        type,
        path,
        config,
        Component,
        layoutMode,
        layoutConfig,
        selectedComponent,
        selectComponent = noop
    } = props;

    const renderConfig = mobro.hooks.getWidgetRenderConfig(type);
    const baseClassNames = !renderConfig?.ignoreBaseClassNames ? "component card" : "";

    let defaultClasses = "";
    let doSelectComponent = mobro.utils.helper.noop;
    let toggleEditSidebar = mobro.utils.helper.noop;

    if(mobro.utils.layout.isEditMode(layoutMode)) {
        defaultClasses = "clickable";
        doSelectComponent = () => selectComponent(path);
        toggleEditSidebar = mobro.utils.component.withEditSidebar({path, type, config});
    }

    const style = {};
    const widgetBackgroundColor = config?.widgetBackgroundColor || layoutConfig?.widgetBackgroundColor;
    const widgetFontSize = config?.widgetFontSize
    const widgetFontColor = config?.widgetFontColor || layoutConfig?.widgetFontColor;

    if(widgetBackgroundColor && !renderConfig?.ignoreBaseClassNames) {
        style.backgroundColor = `rgba(${widgetBackgroundColor?.r}, ${widgetBackgroundColor?.g}, ${widgetBackgroundColor?.b}, ${widgetBackgroundColor?.a})`
    }

    if(widgetFontColor) {
        style.color = `rgba(${widgetFontColor?.r}, ${widgetFontColor?.g}, ${widgetFontColor?.b}, ${widgetFontColor?.a})`
    }

    if(widgetFontSize) {
        style.fontSize = `${widgetFontSize}px`;
    }

    if(layoutConfig?.disableWidgetBorder) {
        defaultClasses += " border-0";
    }

    return (
        <div
            className={`${defaultClasses} ${baseClassNames} ${renderConfig?.baseClassNames} ${selectedComponent === path ? "selection-indicator" : ""}`}
            onClick={doSelectComponent}
            onDoubleClick={toggleEditSidebar}
            style={style}
        >
            <div className="component-body card-body">
                <Component path={path} config={config}/>
            </div>
        </div>
    );
});

import BasicChart from "theme/components/BasicChart";
import GraphIcon from "theme/icons/chart_graph.svg";

mobro.utils.icons.addIcon("widget.graph", GraphIcon);
mobro.hooks.addDataComponent({
    name: "basic-chart",
    label: "Basic Chart",
    icon: "widget.graph",
    component: BasicChart,
    config: {
        showLabel: {
            type: "checkbox"
        },
        customLabel: {
            type: "input"
        },
        displayType: {
            type: "select",
            options: [
                {label: "Line", value: "line"},
                {label: "Pie", value: "pie"}
            ]
        },
        color: {
            type: "color"
        },
        channel: {
            type: "channel"
        },
        minMax: {
            type: "field-container",
            children: [{
                width: 6,
                children: {
                    min: {
                        type: "numeric"
                    }
                }
            }, {
                width: 6,
                children: {
                    max: {
                        type: "numeric"
                    }
                }
            }]
        }
    }
});
