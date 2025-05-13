import { StyleSheet, View } from "react-native";
import { ShoppingListItem } from "../components/ShoppingListItem";
import { theme } from "../theme";

export default function App() {
  return (
    <View style={styles.container}>
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
