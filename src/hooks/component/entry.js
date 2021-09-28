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