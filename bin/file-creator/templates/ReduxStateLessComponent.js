module.exports = `import React, { Component } from "react";
import { Text, StyleSheet } from "react-native";

// redux
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

// import actions here
//ACTION_IMPORT

const styles = StyleSheet.create({});

const -COMPONENT_NAME- = (props) => {
  return <Text>-COMPONENT_NAME- works!</Text>;
}

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