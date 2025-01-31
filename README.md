
[![Component preview](https://i.imgur.com/ftY108r.png)](https://i.imgur.com/ftY108r.png)[![Component preview](https://i.imgur.com/oqyxfRc.png)](https://i.imgur.com/oqyxfRc.png)


# AnalogClock React Native Component


A highly customizable analog clock component for React Native. This component allows you to customize various aspects of the clock, including its hands, hour markers, background, and more.

## Installation

```sh
npm install react-native-analog-watch-face
```

or using yarn:

```sh
yarn add react-native-analog-watch-face
```

## Usage

```tsx
import React from 'react';
import { View } from 'react-native';
import AnalogClock from 'react-native-analog-watch-face';

const App = () => {
  return (
    <View>
      <AnalogClock
        backgroundImage={{ uri: 'https://i.pinimg.com/736x/f1/e6/8e/f1e68ef9e34b3f0c2dcde5dcffbf580b.jpg'}}
        hourTextStyle={{
          color: '#f9f9f9'
        }}
        date={new Date(2025,0,31,4,18,18)}
        showDate={true}
        dateStyle={{
          backgroundColor: '#fff',
          borderRadius: 5,
        }}
        dateTextStyle={{
          fontWeight: 'bold'
        }}
        blurRadius={4}
        hourHandStyle={{
          backgroundColor: '#dcdcdc'
        }}
      />
    </View>
  );
};

export default App;
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `date` | `Date` | `new Date()` | The initial date and time for the clock. |
| `dateStyle` | `ViewStyle` | `{}` | Style for the date container. |
| `dateTextStyle` | `TextStyle` | `{}` | Style for the date text. |
| `pause` | `boolean` | `false` | Whether the clock should pause ticking. |
| `interval` | `number` | `1000` | The interval in milliseconds for the clock update. |
| `steps` | `number` | `1000` | The step increment in milliseconds when updating time. |
| `showDate` | `boolean` | `false` | Whether to show the date on the clock. |
| `backgroundImage` | `ImageSource` | `undefined` | image object as the clock's background. |
| `blurRadius` | `number` | `0` | The blur effect applied to the background image. |
| `minutesLineStyle` | `ViewStyle` | `{}` | Style for the minute tick marks. |
| `hourMarkerComponent` | `(hour: number) => ReactNode` | `undefined` | Custom component for the hour markers. |
| `hourTextStyle` | `TextStyle` | `{}` | Style for the hour marker text. |
| `clockFaceStyle` | `ViewStyle` | `{}` | Style for the clock face container. |
| `minuteHandStyle` | `ViewStyle` | `{}` | Style for the minute hand. |
| `secondsHandStyle` | `ViewStyle` | `{}` | Style for the second hand. |
| `hourHandStyle` | `ViewStyle` | `{}` | Style for the hour hand. |
| `centerDotStyle` | `ViewStyle` | `{}` | Style for the center dot of the clock. |

## Example Customization

```tsx
<AnalogClock
  showDate={true}
  clockFaceStyle={{ borderWidth: 10, borderColor: 'black', backgroundColor: 'white' }}
  hourHandStyle={{ backgroundColor: 'blue' }}
  minuteHandStyle={{ backgroundColor: 'green' }}
  secondsHandStyle={{ backgroundColor: 'red' }}
  centerDotStyle={{ backgroundColor: 'black' }}
  hourMarkerComponent={(hour) => <Text style={{ color: 'blue' }}>{hour === 0 ? 12 : hour}</Text>}
/>
```

## License

MIT

