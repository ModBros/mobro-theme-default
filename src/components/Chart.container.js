import Chart from 'theme/components/Chart';

const mapStateToProps = (state) => ({
    layoutConfig: mobro.reducers.layout.getLayoutConfig(state),
    settings: mobro.reducers.settings.getSettings(state)
});

export default mobro.lib.component.container.create('theme.charts.chart', Chart)
    .connect(mapStateToProps)
    .generate();
