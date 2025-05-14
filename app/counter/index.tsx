import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import { theme } from "../../theme";
import { registerForPushNotificationsAsync } from "../../utils/registerForPushNotificationsAsync";
import * as Notifications from "expo-notifications";
import { useEffect, useState, useRef } from "react";
import { TimeSegment } from "../../components/TimeSegment";
import { intervalToDuration, isBefore } from "date-fns";
import { getFromStorage, saveToStorage } from "../../utils/storage";
import * as Haptics from "expo-haptics";
import ConfettiCannon from "react-native-confetti-cannon";

const frequency = 24 * 60 * 60 * 1000;

export const countdownStorageKey = "countdown";

export type PersistedCountdown = {
  currentNotificationId: string | null;
  completedAtTimestamps: number[];
};
type CountdownStatus = {
  isOverdue: boolean;
  distance: ReturnType<typeof intervalToDuration>;
};
export default function CounterScreen() {
  const confettiRef = useRef<ConfettiCannon | null>(null);
  const [countdownState, setCountdownState] =
    useState<PersistedCountdown | null>(null);
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
    const init = async () => {
      const persistedCountdown = await getFromStorage(countdownStorageKey);
      if (persistedCountdown) {
        setCountdownState(persistedCountdown);
      }
    };
    init();
  }, []);
  const lastCompletedAt = countdownState?.completedAtTimestamps[0];
  useEffect(() => {
    const interval = setInterval(() => {
      const timestamp = lastCompletedAt
        ? lastCompletedAt + frequency
        : Date.now();
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
  }, [lastCompletedAt]);

  const scheduleNotification = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    confettiRef.current?.start();
    let notificationId;
    const permission = await registerForPushNotificationsAsync();
    if (permission === "granted") {
      notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: "Car wash overdue!",
          body: "You haven't done the thing yet!",
        },
        trigger: {
          seconds: frequency / 1000,
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        },
      });
    } else {
      Alert.alert(
        "Permission not granted. Go to the settings to enable notifications",
      );
    }
    if (countdownState?.currentNotificationId) {
      await Notifications.cancelScheduledNotificationAsync(
        countdownState.currentNotificationId,
      );
    }

    const newCountdownState: PersistedCountdown = {
      currentNotificationId: notificationId ?? null,
      completedAtTimestamps: countdownState
        ? [Date.now(), ...countdownState.completedAtTimestamps]
        : [Date.now()],
    };

    setCountdownState(newCountdownState);

    await saveToStorage(countdownStorageKey, newCountdownState);
  };
  return (
    <View
      style={[
        styles.container,
        status.isOverdue ? styles.containerLate : undefined,
      ]}
    >
      {!status.isOverdue ? (
        <Text style={[styles.heading]}>Next car wash due in</Text>
      ) : (
        <Text style={[styles.heading, styles.whiteText]}>
          Car wash overdue by
        </Text>
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
        <Text style={styles.buttonText}>I&apos;ve done the car wash!</Text>
      </TouchableOpacity>
      <ConfettiCannon
        ref={confettiRef}
        count={50}
        origin={{ x: Dimensions.get("window").width / 2, y: -30 }}
        autoStart={false}
        fadeOut={true}
      />
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
