// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CheckCircle from '../svg-icons/CheckCircle';
import withStyles from '../styles/withStyles';
import StepPositionIcon from './StepPositionIcon';

export const styles = theme => ({
  root: {},
  completed: {
    fill: theme.palette.primary[500],
  },
});

function StepIcon(props) {
  const { completed, icon, active, classes, theme } = props;
  const iconType = typeof icon;

  if (iconType === 'number' || iconType === 'string') {
    if (completed) {
      return <CheckCircle className={classNames(classes.root, classes.completed)} />;
    }
    return <StepPositionIcon theme={theme} position={icon} active={active} />;
  }

  return icon;
}

StepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Classses for component style customizations.
   */
  classes: PropTypes.object,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The icon displayed by the step label.
   */
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
  /**
   * Components theme
   */
  theme: PropTypes.object,
};

export default withStyles(styles)(StepIcon);
