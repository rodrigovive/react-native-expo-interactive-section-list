import React from "react";
import { ImageSourcePropType } from "react-native";
interface Props {
    data: Array<any>;
    renderItem: (item: any) => JSX.Element;
    itemHeight: number;
    tabbarItemWidth?: number;
    tabbarItemHeight?: number;
    tabbarItemSpaceBetween?: number;
    tabbarItemActiveColor?: string;
    tabbarItemInactiveColor?: string;
    tabbarItemFontSize?: number;
    tabbarIcon?: ImageSourcePropType;
}
declare const SelectableSectionList: React.FC<Props>;
export default SelectableSectionList;
