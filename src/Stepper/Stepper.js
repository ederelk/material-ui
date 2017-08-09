// @flow weak

import React, { Children } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { createStyleSheet } from "jss-theme-reactor";
import withStyles from "../styles/withStyles";
import Paper from "../Paper";
import StepConnector from "./StepConnector";

export const styleSheet = createStyleSheet("MuiStepper", theme => ({
  root: {
    display: "flex",
    padding: theme.spacing.unit * 3, // TODO: Question: Guidelines state 24px, should we use `theme.spacing.unit * 3`?
  },
  nonAlternativeLabel: {
    alignContent: "center",
    justifyContent: "space-between",
  },
  horizontal: {
    flexDirection: "row",
    alignItems: "center",
  },
  vertical: {
    flexDirection: "column",
    alignItems: "stretch",
  },
}));

function Stepper(props) {
  const {
    activeStep,
    alternativeLabel,
    classes,
    className: classNameProp,
    children,
    connector: connectorProp,
    linear,
    orientation,
    ...other
  } = props;

  const className = classNames(
    classes.root,
    classNameProp,
    alternativeLabel ? null : classes.nonAlternativeLabel,
    alternativeLabel ? null : classes[orientation],
  );

  const connector = React.cloneElement(connectorProp, { orientation });
  const numChildren = Children.count(children);
  const steps = Children.map(children, (step, index) => {
    const controlProps = {
      index,
      orientation,
      totalSteps: children.length,
    };

    if (activeStep === index) {
      controlProps.active = true;
    } else if (linear && activeStep > index) {
      controlProps.completed = true;
    } else if (linear && activeStep < index) {
      controlProps.disabled = true;
    }

    if (index + 1 === numChildren) {
      controlProps.last = true;
    }

    if (alternativeLabel) {
      controlProps.alternativeLabel = true;
      controlProps.connector = connectorProp;
    }

    return [
      !alternativeLabel && index > 0 && connector,
      React.cloneElement(step, Object.assign(controlProps, step.props))
    ];
  });

  return (
    <Paper square elevation={0} className={className} {...other}>
      {steps}
    </Paper>
  );
}

Stepper.propTypes = {
  /**
   * Set the active step (zero based index).
   */
  activeStep: PropTypes.number,
  /**
   * If set to 'true' and orientation is horizontal, then the step label will be positioned under the icon.
   */
  alternativeLabel: PropTypes.bool,
  /**
   * Two or more `<Step />` components.
   */
  children: PropTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * A component to be placed between each step.
   */
  connector: PropTypes.node,
  /**
   * If set to `true`, the `Stepper` will not assist in controlling steps for linear flow
   */
  linear: PropTypes.bool,
  /**
   * The stepper orientation (layout flow direction)
   */
  orientation: PropTypes.oneOf(["horizontal", "vertical"])
};

Stepper.defaultProps = {
  activeStep: 0,
  alternativeLabel: false,
  connector: <StepConnector />,
  linear: true,
  orientation: "horizontal",
};

export default withStyles(styleSheet)(Stepper);
