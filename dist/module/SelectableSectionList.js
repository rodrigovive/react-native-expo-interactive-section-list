import React, { useEffect, useState, useRef } from "react";
import { View, SectionList, Text, StyleSheet } from "react-native";
import sectionListGetItemLayout from "react-native-section-list-get-item-layout";
import ScrollableTabbar from "./ScrollableTabbar";
import { contentViewStyles as styles } from "./styles";

// DATA IS SORTED ALPHABETICALL
// TO KEEP TRACK OF SECTION IN VIEW DURING
// SCROLL, A SECTIONINDEX IS ADDED TO EACH
// LISTITEM AND A SECOND FLATTENDED LIST IS
// CREATED (FOR COMPARISSON)
const getData = items => {
  const flattenedList = [];
  items.sort((a, b) => {
    if (a.title > b.title) {
      return 1;
    }

    return -1;
  });
  const sectionList = items.map((section, index) => {
    section.data.forEach(sectionItem => {
      if (typeof sectionItem === "object") {
        sectionItem.sectionIndex = index;
        flattenedList.push(sectionItem);
      } else if (typeof sectionItem === "string") {
        const obj = {
          title: sectionItem,
          sectionIndex: index
        };
        flattenedList.push(obj);
      }
    });
    return section;
  });
  return {
    sectionList,
    flattenedList
  };
}; // TAB ITEMS CREATED FROM SECTION DATA ADDED TO SECTIONLIST


const getTabbarItems = items => {
  const tabbarItems = [];
  items.forEach(item => {
    if (!tabbarItems.some(tabbarItem => tabbarItem === item.title)) {
      tabbarItems.push(item.title);
    }
  });
  return tabbarItems;
};

let scrollOffset = 0;

const SelectableSectionList = ({
  data,
  renderItem,
  itemHeight,
  tabbarItemWidth,
  tabbarItemHeight,
  tabbarItemSpaceBetween,
  tabbarItemActiveColor,
  tabbarItemInactiveColor,
  tabbarItemFontSize,
  tabbarIcon
}) => {
  const flatListRef = useRef(null);
  const [sectionsFeed, setSectionsFeed] = useState([]);
  const [flattenedList, setFlattenedList] = useState([]);
  const [tabbarItems, setTabbarItems] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [firstIndexInView, setFirstIndexInView] = useState(0);
  const [isManualSelect, setIsManualSelect] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("DOWN");
  const [sectionHeaderHeight, setSectionHeaderHeight] = useState(40);
  const [layoutHeight, setLayoutHeight] = useState(0);

  const handleTabItemPress = index => {
    setSelectedIndex(index);
    setIsManualSelect(true);
  };

  const getItemLayout = sectionListGetItemLayout({
    getItemHeight: () => itemHeight,
    getSeparatorHeight: () => StyleSheet.hairlineWidth,
    getSectionHeaderHeight: () => sectionHeaderHeight,
    getSectionFooterHeight: () => 0,
    listHeaderHeight: 0
  });
  useEffect(() => {
    if (!isManualSelect) return;

    if (flatListRef && flatListRef.current) {
      flatListRef.current.scrollToLocation({
        animated: true,
        itemIndex: 0,
        sectionIndex: selectedIndex,
        viewPosition: 0
      });
    }
  }, [selectedIndex]);
  useEffect(() => {
    const listObject = getData(data);
    setSectionsFeed(listObject.sectionList);
    setFlattenedList(listObject.flattenedList);
    setTabbarItems(getTabbarItems(listObject.sectionList));
  }, [data]);

  const renderFlatlist = () => /*#__PURE__*/React.createElement(SectionList, {
    ref: flatListRef,
    contentContainerStyle: styles.contentContainer,
    sections: sectionsFeed,
    renderItem: args => renderItem(args),
    getItemLayout: (data, index) => getItemLayout(data, index),
    renderSectionHeader: ({
      section: {
        title
      }
    }) => /*#__PURE__*/React.createElement(Text, {
      style: styles.sectionHeader,
      onLayout: ({
        nativeEvent
      }) => setSectionHeaderHeight(nativeEvent.layout.height)
    }, title),
    scrollEventThrottle: 16,
    onScroll: ({
      nativeEvent
    }) => {
      if (layoutHeight === 0) {
        setLayoutHeight(nativeEvent.layoutMeasurement.height);
      } //  IDENTIFY SECTION IN VIEW


      const itemIndex = Math.floor(nativeEvent.contentOffset.y / (itemHeight + (sectionHeaderHeight + StyleSheet.hairlineWidth) * sectionsFeed.length / flattenedList.length)); // EXIT IF SCROLL OUT OF BOUNDS

      if (itemIndex < 0 || itemIndex > flattenedList.length - 1) return; // SET FIRST SECTION IN VIEW (TOP)

      const sectionIndex = flattenedList[itemIndex].sectionIndex;
      setFirstIndexInView(sectionIndex); // SET SCROLLDIRECTION

      if (nativeEvent.contentOffset.y > scrollOffset) {
        setScrollDirection("DOWN");
      } else {
        setScrollDirection("UP");
      }

      scrollOffset = nativeEvent.contentOffset.y;
    },
    onScrollBeginDrag: () => {
      setSelectedIndex(-1);
      setIsManualSelect(false);
    },
    ItemSeparatorComponent: () => /*#__PURE__*/React.createElement(View, {
      style: styles.border
    }),
    keyExtractor: (item, index) => index.toString()
  });

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ScrollableTabbar, {
    items: tabbarItems,
    onPress: index => handleTabItemPress(index),
    selectedIndex: selectedIndex,
    firstValueInView: data[firstIndexInView] ? data[firstIndexInView].title : "",
    isManualSelect: isManualSelect,
    scrollDirection: scrollDirection,
    itemWidth: tabbarItemWidth,
    itemHeight: tabbarItemHeight,
    itemSpaceBetween: tabbarItemSpaceBetween,
    activeColor: tabbarItemActiveColor,
    inactiveColor: tabbarItemInactiveColor,
    fontSize: tabbarItemFontSize,
    icon: tabbarIcon
  }), React.useMemo(() => renderFlatlist(), [sectionsFeed]));
};

export default SelectableSectionList;
//# sourceMappingURL=SelectableSectionList.js.map