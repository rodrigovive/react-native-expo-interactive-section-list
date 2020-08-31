import React from 'react';
import { ImageSourcePropType } from 'react-native';
export interface Props {
    items: Array<string>;
    onPress: (index: number) => void;
    selectedIndex: number;
    firstValueInView: string;
    isManualSelect: boolean;
    scrollDirection: string;
    itemWidth?: number;
    itemHeight?: number;
    itemSpaceBetween?: number;
    activeColor?: string;
    inactiveColor?: string;
    fontSize?: number;
    icon?: ImageSourcePropType;
}
declare const ScrollableTabbar: React.FC<Props>;
export default ScrollableTabbar;
