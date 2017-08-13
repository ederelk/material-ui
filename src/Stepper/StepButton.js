// @flow weak

import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { createStyleSheet } from "jss-theme-reactor";
import withStyles from "../styles/withStyles";
import ButtonBase from '../internal/ButtonBase';
import StepLabel from './StepLabel';

const isLabel = (child) => {
  return child && child.type && child.type.muiName === 'StepLabel';
};

export const styleSheet = createStyleSheet("MuiStepButton", theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 14,
    paddingRight: 14,
    background: 'none',
  },
  alternativeLabelRoot: {
    margin: '0 auto',
  }
}));

function StepButton(props) {
  const {
    active,
    alternativeLabel,
    children,
    className: classNameProp,
    completed,
    classes,
    disabled,
    icon,
    iconContainerClassName,
    last, // eslint-disable-line no-unused-vars
    optional,
    orientation,
    ...other
  } = props;

  const className = classNames(
    classes.root,
    [classes.alternativeLabelRoot]: alternativeLabel,
    classNameProp,
  );
  const child = isLabel(children) ? children : <StepLabel>{children}</StepLabel>;

  return (
    <ButtonBase
      disabled={disabled}
      className={className}
      {...other}
    >
      {React.cloneElement(
        child,
        {
          active,
          alternativeLabel,
          completed,
          disabled,
          icon,
          iconContainerClassName,
          optional,
          orientation,
        }
      )}
    </ButtonBase>
  );
}

StepButton.propTypes = {
  /**
   * Passed from `Step` Is passed to StepLabel.
   */
  active: PropTypes.bool,
  /**
   * @ignore
   * Set internally by Stepper when it's supplied with the alternativeLabel prop.
   */
  alternativeLabel: PropTypes.bool,
  /**
   * Can be a `StepLabel` or a node to place inside `StepLabel` as children.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Sets completed styling. Is passed to StepLabel.
   */
  completed: PropTypes.bool,
  /**
   * Disables the button and sets disabled styling. Is passed to StepLabel.
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
   * Override the inline-styles of the icon container element.
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
  orientation: PropTypes.oneOf(["horizontal", "vertical"]).isRequired,
};

export default withStyles(styleSheet)(StepButton);
