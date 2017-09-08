import React from "react";
import { render } from "react-dom";

import Component from "../../src";

let Demo = React.createClass({
  render() {
    return (
      <div>
        <h1>baffle-react Demo</h1>
        <Component speed={0} characters={"!ab-"}>
          foofoofoofoofoo
        </Component>
      </div>
    );
  }
});

render(<Demo />, document.querySelector("#demo"));
