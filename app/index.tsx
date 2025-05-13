import { StyleSheet, View } from "react-native";
import { ShoppingListItem } from "../components/ShoppingListItem";
import { theme } from "../theme";
import { Link } from "expo-router";

export default function App() {
  return (
    <View style={styles.container}>
      <Link
        href="/counter"
        style={{
          alignItems: "center",
          marginBottom: 16,
          borderBottomWidth: 2,
          borderColor: "#ccc",
          paddingBottom: 16,
        }}
      >
        Counter
      </Link>
      <ShoppingListItem name="Banana" isCompleted={false} />
      <ShoppingListItem name="Apple" isCompleted={true} />
      <ShoppingListItem name="Orange" isCompleted />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
    justifyContent: "center",
    alignItems: "center",
  },
});
