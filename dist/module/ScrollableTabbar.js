import React, { useEffect, useState, useRef } from 'react';
import { View, Image, ScrollView, Dimensions } from 'react-native';
import TabbarItem from './TabbarItem';
import { tabbarViewStyles as styles } from './styles';
const SCREEN_WIDTH = Dimensions.get('window').width;

const ScrollableTabbar = ({
  items,
  onPress,
  selectedIndex,
  firstValueInView,
  isManualSelect,
  scrollDirection,
  itemWidth = 100,
  itemHeight = 50,
  itemSpaceBetween = 8,
  activeColor = 'yellow',
  inactiveColor = 'transparent',
  fontSize = 14,
  icon
}) => {
  const scrollViewRef = useRef(null);
  const [itemPositions, setItemPositions] = useState([]);

  const getValues = () => {
    return items.map((item, index) => /*#__PURE__*/React.createElement(TabbarItem, {
      key: index,
      item: item,
      selected: index === selectedIndex,
      isFirstInView: firstValueInView === item,
      isManualSelect: isManualSelect,
      onPress: () => onPress(index),
      onLayout: ({
        nativeEvent
      }) => {
        const positions = [...itemPositions];
        positions.push({
          item,
          x: nativeEvent.layout.x,
          width: nativeEvent.layout.width,
          index: index
        });
        setItemPositions(positions);
      },
      itemWidth: itemWidth,
      itemHeight: itemHeight,
      activeColor: activeColor,
      inactiveColor: inactiveColor,
      fontSize: fontSize
    }));
  };

  useEffect(() => {
    if (isManualSelect) return;

    if (scrollViewRef && scrollViewRef.current) {
      itemPositions.forEach(itemPosition => {
        if (firstValueInView === itemPosition.item && scrollDirection === 'DOWN' && itemPosition.x > SCREEN_WIDTH - itemWidth * 2) {
          scrollViewRef.current.scrollTo({
            x: itemPosition.x - SCREEN_WIDTH + itemWidth * 2,
            animated: true
          });
        } else if (firstValueInView === itemPosition.item && scrollDirection === 'UP') {
          scrollViewRef.current.scrollTo({
            x: itemPosition.x - itemWidth,
            animated: true
          });
        }
      });
    }
  }, [firstValueInView]);
  return /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, icon && /*#__PURE__*/React.createElement(View, {
    style: styles.iconView
  }, /*#__PURE__*/React.createElement(Image, {
    source: icon,
    style: styles.icon
  })), /*#__PURE__*/React.createElement(ScrollView, {
    ref: scrollViewRef,
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    contentContainerStyle: styles.contentContainer,
    decelerationRate: "fast",
    snapToInterval: itemWidth + itemSpaceBetween,
    snapToAlignment: "start"
  }, getValues()));
};

export default ScrollableTabbar;
//# sourceMappingURL=ScrollableTabbar.js.map