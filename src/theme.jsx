import "styles/theme.scss";

import more from "highcharts/highcharts-more";
import solidGauge from "highcharts/modules/solid-gauge"
import Highcharts from "highcharts";
more(Highcharts);
solidGauge(Highcharts);

// hooks
import "theme/hooks/global-config";
import "theme/hooks/global-edit-modificator";
import "theme/hooks/component/entry";
import "theme/hooks/component/base-component";
import "theme/hooks/component/spacer";
import "theme/hooks/widgets";
