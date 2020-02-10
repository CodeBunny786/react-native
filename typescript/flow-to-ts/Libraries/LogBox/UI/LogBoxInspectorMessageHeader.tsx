'use strict';
import { $ReadOnly } from "utility-types";












import * as React from "react";
import StyleSheet from "../../StyleSheet/StyleSheet";
import Text from "../../Text/Text";
import View from "../../Components/View/View";
import * as LogBoxStyle from "./LogBoxStyle";
import LogBoxMessage from "./LogBoxMessage";
import { LogLevel } from "../Data/LogBoxLog";
import { Message } from "../Data/parseLogBoxLog";

type Props = $ReadOnly<{
  collapsed: boolean;
  message: Message;
  level: LogLevel;
  title: string;
  onPress: (() => void);
}>;

const SHOW_MORE_MESSAGE_LENGTH = 300;

function LogBoxInspectorMessageHeader(props: Props): React.ReactNode {
  return null as any;
}

const messageStyles = StyleSheet.create({
  body: {
    backgroundColor: LogBoxStyle.getBackgroundColor(1),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    shadowOpacity: 0.5,
    flex: 0
  },
  bodyText: {
    color: LogBoxStyle.getTextColor(1),
    fontSize: 14,
    includeFontPadding: false,
    lineHeight: 20,
    fontWeight: '500',
    paddingHorizontal: 12,
    paddingBottom: 10
  },
  heading: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 12,
    marginTop: 10,
    marginBottom: 5
  },
  headingText: {
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
    includeFontPadding: false,
    lineHeight: 28
  },
  warn: {
    color: LogBoxStyle.getWarningColor(1)
  },
  error: {
    color: LogBoxStyle.getErrorColor(1)
  },
  fatal: {
    color: LogBoxStyle.getFatalColor(1)
  },
  syntax: {
    color: LogBoxStyle.getFatalColor(1)
  },
  messageText: {
    color: LogBoxStyle.getTextColor(0.6)
  },
  collapse: {
    color: LogBoxStyle.getTextColor(0.7),
    fontSize: 14,
    fontWeight: '300',
    lineHeight: 12
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 3
  }
});

export default LogBoxInspectorMessageHeader;
