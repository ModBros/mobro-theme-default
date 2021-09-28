import Card from "theme/components/Card";
import CardIcon from "theme/icons/card.svg";

mobro.utils.icons.addIcon("widget.card", CardIcon);
mobro.hooks.addDataComponent({
    name: "card",
    label: "Card",
    icon: "widget.card",
    component: Card,
    config: {
        title: {
            type: 'input'
        },
        components: {
            type: "widgets"
        }
    }
});