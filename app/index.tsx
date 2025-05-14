import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { ShoppingListItem } from "../components/ShoppingListItem";
import { theme } from "../theme";
import { useState } from "react";

type ShoppingListItemProps = {
  id: string;
  name: string;
};
const ShoppingItem: ShoppingListItemProps[] = [];
export default function App() {
  const [items, setItems] = useState<ShoppingListItemProps[]>(ShoppingItem);
  const [text, setText] = useState<string>("");

  const handleSubmit = () => {
    setItems([...items, { id: new Date().toISOString(), name: text }]);
    setText("");
  };
  return (
    <FlatList
      data={items}
      renderItem={({ item }) => <ShoppingListItem name={item.name} />}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      stickyHeaderIndices={[0]}
      ListHeaderComponent={
        <TextInput
          style={styles.textInput}
          placeholder="Add a new item"
          value={text}
          onChangeText={setText}
          onSubmitEditing={handleSubmit}
          returnKeyType="done"
        />
      }
      ListEmptyComponent={
        <View style={styles.listEmptyContainer}>
          <Text>No items in your shopping list</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
    paddingTop: 12,
  },
  contentContainer: {
    paddingBottom: 24,
  },
  textInput: {
    borderColor: theme.colorLightGrey,
    borderWidth: 2,
    padding: 15,
    fontSize: 18,
    borderRadius: 50,
    marginHorizontal: 12,
    marginBottom: 12,
    backgroundColor: theme.colorWhite,
  },
  listEmptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 18,
  },
});
