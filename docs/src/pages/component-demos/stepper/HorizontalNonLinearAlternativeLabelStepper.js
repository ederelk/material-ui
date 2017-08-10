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

class HorizontalLabelPositionBelowStepper extends Component {
  state = {
    activeStep: 0,
    completed: {},
  };

  handleNext = () => {
    this.setState({
      activeStep: this.state.activeStep + 1
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
    const completed = this.state.completed;
    completed[this.state.activeStep] = true;
    this.setState({
      completed,
      activeStep: this.state.activeStep + 1,
    });
  }

  handleFinish = () => {
    this.setState({
      activeStep: 4,
    })
  }

  handleReset = () => {
    this.setState({
      activeStep: 0,
      completed: {},
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
      default:
        return "You're a long way from home sonny jim!";
    }
  }

  render() {
    const classes = this.props.classes;
    const steps = this.getSteps();
    const activeStep = this.state.activeStep;

    return (
      <div className={classes.root}>
        <Stepper nonLinear activeStep={activeStep} alternativeLabel>
          {steps.map((label, i) => (
            <Step key={i}>
              <StepButton onClick={this.handleStep(i)} completed={this.state.completed[i]}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <div>
          {this.state.activeStep === steps.length + 1
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
                  {Object.keys(this.state.completed).length === 3 &&
                    <Button raised color="primary" onClick={this.handleFinish} className={classes.button}>
                      Finish
                    </Button>
                  }
                  {activeStep !== steps.length && (
                    this.state.completed[this.state.activeStep]
                      ? <Typography type="caption" className={classes.completed}>Step {activeStep + 1} already completed</Typography>
                      : <Button raised color="primary" onClick={this.handleComplete}>
                          Complete Step
                        </Button>
                  )}
                </div>
              </div>}
        </div>
      </div>
    );
  }
}

HorizontalLabelPositionBelowStepper.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styleSheet)(HorizontalLabelPositionBelowStepper);
