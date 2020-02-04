'use strict';
import { $ReadOnly } from "utility-types";












import * as React from "react";
import StyleSheet from "../StyleSheet/StyleSheet";
import View from "../Components/View/View";
import * as LogBoxData from "./Data/LogBoxData";
import LogBoxLog from "./Data/LogBoxLog";
import LogBoxLogNotification from "./UI/LogBoxNotification";

type Props = $ReadOnly<{
  logs: ReadonlyArray<LogBoxLog>;
  selectedLogIndex: number;
  isDisabled?: boolean | null | undefined;
}>;

export function _LogBoxNotificationContainer(props: Props): React.ReactNode {
  const {
    logs
  } = props;

  const onDismissWarns = () => {
    LogBoxData.clearWarnings();
  };
  const onDismissErrors = () => {
    LogBoxData.clearErrors();
  };

  const setSelectedLog = (index: number): void => {
    LogBoxData.setSelectedLog(index);
  };

  function openLog(log: LogBoxLog) {
    let index = logs.length - 1;

    // Stop at zero because if we don't find any log, we'll open the first log.
    while (index > 0 && logs[index] !== log) {
      index -= 1;
    }
    setSelectedLog(index);
  }

  if (logs.length === 0 || props.isDisabled === true) {
    return null;
  }

  const warnings = logs.filter(log => log.level === 'warn');
  const errors = logs.filter(log => log.level === 'error' || log.level === 'fatal');
  return <View style={styles.list}>
      {warnings.length > 0 && <View style={styles.toast}>
          <LogBoxLogNotification log={warnings[warnings.length - 1]} level="warn" totalLogCount={warnings.length} onPressOpen={() => openLog(warnings[warnings.length - 1])} onPressDismiss={onDismissWarns} />
        </View>}
      {errors.length > 0 && <View style={styles.toast}>
          <LogBoxLogNotification log={errors[errors.length - 1]} level="error" totalLogCount={errors.length} onPressOpen={() => openLog(errors[errors.length - 1])} onPressDismiss={onDismissErrors} />
        </View>}
    </View>;
}

const styles = StyleSheet.create({
  list: {
    bottom: 20,
    left: 10,
    right: 10,
    position: 'absolute'
  },
  toast: {
    borderRadius: 8,
    marginBottom: 5,
    overflow: 'hidden'
  }
});

export default (LogBoxData.withSubscription(_LogBoxNotificationContainer) as React.AbstractComponent<{}>);
