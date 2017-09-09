import React, { Component } from "react";
import { render } from "react-dom";

import Baffle from "../../src";

class Demo extends Component {
  render() {
    return (
      <div>
        <h1>baffle-react Demo</h1>
        <Baffle speed={50} characters={"!ab-"} obfuscate update={false}>
          foofoofoofoofoo
        </Baffle>
      </div>
    );
  }
}

render(<Demo />, document.querySelector("#demo"));
