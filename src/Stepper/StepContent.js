import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import classNames from "classnames";
import Collapse from '../transitions/Collapse';
import withStyles from "../styles/withStyles";


export const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit,
    marginLeft: 12, // half icon
    marginBottom: 0,
    paddingTop: 0,
    paddingLeft: theme.spacing.unit + 12, // margin + half icon
    paddingRight: theme.spacing.unit,
    overflow: 'hidden',
    borderLeft: `1px solid ${theme.palette.line.stepper}`,
  },
  last: {
    borderLeft: 'none',
  }
});


function StepContent(props) {
  const {
    active,
    alternativeLabel, // estline-disable-line no-unused-vars
    children,
    className: classNameProp,
    classes,
    completed, // eslint-disable-line no-unused-vars
    last,
    transition,
    transitionDuration,
    orientation,
    optional, // eslint-disable-line no-unused-vars
  } = props;

  if (orientation !== 'vertical') {
    warning(false, 'Material-UI: <StepContent /> is only designed for use with the vertical stepper.');
    return null;
  }

  const className = classNames(
    classes.root,
    {
      [classes.last]: last,
    },
    classNameProp
  );

  const transitionProps = {
    in: active,
    transitionDuration: transitionDuration,
    unmountOnExit: true,
  };

  return (
    <div className={className}>
      {React.createElement(transition, transitionProps, children)}
    </div>
  );
}

StepContent.propTypes = {
  /**
   * Expands the content
   */
  active: PropTypes.bool,
  /**
   * @ignore
   * Set internally by Step when it's supplied with the alternativeLabel prop.
   */
  alternativeLabel: PropTypes.bool,
  /**
   * Step content
   */
  children: PropTypes.node,
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
  completed: PropTypes.bool,
  /**
   * @ignore
   */
  last: PropTypes.bool,
  /**
   * @ignore
   */
  orientation: PropTypes.oneOf(["vertical"]).isRequired,
  /**
   * @ignore
   * Set internally by Step when it's supplied with the optional prop.
   */
  optional: PropTypes.bool,
  /**
   * Collapse component.
   */
  transition: PropTypes.func,
  /**
   * Adjust the duration of the content expand transition. Passed as a prop to the transition component.
   */
  transitionDuration: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

StepContent.defaultProps = {
  transition: Collapse,
  transitionDuration: 'auto',
};

export default withStyles(styles)(StepContent);
