# AnalogClock React Native Component

A highly customizable analog clock component for React Native. This component allows you to customize various aspects of the clock, including its hands, hour markers, background, and more.

## Installation

```sh
npm install your-package-name
```

or using yarn:

```sh
yarn add your-package-name
```

## Usage

```tsx
import React from 'react';
import { View } from 'react-native';
import AnalogClock from 'your-package-name';

const App = () => {
  return (
    <View>
      <AnalogClock
        interval={1000}
        showDate={true}
        backgroundImage={'https://example.com/clock-face.jpg'}
      />
    </View>
  );
};

export default App;
```

## Props

| Prop | Type | Default | Description | Possible Values |
|------|------|---------|-------------|-----------------|
| `date` | `Date` | `new Date()` | The initial date and time for the clock. | Any valid JavaScript Date object |
| `dateStyle` | `ViewStyle` | `{}` | Style for the date container. | Any React Native `ViewStyle` object |
| `dateTextStyle` | `TextStyle` | `{}` | Style for the date text. | Any React Native `TextStyle` object |
| `pause` | `boolean` | `false` | Whether the clock should pause ticking. | `true` or `false` |
| `interval` | `number` | `1000` | The interval in milliseconds for the clock update. | Any positive number |
| `steps` | `number` | `1000` | The step increment in milliseconds when updating time. | Any positive number |
| `showDate` | `boolean` | `false` | Whether to show the date on the clock. | `true` or `false` |
| `backgroundImage` | `ImageSource` | `undefined` | object to an image used as the clock's background. | React Native ImageSource prop |
| `blurRadius` | `number` | `0` | The blur effect applied to the background image. | Any positive number |
| `minutesLineStyle` | `ViewStyle` | `{}` | Style for the minute tick marks. | Any React Native `ViewStyle` object |
| `hourMarkerComponent` | `(hour: number) => ReactNode` | `undefined` | Custom component for the hour markers. | A function returning a ReactNode |
| `hourTextStyle` | `TextStyle` | `{}` | Style for the hour marker text. | Any React Native `TextStyle` object |
| `clockFaceStyle` | `ViewStyle` | `{}` | Style for the clock face container. | Any React Native `ViewStyle` object |
| `minuteHandStyle` | `ViewStyle` | `{}` | Style for the minute hand. | Any React Native `ViewStyle` object |
| `secondsHandStyle` | `ViewStyle` | `{}` | Style for the second hand. | Any React Native `ViewStyle` object |
| `hourHandStyle` | `ViewStyle` | `{}` | Style for the hour hand. | Any React Native `ViewStyle` object |
| `centerDotStyle` | `ViewStyle` | `{}` | Style for the center dot of the clock. | Any React Native `ViewStyle` object |

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

