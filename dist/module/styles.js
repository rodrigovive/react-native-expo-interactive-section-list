import { StyleSheet } from 'react-native';
export const tabbarViewStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentContainer: {},
  iconView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40
  },
  icon: {
    width: 26,
    height: 26
  }
});
export const tabbarItemStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8
  },
  itemTitle: {
    fontSize: 18
  }
});
export const contentViewStyles = StyleSheet.create({
  contentContainer: {
    backgroundColor: 'white'
  },
  sectionHeader: {
    flex: 1,
    height: 40,
    backgroundColor: 'white',
    padding: 8,
    fontSize: 20,
    fontWeight: '500'
  },
  border: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'gray'
  }
});
//# sourceMappingURL=styles.js.map