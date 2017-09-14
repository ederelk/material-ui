// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import Typography from '../Typography';
import StepIcon from './StepIcon';

export const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  horizontal: {
    // height: 72,
  },
  vertical: {
    // height: -64,
  },
  active: {
    fontWeight: 500,
  },
  completed: {
    fontWeight: 500,
  },
  disabled: {
    cursor: 'default',
  },
  iconContainer: {
    paddingRight: theme.spacing.unit,
  },
  alternativeLabelRoot: {
    flexDirection: 'column',
  },
  alternativeLabel: {
    textAlign: 'center',
    marginTop: theme.spacing.unit * 2,
  },
});

function StepLabel(props) {
  const {
    active,
    completed,
    disabled,
    icon,
    iconContainerClassName: iconContainerClassNameProp,
    orientation,
    alternativeLabel,
    last,
    children,
    classes,
    optional,
    ...other
  } = props;

  const className = classNames(classes.root, classes[orientation], {
    [classes.disabled]: disabled,
    [classes.completed]: completed,
    [classes.alternativeLabelRoot]: alternativeLabel,
  });
  const labelClassName = classNames({
    [classes.alternativeLabel]: alternativeLabel,
    [classes.active]: active,
    [classes.completed]: completed,
  });
  const iconContainerClassName = classNames(
    {
      [classes.iconContainer]: !alternativeLabel,
    },
    iconContainerClassNameProp,
  );

  return (
    <span className={className} {...other}>
      {icon && (
        <span className={iconContainerClassName}>
          <StepIcon
            completed={completed}
            active={active}
            icon={icon}
            alternativeLabel={alternativeLabel}
          />
        </span>
      )}
      <div>
        <Typography type="body1" className={labelClassName}>
          {children}
        </Typography>
        {optional && (
          <Typography type="caption" className={classes.optional}>
            Optional
          </Typography>
        )}
      </div>
    </span>
  );
}

StepLabel.propTypes = {
  /**
   * Sets the step as active. Is passed to child components.
   */
  active: PropTypes.bool,
  /**
   * @ignore
   * Set internally by Stepper when it's supplied with the alternativeLabel prop.
   */
  alternativeLabel: PropTypes.bool,
  /**
   * Should be `StepLabel` sub-components such as `StepLabelLabel`.
   */
  children: PropTypes.node,
  /**
   * Custom styles for component.
   */
  classes: PropTypes.object,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * Mark the step as disabled, will also disable the button if
   * `StepLabelButton` is a child of `StepLabel`. Is passed to child components.
   */
  disabled: PropTypes.bool,
  /**
   * The icon displayed by the step label.
   */
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
  /**
   * Icon container class name
   */
  iconContainerClassName: PropTypes.string,
  /**
   * @ignore
   */
  last: PropTypes.bool,
  /**
   * @ignore
   */
  optional: PropTypes.bool,
  /**
   * @ignore
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
};

export default withStyles(styles)(StepLabel);
