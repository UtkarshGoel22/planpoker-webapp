import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

const CustomToolTip = withStyles({
  tooltip: {
    color: '#ffffff',
    backgroundColor: '#2c3e50',
  },
})(Tooltip);

export default CustomToolTip;
