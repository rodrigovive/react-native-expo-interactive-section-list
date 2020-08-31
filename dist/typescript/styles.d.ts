import { ViewStyle, TextStyle, ImageStyle } from 'react-native';
interface TabbarViewStyles {
    container: ViewStyle;
    contentContainer: ViewStyle;
    iconView: ViewStyle;
    icon: ImageStyle;
}
interface TabbarItemStyles {
    container: ViewStyle;
    innerContainer: ViewStyle;
    itemTitle: TextStyle;
}
interface ContentStyles {
    contentContainer: ViewStyle;
    sectionHeader: TextStyle;
    border: ViewStyle;
}
export declare const tabbarViewStyles: TabbarViewStyles;
export declare const tabbarItemStyles: TabbarItemStyles;
export declare const contentViewStyles: ContentStyles;
export {};
