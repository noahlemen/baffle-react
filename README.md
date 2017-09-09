# baffle-react
[![CircleCI](https://img.shields.io/circleci/project/github/kedromelon/baffle-react.svg?style=flat-square)](https://circleci.com/gh/kedromelon/baffle-react/)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://prettier.io/)

> [Baffle](https://camwiegert.github.io/baffle/) as a React component

_i haven't published this yet but once i have you can do the following_

## install

##### via npm
```sh
npm install --save baffle-react
```

##### via yarn
```sh
yarn add baffle-react
```

## use

### example

```jsx
import React, { Component } from "react";
import Baffle from "baffle-react";

export default class Demo extends Component {
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
```

### props

prop | type | default | description
:--- | :---:| :-----: | :---
`children` | `string` || Text to be obfuscated
`characters` | `string\|array` | `"AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz~!@#$%^&*()-+=[]{}\|;:,./<>?"` | Character set to be used for obfuscation. See [baffle.js `options.characters`](https://camwiegert.github.io/baffle/#options)
`exclude` | `array` | `[" "]` | Character set to be ignored during obfuscation. See [baffle.js `options.exclude`](https://camwiegert.github.io/baffle/#options)
`speed` | `number` | `50` | Frequency (in milliseconds) at which baffle re-obfuscates text while `props.update` is `true`. See [baffle.js `options.speed`](https://camwiegert.github.io/baffle/#options)
`obfuscate` | `bool` | `true` | When `true`, text is obfuscated.
`update` | `bool` | `true` | While `true`, obfuscated text updates every `props.speed` milliseconds.
`revealDuration` | `number` | `1000` | When `props.obfuscate` changes from `true` to `false` and `props.update` is `true`, the duration in milliseconds over which text is revealed. See [baffle.js `reveal()`](https://camwiegert.github.io/baffle/#methods)
`revealDelay` | `number` | `0` | When `props.obfuscate` changes from `true` to `false` and `props.update` is `true`, the delay before `revealDuration` begins. See [baffle.js `reveal()`](https://camwiegert.github.io/baffle/#methods)
