// @flow weak

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { createStyleSheet } from "jss-theme-reactor";
import withStyles from "../styles/withStyles";

export const styleSheet = createStyleSheet("MuiStepConnector", theme => ({
  root: {
    flex: "1 1 auto"
  },
  line: {
    display: "block",
    borderColor: theme.palette.line.stepper,
  },
  rootVertical: {
    marginLeft: theme.spacing.unit + 4,
    padding: `${theme.spacing.unit}px 0`,
  },
  lineHorizontal: {
    marginLeft: -6,
    borderTopStyle: "solid",
    borderTopWidth: 1
  },
  lineVertical: {
    borderLeftStyle: "solid",
    borderLeftWidth: 1,
    minHeight: 28,
  },
  alternativeLabelRoot: {
    position: "absolute",
    top: theme.spacing.unit + 4,
    left: 'calc(50% + 20px)',
    right: 'calc(-50% + 20px)',
  },
  alternativeLabelLine: {
    marginLeft: 0,
  }
}));

function StepConnector(props) {
  const {
    alternativeLabel,
    className: classNameProp,
    classes,
    orientation,
    ...other
  } = props;

  const className = classNames(
    {
      [classes.root]: !alternativeLabel,
      [classes.rootVertical]: orientation === "vertical",
      [classes.alternativeLabelRoot]: alternativeLabel,
    },
    classNameProp
  );
  const lineClassName = classNames(
    classes.line,
    {
      [classes.lineHorizontal]: orientation === 'horizontal',
      [classes.lineVertical]: orientation === 'vertical',
      [classes.alternativeLabelLine]: alternativeLabel,
    }
  );

  return (
    <div className={className} {...other}>
      <span className={lineClassName} />
    </div>
  );
}

StepConnector.propTypes = {
  /**
   * @ignore
   * Set internally by Step when it's supplied with the alternativeLabel prop.
   */
  alternativeLabel: PropTypes.bool,
  /**
   * Useful to extend the style applied to the component.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * @ignore
   */
  orientation: PropTypes.oneOf(["horizontal", "vertical"]).isRequired
};

export default withStyles(styleSheet)(StepConnector);
