import { Slider } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import './CustomSlider.scss';

const CustomSlider = withStyles({
  root: {
    color: '#d2dbe5',
    height: 2,
    padding: '15px 0',
    width: '100%',
    marginBottom: 0,
    opacity: 1
  },
  thumb: {
    height: 34,
    width: 34,
    backgroundColor: 'transparent',
    borderRadius: '50%',
    marginTop: -14,
    marginLeft: -14,
    zIndex: 5
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 18px)',
    top: 13,
    '& *': {
      background: 'transparent',
      color: '#ffffff',
      fontSize: 16
    }
  },
  track: {
    height: 5,
    borderRadius: 10
  },
  rail: {
    height: 5,
    backgroundColor: '#a7b6c8',
    borderRadius: 5
  },
  mark: {
    backgroundColor: '#bfbfbf',
    height: 8,
    width: 1,
    marginTop: -3,
    fontSize: 20
  },
  markLabel: {
    top: 4,
    fontSize: 20,
    color: '#a7b6c8'
  }
})(Slider);

export default CustomSlider;
