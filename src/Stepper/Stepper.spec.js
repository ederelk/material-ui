/* eslint-env mocha */

import React from 'react';
import { assert } from 'chai';
import { createShallow, createMount, getClasses } from '../test-utils';
import Step from './Step';
import StepConnector from './StepConnector';
import Stepper from './Stepper';
import CheckCircle from '../svg-icons/CheckCircle'

describe('<Stepper />', () => {
  let shallow;
  let mount;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<Stepper />);
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  it('merges user className into the root node', () => {
    const wrapper = shallow(<Stepper className="foo" />);

    assert.include(wrapper.props().className, 'foo');
  });

  it('should render a Paper component', () => {
    const wrapper = shallow(<Stepper />);
    assert.strictEqual(wrapper.name(), 'withStyles(Paper)');
    assert.strictEqual(wrapper.props().elevation, 0, 'should have no elevation');
  });

  describe('rendering children', () => {
    it('renders 3 children with connectors as separators', () => {
      const wrapper = shallow(
        <Stepper>
          <div />
          <div />
          <div />
        </Stepper>
      );

      const children = wrapper.children();

      assert.strictEqual(children.length, 5);
      assert.lengthOf(wrapper.childAt(1).find(StepConnector), 1);
      assert.lengthOf(wrapper.childAt(3).find(StepConnector), 1);
    });
  });

  describe('controlling child props', () => {
    it('controls children linearly based on the activeStep prop', () => {
      const wrapper = shallow(
        <Stepper activeStep={0}>
          <div className="child-0" />
          <div className="child-1" />
          <div className="child-2" />
        </Stepper>
      );
      assert.ok(wrapper.find('.child-0').prop('active'));
      assert.notOk(wrapper.find('.child-1').prop('active'));
      assert.notOk(wrapper.find('.child-2').prop('active'));
      assert.ok(wrapper.find('.child-1').prop('disabled'));
      assert.ok(wrapper.find('.child-2').prop('disabled'));
      wrapper.setProps({activeStep: 1});
      assert.ok(wrapper.find('.child-0').prop('completed'));
      assert.notOk(wrapper.find('.child-0').prop('active'));
      assert.ok(wrapper.find('.child-1').prop('active'));
      assert.notOk(wrapper.find('.child-2').prop('active'));
      assert.ok(wrapper.find('.child-2').prop('disabled'));
    });

    it('controls children non-linearly based on the activeStep prop', () => {
      const wrapper = shallow(
        <Stepper linear={false} activeStep={0}>
          <div className="child-0" />
          <div className="child-1" />
          <div className="child-2" />
        </Stepper>
      );
      assert.ok(wrapper.find('.child-0').prop('active'));
      assert.notOk(wrapper.find('.child-1').prop('active'));
      assert.notOk(wrapper.find('.child-2').prop('active'));
      wrapper.setProps({activeStep: 1});
      assert.notOk(wrapper.find('.child-0').prop('active'));
      assert.ok(wrapper.find('.child-1').prop('active'));
      assert.notOk(wrapper.find('.child-2').prop('active'));
      wrapper.setProps({activeStep: 2});
      assert.notOk(wrapper.find('.child-0').prop('active'));
      assert.notOk(wrapper.find('.child-1').prop('active'));
      assert.ok(wrapper.find('.child-2').prop('active'));
    });

    it('passes last down correctly when rendering children containing arrays', () => {
      const wrapper = shallow(
        <Stepper linear={false}>
          <div />
          {[
            <div key={1} />,
            <div key={2} />,
          ]}
        </Stepper>
      );

      const steps = wrapper.children().find('div');
      assert.strictEqual(steps.at(0).props().last, undefined);
      assert.strictEqual(steps.at(1).props().last, undefined);
      assert.strictEqual(steps.at(2).props().last, true);
    });
  });

  describe('step connector', () => {
    it('should have a default step connector', () => {
      const wrapper = shallow(
        <Stepper>
          <Step /><Step />
        </Stepper>
      );

      assert.strictEqual(wrapper.find(StepConnector).length, 1, 'should contain a <StepConnector /> child');
    });

    it('should allow the developer to specify a custom step connector', () => {
      const wrapper = shallow(
        <Stepper
          connector={<CheckCircle />}
        >
          <Step /><Step />
        </Stepper>
      );

      assert.strictEqual(wrapper.find(CheckCircle).length, 1, 'should contain a <CheckCircle /> child');
      assert.strictEqual(wrapper.find(StepConnector).length, 0, 'should not contain a <StepConnector /> child');
    });

    it('should allow the step connector to be removed', () => {
      const wrapper = shallow(
        <Stepper connector={null}>
          <Step /><Step />
        </Stepper>
      );

      assert.lengthOf(wrapper.find(StepConnector), 0, 'should not contain a <StepConnector /> child');
    });
  });
});
