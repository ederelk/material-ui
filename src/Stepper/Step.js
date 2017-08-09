// @flow weak

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { createStyleSheet } from "jss-theme-reactor";
import withStyles from "../styles/withStyles";

export const styleSheet = createStyleSheet("MuiStep", theme => ({
  root: {
    flex: "0 0 auto"
  },
  horizontal: {
    marginLeft: -6,
  },
  vertical: {
    marginLeft: -14,
  },
  alternativeLabel: {
    flex: 1,
    position: "relative",
    marginLeft: 0,
  }
}));

function Step(props) {
  const {
    active,
    alternativeLabel,
    completed,
    connector,
    disabled,
    index,
    last,
    orientation,
    children,
    classes,
    ...other
  } = props;

  const className = classNames(
    classes.root,
    classes[orientation],
    { [classes.alternativeLabel]: alternativeLabel },
  );

  return (
    <div className={className} {...other}>
      {React.Children.map(children, child =>
        React.cloneElement(
          child,
          {
            active,
            alternativeLabel,
            completed,
            connector,
            disabled,
            icon: index + 1,
            last,
            orientation,
            ...child.props,
          },
        )
      )}
      {alternativeLabel && !last &&
        React.cloneElement(connector, { orientation, alternativeLabel })
      }
    </div>
  );
}

Step.propTypes = {
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
   * Should be `Step` sub-components such as `StepLabel`.
   */
  children: PropTypes.node,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * @ignore
   * Passed down from Stepper if alternativeLabel is also set.
   */
  connector: PropTypes.node,
  /**
   * Mark the step as disabled, will also disable the button if
   * `StepButton` is a child of `Step`. Is passed to child components.
   */
  disabled: PropTypes.bool,
  /**
   * @ignore
   * Used internally for numbering.
   */
  index: PropTypes.number.isRequired,
  /**
   * @ignore
   */
  last: PropTypes.bool,
  /**
   * @ignore
   */
  orientation: PropTypes.oneOf(["horizontal", "vertical"]).isRequired,
  /**
   * @ignore
   */
  totalSteps: PropTypes.number.isRequired,
};

export default withStyles(styleSheet)(Step);
