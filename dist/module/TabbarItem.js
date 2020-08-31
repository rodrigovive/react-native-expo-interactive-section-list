import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { tabbarItemStyles as styles } from './styles';

const TabbarItem = ({
  item,
  onPress,
  onLayout,
  selected,
  isFirstInView,
  isManualSelect,
  itemWidth,
  itemHeight,
  activeColor,
  inactiveColor,
  fontSize
}) => {
  return /*#__PURE__*/React.createElement(TouchableOpacity, {
    onLayout: onLayout,
    style: [styles.container, {
      width: itemWidth,
      height: itemHeight
    },,],
    onPress: onPress,
    activeOpacity: 0.8
  }, /*#__PURE__*/React.createElement(View, {
    style: [styles.innerContainer, {
      backgroundColor: isManualSelect && selected || !isManualSelect && isFirstInView ? activeColor : inactiveColor
    }]
  }, /*#__PURE__*/React.createElement(Text, {
    style: [styles.itemTitle, {
      fontSize
    }],
    numberOfLines: 1
  }, item)));
};

export default TabbarItem;
//# sourceMappingURL=TabbarItem.js.map