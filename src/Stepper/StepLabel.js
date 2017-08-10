// @flow weak

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { createStyleSheet } from "jss-theme-reactor";
import withStyles from "../styles/withStyles";
import Typography from '../Typography';
import StepIcon from './StepIcon';

export const styleSheet = createStyleSheet("MuiStepLabel", theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 14,
    paddingRight: 14,
  },
  horizontal: {
    // height: 72,
  },
  vertical: {
    height: -64,
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
  icon: {
    color: theme.palette.primary[500],
    display: 'block',
    fontSize: 24,
    width: 24,
    height: 24,
  },
  iconContainer: {
    paddingRight: 8,
  },
  alternativeLabelRoot: {
    flexDirection: 'column',
    justifyContent: 'flex-top',
    margin: '0 auto',
  },
  alternativeLabel: {
    textAlign: 'center',
    marginTop: theme.spacing.unit * 2,
  },
  alternativeLabelIconContainer: {
    alignItems: 'center',
  }
}));

function StepLabel(props) {
  const {
    active,
    completed,
    disabled,
    icon,
    orientation,
    alternativeLabel,
    last,
    children,
    classes,
    ...other
  } = props;

  const className = classNames(
    classes.root,
    classes[orientation],
    {
      [classes.disabled]: disabled,
      [classes.completed]: completed,
      [classes.alternativeLabelRoot]: alternativeLabel,
    },
  );
  const labelClassName = classNames(
    {
      [classes.alternativeLabel]: alternativeLabel,
      [classes.active]: active,
      [classes.completed]: completed,
    }
  );

  return (
    <span className={className} {...other}>
      {icon && (
        <span className={alternativeLabel ? null : classes.iconContainer}>
          <StepIcon
            completed={completed}
            active={active}
            icon={icon}
            alternativeLabel={alternativeLabel}
          />
        </span>
      )}
      <Typography type="body1" className={labelClassName}>{children}</Typography>
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
  icon: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.number,
  ]),
  /**
   * @ignore
   */
  last: PropTypes.bool,
  /**
   * @ignore
   */
  orientation: PropTypes.oneOf(["horizontal", "vertical"]).isRequired,
};

export default withStyles(styleSheet)(StepLabel);
