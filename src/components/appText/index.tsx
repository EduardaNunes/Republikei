import React from 'react';
import { Text } from 'react-native';
import { styles } from './styles';

type AppTextProps = {
  children: React.ReactNode,
  style?: object
}

const AppText = ({ children, style }: AppTextProps) => {
  return (
    <Text style={[styles.text, style]}>
      {children}
    </Text>
  );
};

export default AppText;
