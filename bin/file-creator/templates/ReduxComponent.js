module.exports = `import React, { Component } from "react";
import { Text, StyleSheet } from "react-native";

// redux
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

// import actions here
//ACTION_IMPORT

class -COMPONENT_NAME- extends Component {
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

const mapStateToProps = state => {
  return {
    state,
    -COMPONENT_NAME-: state.-COMPONENT_NAME-Reducers
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      //ACTION_TO_PROPS
    },
    dispatch,
  );
export default connect(mapStateToProps, mapDispatchToProps)(-COMPONENT_NAME-);

`;
