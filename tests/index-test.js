import { createRenderer } from "react-test-renderer/shallow";
import sinon from "sinon";
import expect from "expect";
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import * as baffle from "src/baffle";

function shallow(el) {
  const shallowRenderer = createRenderer();
  shallowRenderer.render(el);
  return shallowRenderer.getRenderOutput();
}

function instance(el) {
  const shallowRenderer = createRenderer();
  shallowRenderer.render(el);
  return shallowRenderer._instance._instance;
}

import Baffle from "src/";

describe("Baffle", () => {
  let baffled;

  beforeEach(() => {
    sinon.stub(baffle, "default");

    baffled = {
      start: sinon.spy(),
      stop: sinon.spy(),
      once: sinon.spy(),
      reveal: sinon.spy(),
      text: sinon.spy()
    };

    baffle.default.returns(baffled);
  });

  afterEach(() => {
    baffle.default.restore();
  });

  it("initializes baffle with default options", () => {
    const component = instance(<Baffle />);

    component.render();
    component.componentDidMount();

    expect(
      baffle.default.calledWith(component.span, {
        characters:
          "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz~!@#$%^&*()-+=[]{}|;:,./<>?",
        exclude: [" "],
        speed: 50
      })
    ).toBe(true);

    expect(baffled.start.called).toBe(true);
  });
});
