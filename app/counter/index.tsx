import { Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { theme } from "../../theme";
import { registerForPushNotificationsAsync } from "../../utils/registerForPushNotificationsAsync";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import { TimeSegment } from "../../components/TimeSegment";
import { intervalToDuration, isBefore } from "date-fns";

const timestamp = Date.now() + 100 * 60;

type CountdownStatus = {
  isOverdue: boolean;
  distance: ReturnType<typeof intervalToDuration>;
};
export default function CounterScreen() {
  const [status, setStatus] = useState<CountdownStatus>({
    isOverdue: false,
    distance: {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
  });
  useEffect(() => {
    const interval = setInterval(() => {
      const isOverdue = isBefore(timestamp, Date.now());
      const distance = intervalToDuration(
        isOverdue
          ? {
              start: timestamp,
              end: Date.now(),
            }
          : {
              start: Date.now(),
              end: timestamp,
            },
      );
      setStatus({ isOverdue, distance });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const scheduleNotification = async () => {
    const permission = await registerForPushNotificationsAsync();
    if (permission === "granted") {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Hello",
          body: "This is a test notification",
        },
        trigger: {
          seconds: 5,
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        },
      });
    } else {
      Alert.alert(
        "Permission not granted. Go to the settings to enable notifications",
      );
    }
  };
  return (
    <View
      style={[
        styles.container,
        status.isOverdue ? styles.containerLate : undefined,
      ]}
    >
      {!status.isOverdue ? (
        <Text style={[styles.heading]}>Thing due in</Text>
      ) : (
        <Text style={[styles.heading, styles.whiteText]}>Thing overdue by</Text>
      )}
      <View style={styles.row}>
        <TimeSegment
          unit="Days"
          number={status.distance?.days ?? 0}
          textStyle={status.isOverdue ? styles.whiteText : undefined}
        />
        <TimeSegment
          unit="Hours"
          number={status.distance?.hours ?? 0}
          textStyle={status.isOverdue ? styles.whiteText : undefined}
        />
        <TimeSegment
          unit="Minutes"
          number={status.distance?.minutes ?? 0}
          textStyle={status.isOverdue ? styles.whiteText : undefined}
        />
        <TimeSegment
          unit="Seconds"
          number={status.distance?.seconds ?? 0}
          textStyle={status.isOverdue ? styles.whiteText : undefined}
        />
      </View>
      <TouchableOpacity
        onPress={scheduleNotification}
        style={styles.button}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>I&apos;ve done the thing!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
  },
  button: {
    backgroundColor: theme.colorBlack,
    padding: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  containerLate: {
    backgroundColor: theme.colorRed,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  whiteText: {
    color: theme.colorWhite,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 24,
    color: theme.colorBlack,
  },
});
