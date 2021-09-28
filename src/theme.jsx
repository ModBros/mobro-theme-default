import "styles/theme.scss";

import more from "highcharts/highcharts-more";
import Highcharts from "highcharts";
more(Highcharts);

// hooks
import "theme/hooks/global-config";
import "theme/hooks/global-edit-modificator";
import "theme/hooks/component/entry";
import "theme/hooks/component/base-component";
import "theme/hooks/widgets";
