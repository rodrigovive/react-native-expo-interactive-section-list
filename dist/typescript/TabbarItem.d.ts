import React from 'react';
import { GestureResponderEvent, LayoutChangeEvent } from 'react-native';
export interface Props {
    item: string;
    onPress: (event: GestureResponderEvent) => void;
    onLayout: (event: LayoutChangeEvent) => void;
    selected: boolean;
    isFirstInView: boolean;
    isManualSelect: boolean;
    itemWidth?: number;
    itemHeight?: number;
    activeColor?: string;
    inactiveColor?: string;
    fontSize?: number;
}
declare const TabbarItem: React.FC<Props>;
export default TabbarItem;
