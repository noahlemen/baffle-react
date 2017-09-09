import React, { Component } from "react";
import { render } from "react-dom";

import Baffle from "../../src";

class Demo extends Component {
  state = {
    update: true,
    obfuscate: true
  };

  render() {
    const { update, obfuscate } = this.state;

    return (
      <div>
        <button onClick={() => this.setState({ update: !update })}>
          {update ? "Pause" : "Start"}
        </button>
        <button onClick={() => this.setState({ obfuscate: !obfuscate })}>
          {obfuscate ? "Reveal" : "Obfuscate"}
        </button>
        <br />
        <Baffle
          speed={50}
          characters="!@#$%^&*"
          exclude={[" ", "!"]}
          obfuscate={obfuscate}
          update={update}
          revealDuration={1000}
          revealDelay={0}
        >
          !!!foo bar baz!!!
        </Baffle>
      </div>
    );
  }
}

render(<Demo />, document.querySelector("#demo"));
