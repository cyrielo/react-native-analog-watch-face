import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';

type AnalogClockProps = {
  date?: Date;
  pause?:boolean;
  clockFaceStyle?: ViewStyle;
  minuteHandStyle?: ViewStyle;
  secondsHandStyle?: ViewStyle;
  hourHandStyle?: ViewStyle;
  centerDotStyle?: ViewStyle;
}

export type ClockFace = '';

const styles = StyleSheet.create({
  clockContainer: {
    alignItems: 'center',
    justifyContent: 'center',
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
    borderColor: 'pink',
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  minutesLine: {
    width: 0.5,
    height: 7,
    backgroundColor: 'grey',
    position: 'absolute',
    bottom: 5,
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
  }
});

const AnalogClock: React.FC<AnalogClockProps> = ({
  date,
  clockFaceStyle,
  hourHandStyle,
  minuteHandStyle,
  secondsHandStyle,
  centerDotStyle
}) => {
  const selecteDate = (date) ? date : new Date();
  const [time, setTime] = useState(selecteDate);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prevDate) => new Date(prevDate.getTime() + 1000));
    }, 1000);

    return () => clearInterval(intervalId); // Clean up on unmount
  }, []);

  // Calculate angles for hour, minute, and second hands
  const secondsAngle = (time.getSeconds() / 60) * 360;
  const minutesAngle = (time.getMinutes() / 60) * 360 + (secondsAngle / 60);
  const hoursAngle = (time.getHours() % 12 / 12) * 360 + (minutesAngle / 12);

  return (
    <View style={styles.clockContainer}>
      {/* Clock face */}
      <View style={[styles.clockFace, clockFaceStyle]}>
        {Array.from({ length: 60 }).map((_, i) => (
          <View
            key={i}
            style={[
              styles.hourMarking,
              { transform: [{ rotate: `${i * 6}deg` }] },
            ]}
          >
            {i % 5 !== 0 ? <View style={styles.minutesLine} /> : null}
          </View>
        ))}
        {/* Hour markings */}
        {Array.from({ length: 12 }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.hourMarking,
              { transform: [{ rotate: `${index * 30}deg` }] },
            ]}
          >
            <View style={{ transform: [{ rotate: `-${index * 30}deg` }] }} >
              <Text style={{
                fontWeight: '500',
                fontSize: 16,
                color: 'black'
              }} >{index == 0 ? '12' : index}</Text>
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
      </View>
    </View>
  );
};

export default AnalogClock;

