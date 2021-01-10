import React from "react";

import "styles/theme.scss";

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
        }
    }
});
