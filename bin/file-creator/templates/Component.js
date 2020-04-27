module.exports = `import React, { Component } from "react";
import { Text, StyleSheet } from "react-native";

export default class -COMPONENT_NAME- extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return <Text>-COMPONENT_NAME- works!</Text>;
  }
}

const styles = StyleSheet.create({});
`;
