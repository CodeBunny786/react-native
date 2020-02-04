'use strict';












const DeprecatedColorPropType = require('./DeprecatedColorPropType');
const DeprecatedViewStylePropTypes = require('./DeprecatedViewStylePropTypes');
const ReactPropTypes = require('prop-types');

const DeprecatedTextStylePropTypes = {
  ...DeprecatedViewStylePropTypes,

  color: DeprecatedColorPropType,
  fontFamily: ReactPropTypes.string,
  fontSize: ReactPropTypes.number,
  fontStyle: (ReactPropTypes.oneOf(['normal', 'italic']) as React$PropType$Primitive<"normal" | "italic">),

  /**
   * Specifies font weight. The values 'normal' and 'bold' are supported for
   * most fonts. Not all fonts have a variant for each of the numeric values,
   * in that case the closest one is chosen.
   */
  fontWeight: (ReactPropTypes.oneOf(['normal'
  /*default*/
  , 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900']) as React$PropType$Primitive<"normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900">),
  fontVariant: (ReactPropTypes.arrayOf(ReactPropTypes.oneOf(['small-caps', 'oldstyle-nums', 'lining-nums', 'tabular-nums', 'proportional-nums'])) as React$PropType$Primitive<Array<"small-caps" | "oldstyle-nums" | "lining-nums" | "tabular-nums" | "proportional-nums">>),
  textShadowOffset: (ReactPropTypes.shape({
    width: ReactPropTypes.number,
    height: ReactPropTypes.number
  }) as React$PropType$Primitive<{
    height?: number;
    width?: number;

  }>),
  textShadowRadius: ReactPropTypes.number,
  textShadowColor: DeprecatedColorPropType,

  /**
   * @platform ios
   */
  letterSpacing: ReactPropTypes.number,
  lineHeight: ReactPropTypes.number,

  /**
   * Specifies text alignment. The value 'justify' is only supported on iOS and
   * fallbacks to `left` on Android.
   */
  textAlign: (ReactPropTypes.oneOf(['auto'
  /*default*/
  , 'left', 'right', 'center', 'justify']) as React$PropType$Primitive<"auto" | "left" | "right" | "center" | "justify">),

  /**
   * @platform android
   */
  textAlignVertical: (ReactPropTypes.oneOf(['auto'
  /*default*/
  , 'top', 'bottom', 'center']) as React$PropType$Primitive<"auto" | "top" | "bottom" | "center">),

  /**
   * Set to `false` to remove extra font padding intended to make space for certain ascenders / descenders.
   * With some fonts, this padding can make text look slightly misaligned when centered vertically.
   * For best results also set `textAlignVertical` to `center`. Default is true.
   * @platform android
   */
  includeFontPadding: ReactPropTypes.bool,
  textDecorationLine: (ReactPropTypes.oneOf(['none'
  /*default*/
  , 'underline', 'line-through', 'underline line-through']) as React$PropType$Primitive<"none" | "underline" | "line-through" | "underline line-through">),

  /**
   * @platform ios
   */
  textDecorationStyle: (ReactPropTypes.oneOf(['solid'
  /*default*/
  , 'double', 'dotted', 'dashed']) as React$PropType$Primitive<"solid" | "double" | "dotted" | "dashed">),

  /**
   * @platform ios
   */
  textDecorationColor: DeprecatedColorPropType,
  textTransform: (ReactPropTypes.oneOf(['none'
  /*default*/
  , 'capitalize', 'uppercase', 'lowercase']) as React$PropType$Primitive<"none" | "capitalize" | "uppercase" | "lowercase">),

  /**
   * @platform ios
   */
  writingDirection: (ReactPropTypes.oneOf(['auto'
  /*default*/
  , 'ltr', 'rtl']) as React$PropType$Primitive<"auto" | "ltr" | "rtl">)
};

module.exports = DeprecatedTextStylePropTypes;
