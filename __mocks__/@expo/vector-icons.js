const React = require('react');
const { View } = require('react-native');

const IconMock = (props) => {
  return React.createElement(View, { ...props, testID: props.name });
};

module.exports = {
  MaterialIcons: IconMock,
  AntDesign: IconMock,
  Ionicons: IconMock,
  Feather: IconMock,
  FontAwesome: IconMock,
};