import React, { Component } from "react";
import PropTypes from "prop-types";
import baffle from "./baffle";
import pickBy from "lodash/pickBy";

export default class Baffle extends Component {
  static propTypes = {
    children: PropTypes.string,
    characters: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    exclude: PropTypes.array,
    speed: PropTypes.number,
    obfuscate: PropTypes.bool,
    update: PropTypes.bool,
    revealDuration: PropTypes.number,
    revealDelay: PropTypes.number
  };

  static defaultProps = {
    characters:
      "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz~!@#$%^&*()-+=[]{}|;:,./<>?",
    exclude: [" "],
    speed: 50,
    obfuscate: true,
    update: true,
    revealDuration: 1000,
    revealDelay: 0
  };

  componentDidMount() {
    const {
      update,
      obfuscate,
      characters,
      exclude,
      speed,
      revealDuration,
      revealDelay
    } = this.props;

    const options = pickBy(
      { characters, exclude, speed },
      value => value !== undefined
    );

    this.baffle = baffle(this.span, options);

    if (update && obfuscate) {
      this.baffle.start();
    } else if (!update && obfuscate) {
      this.baffle.once();
    } else if (update && !obfuscate) {
      this.baffle.start();
      this.baffle.reveal(revealDuration, revealDelay);
    }
  }

  // TODO: clean up this function, it's gross
  componentDidUpdate(prevProps) {
    const {
      children,
      characters,
      exclude,
      speed,
      obfuscate,
      update,
      revealDuration,
      revealDelay
    } = this.props;

    const options = pickBy(
      { characters, exclude, speed },
      (value, key) => value !== prevProps[key]
    );

    this.baffle.set(options);

    if (
      (update && !prevProps.update && obfuscate) ||
      (obfuscate && !prevProps.obfuscate && update)
    ) {
      this.baffle.start();
    } else if (!update && prevProps.update) {
      this.baffle.stop();
    }

    if (!obfuscate && prevProps.obfuscate) {
      if (!update) {
        this.baffle.reveal();
      } else {
        this.baffle.reveal(revealDuration, revealDelay);
      }
    }

    if (obfuscate && !prevProps.obfuscate && !update) {
      this.baffle.once();
    }

    if (children !== prevProps.children) {
      this.baffle.text(() => children);
    }
  }

  render() {
    const { children } = this.props;
    return <span ref={span => (this.span = span)}>{children}</span>;
  }
}
