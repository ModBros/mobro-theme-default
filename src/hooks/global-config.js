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
                    }
                }
            }]
        }
    });
});