import { ScrollView, StyleSheet, TextInput } from "react-native";
import { ShoppingListItem } from "../components/ShoppingListItem";
import { theme } from "../theme";
import { useState } from "react";

type ShoppingListItemProps = {
  id: string;
  name: string;
};
const ShoppingItem: ShoppingListItemProps[] = [
  {
    id: "1",
    name: "Banana",
  },
  {
    id: "2",
    name: "Cake",
  },
  {
    id: "3",
    name: "Orange",
  },
];
export default function App() {
  const [items, setItems] = useState<ShoppingListItemProps[]>(ShoppingItem);
  const [text, setText] = useState<string>("");

  const handleSubmit = () => {
    setItems([...items, { id: new Date().toISOString(), name: text }]);
    setText("");
  };
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      stickyHeaderIndices={[0]}
    >
      <TextInput
        style={styles.textInput}
        placeholder="Add a new item"
        value={text}
        onChangeText={setText}
        onSubmitEditing={handleSubmit}
        returnKeyType="done"
      />
      {items.map((item) => (
        <ShoppingListItem key={item.id} name={item.name} />
      ))}
    </ScrollView>
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
});
