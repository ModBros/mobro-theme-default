import React from "react";

import "styles/theme.scss";

//mobro.hooks.addComponentRoot("absolute");

// mobro.hooks.addGlobalEditModificator((config) => ({
//     themeCardName: {
//         type: "input"
//     },
//
//     ...config
// }));
//
// mobro.hooks.component("component.base-component", () => (props) => {
//     const {
//         type,
//         path,
//         config,
//         Component,
//         selectedComponent,
//         selectComponent = mobro.utils.helper.noop
//     } = props;
//
//     const renderConfig = mobro.hooks.getDataComponentRenderConfig(type);
//     const baseClassNames = !renderConfig?.ignoreBaseClassNames ? "component card" : "";
//     const cardName = config?.themeCardName;
//     const ComponentLabel = mobro.hooks.getComponent("shared.component-label");
//
//     return (
//         <div
//             className={`${baseClassNames} ${renderConfig?.baseClassNames} ${selectedComponent === path ? "selection-indicator" : ""}`}
//             onClick={() => selectComponent(path)}
//         >
//             <div className="card-body d-flex flex-column p-1">
//                 {cardName !== null && (
//                     <ComponentLabel label={cardName}/>
//                 )}
//
//                 <div className={"component-body p-0 d-flex w-100 flex-fill"}>
//                     <Component path={path} config={config}/>
//                 </div>
//             </div>
//         </div>
//     );
// })

// ----------------------------------------------------
// component hook

// hooks.component("entry", (Component) => (props) => (
//     <div className="my-wrapper">
//         <Component {...props}/>
//     </div>
// ));

// ----------------------------------------------------
// reducers hook

// const hardwareInitialState = {
//     hardware: "intel"
// }
//
// const dataInitialState = {
//     data: "stuff"
// }
//
// hooks.redux.reducers(event => event.mergeReducers({
//     theme: event.combineReducers({
//         hardware: event.createReducer(hardwareInitialState, {}),
//         data: event.createReducer(dataInitialState, {})
//     })
// }));

// ----------------------------------------------------
// map state to props hook

// hooks.redux.mapStateToProps("app", event => event.mergeMapStateToProps({
//     myCustomPropFromState: event.state.layout.foo,
//     hardware: event.state.theme.hardware.hardware,
//     data: event.state.theme.data.data
// }));

import BasicChart from "theme/components/BasicChart";

mobro.hooks.addDataComponent({
    name: "basic-chart",
    label: "Basic Chart",
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
        channel: {
            type: "channel"
        }
    }
});
