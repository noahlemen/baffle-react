import React, { Component } from "react";
import PropTypes from "prop-types";
import baffle from "baffle";
import pickBy from "lodash/pickBy";

class Baffle extends Component {
  static propTypes = {
    children: PropTypes.string,
    characters: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    exclude: PropTypes.array,
    speed: PropTypes.number,
    obfuscate: PropTypes.bool,
    update: PropTypes.bool
  };

  static defaultProps = {
    characters:
      "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz~!@#$%^&*()-+=[]{}|;:,./<>?",
    exclude: [" "],
    speed: 50,
    obfuscate: true,
    update: true
  };

  componentDidMount() {
    const { characters, exclude, speed } = this.props;

    const options = pickBy(
      { characters, exclude, speed },
      value => value !== undefined
    );

    console.log(options);

    this.baffle = baffle(this.span, options);
    this.baffle.start(); // TODO need to deal w non-option props
  }

  componentWillUnmount() {
    this.baffle.stop();
  }

  // TODO: clean up this function, it's gross
  componentDidUpdate(prevProps) {
    const {
      children,
      characters,
      exclude,
      speed,
      obfuscate,
      update
    } = this.props;

    if (update && (!prevProps.update || (obfuscate && !prevProps.obfuscate))) {
      this.baffle.start();
    } else if (!update && prevProps.update) {
      this.baffle.stop();
    }

    if (!obfuscate && prevProps.obfuscate) {
      this.baffle.reveal(); // TODO implement reveal speed and delay
    } else if (obfuscate && !prevProps.obfuscate && !update) {
      this.baffle.once();
    }

    if (children !== prevProps.children) {
      this.baffle.text(() => children);
    }

    const options = pickBy(
      { characters, exclude, speed },
      (value, key) => value !== prevProps[key]
    );

    this.baffle.set(options);
  }

  render() {
    const { children } = this.props;
    return <span ref={span => (this.span = span)}>{children}</span>;
  }
}

export default Baffle;
