// @flow

import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles, createStyleSheet } from "material-ui/styles";
import { Step, Stepper, StepLabel } from "material-ui/Stepper";
import Button from "material-ui/Button";

const styleSheet = createStyleSheet("HorizontalLinearStepper", theme => ({
  root: {
    width: '90%'
  },
  button: {
    marginRight: theme.spacing.unit
  }
}));


class HorizontalLinearStepper extends Component {
  state = {
    activeStep: 0,
    skipped: new Set(),
  };

  isStepOptional(step) {
    return step === 1;
  }

  isStepSkipped(step) {
    return this.state.skipped.has(step);
  }

  handleNext = () => {
    const activeStep = this.state.activeStep;
    let skipped = this.state.skipped;
    if (this.isStepSkipped(activeStep)) {
      skipped = new Set(skipped.values());
      skipped.delete(activeStep);
    }
    this.setState({
      activeStep: this.state.activeStep + 1,
      skipped,
    });
  };

  handleBack = () => {
    this.setState({
      activeStep: this.state.activeStep - 1
    });
  };

  handleSkip = () => {
    const activeStep = this.state.activeStep;
    if (!this.isStepOptional(activeStep)) {
      // You probably want to guard against something like this - it should never occur unless someone's actively
      // trying to break something.
      throw new Error("You can't skip a step that isn't optional.")
    }
    const skipped = new Set(this.state.skipped.values());
    skipped.add(activeStep);
    this.setState({
      activeStep: this.state.activeStep + 1,
      skipped,
    });
  }

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  getSteps() {
    return ["Select campaign settings", "Create an ad group", "Create an ad"];
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return "Select campaign settings...";
      case 1:
        return "What is an ad group anyways?";
      case 2:
        return "This is the bit I really care about!";
    }
  }

  render() {
    const classes = this.props.classes;
    const steps = this.getSteps();
    const activeStep = this.state.activeStep;

    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, step) => {
            const props = {};
            if (this.isStepOptional(step)) {
              props.optional = true;
            }
            if (this.isStepSkipped(step)) {
              props.completed = false;
            }
            return (
              <Step key={step} {...props}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div>
          {activeStep === steps.length
            ? <div>
                <p>All steps completed - you're finished</p>
                <Button onClick={this.handleReset} className={classes.button}>
                  Reset
                </Button>
              </div>
            : <div>
                <p>{this.getStepContent(activeStep)}</p>
                <div>
                  <Button disabled={activeStep === 0} onClick={this.handleBack} className={classes.button}>
                    Back
                  </Button>
                  {this.isStepOptional(activeStep) &&
                    <Button raised color="primary" onClick={this.handleSkip} className={classes.button}>
                      Skip
                    </Button>
                  }
                  <Button raised color="primary" onClick={this.handleNext} className={classes.button}>
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </div>
              </div>
          }
        </div>
      </div>
    );
  }
}

HorizontalLinearStepper.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styleSheet)(HorizontalLinearStepper);
