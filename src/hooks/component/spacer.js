mobro.hooks.component("widget.spacer", (Component) => (props) => {
    const {
        inline = false
    } = props;


    if(!inline) {
        return null;
    }

    return (
        <div style={{height: '0.5rem'}}/>
    );
});