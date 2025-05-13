import { useRouter } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function CounterScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => router.navigate("/idea")}
        style={{
          backgroundColor: "blue",
          padding: 10,
          borderRadius: 5,
        }}
      >
        <Text style={{ color: "white" }}>go to the idea</Text>
      </TouchableOpacity>
      <Text style={styles.text}>Counter</Text>
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
});
