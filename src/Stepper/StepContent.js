import React, {Component} from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import classNames from "classnames";
import TransitionComponent from '../internal/ExpandTransition';
import withStyles from "../styles/withStyles";

function ExpandTransition(props) {
  return <TransitionComponent {...props} />;
}

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
    children,
    className: classNameProp,
    classes,
    completed, // eslint-disable-line no-unused-vars
    last, // eslint-disable-line no-unused-vars
    transition,
    transitionDuration,
    orientation,
    ...other
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
    enterDelay: transitionDuration,
    transitionDuration: transitionDuration,
    open: active,
  };

  return (
    <div className={className} {...other}>
      {React.createElement(transition, transitionProps, <div style={{overflow: 'hidden'}}>{children}</div>)}
    </div>
  );
}

StepContent.propTypes = {
  /**
   * Expands the content
   */
  active: PropTypes.bool,
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
   * ReactTransitionGroup component.
   */
  transition: PropTypes.func,
  /**
   * Adjust the duration of the content expand transition. Passed as a prop to the transition component.
   */
  transitionDuration: PropTypes.number,
};

StepContent.defaultProps = {
  transition: ExpandTransition,
  transitionDuration: 450,
};

export default withStyles(styles)(StepContent);
