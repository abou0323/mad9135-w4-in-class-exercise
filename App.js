import { useState, useEffect } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import axios from "axios";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  const [todos, setToDos] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((response) => {
        setToDos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  // Item renderer for FlatList
  const renderItem = ({ item }) => (
    <View style={styles.todoItem}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.completed}>Completion Status: {item.completed ? "Completed" : "Incomplete "} </Text>
    </View>
  );

  // Key extractor for FlatList
  const keyExtractor = (item) => item.id.toString();

  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView>
        <FlatList
          data={todos}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  todoItem: {
    padding: 15,
    shadowColor: "#000",
    backgroundColor: "#fff",
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  email: {
    fontSize: 14,
    color: "#888",
    marginBottom: 5,
  }
});