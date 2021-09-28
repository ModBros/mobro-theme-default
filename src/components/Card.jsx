export default function Card(props) {
    const {
        path,
        config
    } = props;

    const components = mobro.utils.component.getComponentsFromConfig(config.components);

    return (
        <div className={'w-100'}>
            {config.title ? <h5>{config.title}</h5> : null}

            {mobro.utils.component.renderComponents(components, path, ({Component, type, path, config, i}) => (
                <Component
                    key={i}
                    path={path}
                    config={config}
                    inline={true}
                />
            ))}
        </div>
    );
}