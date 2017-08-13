// @flow

import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles, createStyleSheet } from "material-ui/styles";
import { Step, Stepper, StepLabel, StepButton } from "material-ui/Stepper";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";

const styleSheet = createStyleSheet("HorizontalLabelPositionBelowStepper", theme => ({
  root: {
    width: '90%'
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  backButton: {
    marginRight: theme.spacing.unit
  },
  completed: {
    display: 'inline-block',
  },
}));

class HorizontalNonLinearAlternativeLabelStepper extends Component {
  state = {
    activeStep: 0,
    completed: new Set(),
    skipped: new Set(),
  };

  totalSteps() {
    return this.getSteps().length;
  }

  isStepComplete(step) {
    return this.state.completed.has(step);
  }

  completedSteps() {
    return this.state.completed.size;
  }

  allStepsCompleted() {
    return this.completedSteps() === this.totalSteps() - this.skippedSteps();
  }

  isLastStep() {
    return this.state.activeStep === this.totalSteps() - 1;
  }

  isStepOptional(step) {
    return step === 1;
  }

  isStepSkipped(step) {
    return this.state.skipped.has(step);
  }

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

  skippedSteps() {
    return this.state.skipped.size;
  }

  handleNext = () => {
    let activeStep;

    if (this.isLastStep() && !this.allStepsCompleted()) {
      // It's the last step, but not all steps have been completed - find the first step that has been completed
      const steps = this.getSteps();
      activeStep = steps.findIndex((step, i) => !this.state.completed.has(i));
    } else {
      activeStep = this.state.activeStep + 1;
    }
    this.setState({
      activeStep,
    });
  };

  handleBack = () => {
    this.setState({
      activeStep: this.state.activeStep - 1
    });
  };

  handleStep = step => () => {
    this.setState({
      activeStep: step,
    });
  }

  handleComplete = () => {
    const completed = new Set(this.state.completed.values());
    completed.add(this.state.activeStep);
    this.setState({
      completed,
    });
    if (!this.allStepsCompleted()) {
      this.handleNext();
    }
  }

  handleReset = () => {
    this.setState({
      activeStep: 0,
      completed: new Set(),
      skipped: new Set(),
    });
  };

  getSteps() {
    return ["Select campaign settings", "Create an ad group", "Create an ad"];
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return "Step 1: Select campaign settings...";
      case 1:
        return "Step 2: What is an ad group anyways?";
      case 2:
        return "Step 3: This is the bit I really care about!";
    }
  }

  render() {
    const classes = this.props.classes;
    const steps = this.getSteps();
    const activeStep = this.state.activeStep;

    return (
      <div className={classes.root}>
        <Stepper alternativeLabel nonLinear activeStep={activeStep}>
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
                <StepButton onClick={this.handleStep(step)} completed={this.isStepComplete(step)}>
                  {label}
                </StepButton>
              </Step>
            );
          })}
        </Stepper>
        <div>
          {this.allStepsCompleted()
            ? <div>
                <p>All steps completed - you're finished</p>
                <Button onClick={this.handleReset}>
                  Reset
                </Button>
              </div>
            : <div>
                <p>{this.getStepContent(activeStep)}</p>
                <div>
                  <Button disabled={activeStep === 0} onClick={this.handleBack} className={classes.button}>
                    Back
                  </Button>
                  < Button raised color="primary" onClick={this.handleNext} className={classes.button}>
                    Next
                  </Button>
                  {this.isStepOptional(activeStep) &&
                    <Button raised color="primary" onClick={this.handleSkip} className={classes.button}>
                      Skip
                    </Button>
                  }
                  {activeStep !== steps.length && (
                    this.state.completed.has(this.state.activeStep)
                      ? <Typography type="caption" className={classes.completed}>Step {activeStep + 1} already completed</Typography>
                      : <Button raised color="primary" onClick={this.handleComplete}>
                        {this.completedSteps() === this.totalSteps() - 1
                          ? 'Finish'
                          : 'Complete Step'
                        }
                        </Button>
                  )}
                </div>
              </div>
          }
        </div>
      </div>
    );
  }
}

HorizontalNonLinearAlternativeLabelStepper.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styleSheet)(HorizontalNonLinearAlternativeLabelStepper);
