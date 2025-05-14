import { StyleSheet, TextInput, View } from "react-native";
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
    <View style={styles.container}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
    paddingTop: 12,
  },
  textInput: {
    borderColor: theme.colorLightGrey,
    borderWidth: 2,
    padding: 24,
    fontSize: 18,
    borderRadius: 50,
    marginHorizontal: 12,
    marginBottom: 12,
  },
});
