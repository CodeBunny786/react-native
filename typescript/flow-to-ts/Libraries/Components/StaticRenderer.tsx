'use strict';
import { $ReadOnly } from "utility-types";












const React = require('react');

type Props = $ReadOnly<{
  /**
   * Indicates whether the render function needs to be called again
   */
  shouldUpdate: boolean;

  /**
   * () => renderable
   * A function that returns a renderable component
   */
  render: () => React.ReactNode;
}>;

class StaticRenderer extends React.Component<Props> {

  shouldComponentUpdate(nextProps: Props): boolean {
    return nextProps.shouldUpdate;
  }

  render(): React.ReactNode {
    return this.props.render();
  }
}

module.exports = StaticRenderer;
