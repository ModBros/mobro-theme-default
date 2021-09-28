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