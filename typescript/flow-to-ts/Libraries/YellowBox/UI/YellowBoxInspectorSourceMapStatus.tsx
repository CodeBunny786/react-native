'use strict';;
import Animated from '../../Animated/src/Animated';
import Easing from '../../Animated/src/Easing';
import React from 'react';
import StyleSheet from '../../StyleSheet/StyleSheet';
import Text from '../../Text/Text';
import YellowBoxImageSource from './YellowBoxImageSource';
import YellowBoxPressable from './YellowBoxPressable';
import YellowBoxStyle from './YellowBoxStyle';
import { $ReadOnly } from "utility-types";












import { CompositeAnimation } from "../../Animated/src/AnimatedImplementation";
import AnimatedInterpolation from "../../Animated/src/nodes/AnimatedInterpolation";
import { PressEvent } from "../../Types/CoreEventTypes";

type Props = $ReadOnly<{
  onPress?: ((event: PressEvent) => void) | null | undefined;
  status: "COMPLETE" | "FAILED" | "NONE" | "PENDING";
}>;

type State = {
  animation: CompositeAnimation | null | undefined;
  rotate: AnimatedInterpolation | null | undefined;
};

class YellowBoxInspectorSourceMapStatus extends React.Component<Props, State> {

  state: State = {
    animation: null,
    rotate: null
  };

  render(): React.ReactNode {
    let image;
    switch (this.props.status) {
      case 'COMPLETE':
        image = YellowBoxImageSource.check;
        break;
      case 'FAILED':
        image = YellowBoxImageSource.alertTriangle;
        break;
      case 'PENDING':
        image = YellowBoxImageSource.loader;
        break;

    }

    return image == null ? null : <YellowBoxPressable backgroundColor={{
      default: YellowBoxStyle.getTextColor(0.8),
      pressed: YellowBoxStyle.getTextColor(0.6)
    }} hitSlop={{ bottom: 8, left: 8, right: 8, top: 8 }} onPress={this.props.onPress} style={StyleSheet.compose(styles.root, this.props.status === 'PENDING' ? styles.pending : null)}>
        <Animated.Image source={{ height: 16, uri: image, width: 16 }} style={StyleSheet.compose(styles.image, this.state.rotate == null ? null : { transform: [{ rotate: this.state.rotate }] })} />
        <Text style={styles.text}>Source Map</Text>
      </YellowBoxPressable>;
  }

  componentDidMount(): void {
    this._updateAnimation();
  }

  componentDidUpdate(): void {
    this._updateAnimation();
  }

  componentWillUnmount(): void {
    if (this.state.animation != null) {
      this.state.animation.stop();
    }
  }

  _updateAnimation(): void {
    if (this.props.status === 'PENDING') {
      if (this.state.animation == null) {
        const animated = new Animated.Value(0);
        const animation = Animated.loop(Animated.timing(animated, {
          duration: 2000,
          easing: Easing.linear,
          toValue: 1,
          useNativeDriver: true
        }));
        this.setState({
          animation,
          rotate: animated.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
          })
        }, () => {
          animation.start();
        });
      }
    } else {
      if (this.state.animation != null) {
        this.state.animation.stop();
        this.setState({
          animation: null,
          rotate: null
        });
      }
    }
  }
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    borderRadius: 12,
    flexDirection: 'row',
    height: 24,
    paddingHorizontal: 8
  },
  pending: {
    backgroundColor: YellowBoxStyle.getTextColor(0.6)
  },
  image: {
    marginEnd: 4,
    tintColor: YellowBoxStyle.getBackgroundColor(1)
  },
  text: {
    color: YellowBoxStyle.getBackgroundColor(1),
    fontSize: 12,
    includeFontPadding: false,
    lineHeight: 16
  }
});

export default YellowBoxInspectorSourceMapStatus;;
