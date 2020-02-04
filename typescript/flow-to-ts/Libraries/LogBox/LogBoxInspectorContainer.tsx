'use strict';
import { $ReadOnly } from "utility-types";












import * as React from "react";
import { View, StyleSheet } from "react-native";
import * as LogBoxData from "./Data/LogBoxData";
import LogBoxInspector from "./UI/LogBoxInspector";
import LogBoxLog from "./Data/LogBoxLog";

type Props = $ReadOnly<{
  logs: ReadonlyArray<LogBoxLog>;
  selectedLogIndex: number;
  isDisabled?: boolean | null | undefined;
}>;

export class _LogBoxInspectorContainer extends React.Component<Props> {

  render(): React.ReactNode {
    return <View style={StyleSheet.absoluteFill}>
        <LogBoxInspector onDismiss={this._handleDismiss} onMinimize={this._handleMinimize} onChangeSelectedIndex={this._handleSetSelectedLog} logs={this.props.logs} selectedIndex={this.props.selectedLogIndex} />
      </View>;
  }

  _handleDismiss = (): void => {
    // Here we handle the cases when the log is dismissed and it
    // was either the last log, or when the current index
    // is now outside the bounds of the log array.
    const {
      selectedLogIndex,
      logs
    } = this.props;
    const logsArray = Array.from(logs);
    if (selectedLogIndex != null) {
      if (logsArray.length - 1 <= 0) {
        LogBoxData.setSelectedLog(-1);
      } else if (selectedLogIndex >= logsArray.length - 1) {
        LogBoxData.setSelectedLog(selectedLogIndex - 1);
      }

      LogBoxData.dismiss(logsArray[selectedLogIndex]);
    }
  };

  _handleMinimize = (): void => {
    LogBoxData.setSelectedLog(-1);
  };

  _handleSetSelectedLog = (index: number): void => {
    LogBoxData.setSelectedLog(index);
  };
}

export default (LogBoxData.withSubscription(_LogBoxInspectorContainer) as React.AbstractComponent<{}>);
