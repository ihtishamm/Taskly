import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { ShoppingListItem } from "../components/ShoppingListItem";
import { theme } from "../theme";
import { useEffect, useState } from "react";
import { getFromStorage, saveToStorage } from "../utils/storage";

type ShoppingListItemProps = {
  id: string;
  name: string;
  isCompleted: boolean;
  completedAtTimestamp?: number;
  lastUpdatedTimestamp: number;
};

const STORAGE_KEY = "shoppingList";

export default function App() {
  const [items, setItems] = useState<ShoppingListItemProps[]>([]);
  const [text, setText] = useState<string>("");

  useEffect(() => {
    const fetchItems = async () => {
      const items = await getFromStorage(STORAGE_KEY);
      if (items) {
        setItems(items);
      }
    };
    fetchItems();
  }, []);

  const handleSubmit = () => {
    setItems([
      ...items,
      {
        id: new Date().toISOString(),
        name: text,
        isCompleted: false,
        lastUpdatedTimestamp: Date.now(),
      },
    ]);
    saveToStorage(STORAGE_KEY, items);
    setText("");
  };

  const handleDelete = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
    saveToStorage(STORAGE_KEY, items);
  };

  const handleToggle = (id: string) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              isCompleted: !item.isCompleted,
              completedAtTimestamp: item.isCompleted ? undefined : Date.now(),
              lastUpdatedTimestamp: Date.now(),
            }
          : item,
      ),
    );
  };
  return (
    <FlatList
      data={orderShoppingList(items)}
      renderItem={({ item }) => (
        <ShoppingListItem
          name={item.name}
          isCompleted={item.isCompleted}
          onDelete={() => handleDelete(item.id)}
          onToggle={() => handleToggle(item.id)}
        />
      )}
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

function orderShoppingList(shoppingList: ShoppingListItemProps[]) {
  return shoppingList.sort((item1, item2) => {
    if (item1.completedAtTimestamp && item2.completedAtTimestamp) {
      return item2.completedAtTimestamp - item1.completedAtTimestamp;
    }

    if (item1.completedAtTimestamp && !item2.completedAtTimestamp) {
      return 1;
    }

    if (!item1.completedAtTimestamp && item2.completedAtTimestamp) {
      return -1;
    }

    if (!item1.completedAtTimestamp && !item2.completedAtTimestamp) {
      return item2.lastUpdatedTimestamp - item1.lastUpdatedTimestamp;
    }

    return 0;
  });
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
