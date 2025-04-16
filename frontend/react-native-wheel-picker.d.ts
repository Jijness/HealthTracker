declare module 'react-native-wheel-picker' {
    import * as React from 'react';
    import { ViewStyle } from 'react-native';
  
    export interface WheelPickerProps {
      data: string[];
      selectedItem: number;
      onItemSelected: (index: number) => void;
      itemTextSize?: number;
      itemTextColor?: string;
      selectedItemTextColor?: string;
      style?: ViewStyle;
    }
  
    export default class WheelPicker extends React.Component<WheelPickerProps> {
      static Item: any;
    }
  }
  