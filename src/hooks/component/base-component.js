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

    defaultClasses += " border-0";

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
