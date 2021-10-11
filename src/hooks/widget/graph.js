import BasicChart from "theme/components/BasicChart";
import GraphIcon from "theme/icons/chart_graph.svg";

mobro.utils.icons.addIcon("widget.graph", GraphIcon);
mobro.hooks.addDataComponent({
    name: "basic-chart",
    label: "Basic Chart",
    icon: "widget.graph",
    component: BasicChart,
    config: {
        displayType: {
            type: "select",
            options: [
                {label: "Line", value: "line"},
                {label: "Pie", value: "pie"}
            ]
        },
        channel: {
            type: "channel"
        },
        height: {
            type: 'numeric'
        },
        color: {
            type: "color"
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
