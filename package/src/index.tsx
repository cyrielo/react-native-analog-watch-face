import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ViewStyle, ImageBackground, TextStyle } from 'react-native';

type AnalogClockProps = {
  date?: Date;
  dateStyle?: ViewStyle;
  dateTextStyle?: TextStyle;
  pause?: boolean;
  interval?: number;
  steps?: number;
  showDate?: boolean;
  backgroundImage?: string;
  blurRadius?: number;
  minutesLineStyle?: ViewStyle;
  hourMarkerComponent?: (hour: number) => ReactNode;
  hourTextStyle?: TextStyle;
  clockFaceStyle?: ViewStyle;
  clockContainerStyle?: ViewStyle;
  minuteHandStyle?: ViewStyle;
  secondsHandStyle?: ViewStyle;
  hourHandStyle?: ViewStyle;
  hourHandsContainerStyle?: ViewStyle;
  centerDotStyle?: ViewStyle;
}

const styles = StyleSheet.create({
  clockContainer: {
    backgroundColor: 'transparent',
    paddingVertical: 2,
    borderRadius: 45,
  },
  clockFace: {
    width: 200,
    height: 200,
    borderRadius: 150,
    borderWidth: 8,
    borderColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  hiddenLine: {
    backgroundColor: 'transparent'
  },
  hourMarking: {
    borderColor: 'red',
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  minutesLine: {
    width: 0.5,
    height: 5,
    backgroundColor: 'grey',
    position: 'absolute',
    bottom: 3,
  },
  hourDot: {
    width: 6,
    height: 6,
    backgroundColor: '#333',
    borderRadius: 3,
    position: 'absolute',
    top: 10,
  },
  hand: {
    position: 'absolute',
    zIndex: 1,
    width: 4,
    height: '50%',
    backgroundColor: '#333',
    borderRadius: 3,
    bottom: '50%',
    transformOrigin: 'center bottom'
  },
  hourHand: {
    height: '30%',
    backgroundColor: '#000',
  },
  minuteHand: {
    height: '35%',
    backgroundColor: '#666',
  },
  secondHand: {
    height: '40%',
    backgroundColor: '#e74c3c',
  },
  centerDot: {
    width: 12,
    height: 12,
    backgroundColor: '#333',
    borderRadius: 6,
    position: 'absolute',
    zIndex: 10,
  },
  dateStyle: {
    margin: 'auto',
    padding: 2,
    borderRadius: 3,
    borderWidth: 1,
  }
});

const AnalogClock: React.FC<AnalogClockProps> = ({
  date,
  pause,
  interval = 1000,
  steps = 1000,
  blurRadius = 0,
  showDate = false,
  hourHandsContainerStyle,
  clockContainerStyle,
  dateStyle,
  dateTextStyle,
  clockFaceStyle,
  minutesLineStyle,
  backgroundImage,
  hourTextStyle,
  hourMarkerComponent,
  hourHandStyle,
  minuteHandStyle,
  secondsHandStyle,
  centerDotStyle
}) => {
  const selecteDate = (date) ? date : new Date();
  const [time, setTime] = useState(selecteDate);
  const intervalHandle = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!pause) {
      intervalHandle.current = setInterval(() => {
        setTime((prevDate) => new Date(prevDate.getTime() + steps));
      }, interval);
    }
    return () => clearInterval(intervalHandle.current); // Clean up on unmount
  }, [pause]);

  // Calculate angles for hour, minute, and second hands
  const secondsAngle = (time.getSeconds() / 60) * 360;
  const minutesAngle = (time.getMinutes() / 60) * 360 + (secondsAngle / 60);
  const hoursAngle = (time.getHours() % 12 / 12) * 360 + (minutesAngle / 12);

  const imageRadius: number = (clockFaceStyle && typeof clockFaceStyle.borderRadius == 'number')
    ? clockFaceStyle.borderRadius : styles.clockFace.borderRadius;
  const clockFaceWidth: number = (clockFaceStyle?.width !== undefined && typeof clockFaceStyle?.width == 'number')
    ? clockFaceStyle.width : styles.clockFace.width;

  return (
    <View style={[styles.clockContainer, { width: clockFaceWidth }, clockContainerStyle]}>
      {/* Clock face */}
      <ImageBackground blurRadius={blurRadius} borderRadius={imageRadius}
        src={backgroundImage}>
        <View style={[styles.clockFace, clockFaceStyle]}>

          {Array.from({ length: 60 }).map((_, i) => (
            <View
              key={i}
              style={[
                styles.hourMarking,
                { transform: [{ rotate: `${i * 6}deg` }] },
              ]}
            >
              {i % 5 !== 0 && <View style={[styles.minutesLine, minutesLineStyle]} />}
            </View>
          ))}
          {/* Hour markings */}
          {Array.from({ length: 12 }).map((_, index) => (
            <View
              key={index}
              style={[
                styles.hourMarking,
                { transform: [{ rotate: `${index * 30}deg` }] },
                hourHandsContainerStyle
              ]}
            >
              <View style={[{ transform: [{ rotate: `-${index * 30}deg` }] }]}>
                {typeof hourMarkerComponent == 'function' ? hourMarkerComponent(index) : (
                  <Text style={{
                    fontWeight: 500,
                    fontSize: 18,
                    color: 'red',
                    ...hourTextStyle
                  }} >{index == 0 ? '12' : index}</Text>
                )}
              </View>
            </View>
          ))}
          {/* Hour hand */}
          <View
            style={[
              styles.hand,
              styles.hourHand,
              { transform: [{ rotate: `${hoursAngle}deg` }] },
              hourHandStyle
            ]}
          />

          {/* Minute hand */}
          <View
            style={[
              styles.hand,
              styles.minuteHand,
              { transform: [{ rotate: `${minutesAngle}deg` }] },
              minuteHandStyle
            ]}
          />
          {/* Second hand */}
          <View
            style={[
              styles.hand,
              styles.secondHand,
              { transform: [{ rotate: `${secondsAngle}deg` }] },
              secondsHandStyle
            ]}
          />
          <View style={[styles.centerDot, centerDotStyle]} />
          {showDate && (
            <View style={[styles.dateStyle, {
              top: clockFaceWidth * 0.07,
              left: clockFaceWidth * 0.22,
            }, dateStyle,]}>
              <Text style={[{
                fontSize: clockFaceWidth * 0.07,
              }, dateTextStyle]}>Mon, 4</Text>
            </View>
          )}
        </View>
      </ImageBackground>
    </View>
  );
};
AnalogClock.displayName = 'react-native-analog-watch-face';
export default AnalogClock;
