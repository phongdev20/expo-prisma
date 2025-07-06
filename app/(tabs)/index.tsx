import Loading from "@/components/Loading";
import { Todo } from "@/prisma/generated/client/edge";
import { useEffect, useState } from "react";
import {
  FlatList,
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";

// Enable LayoutAnimation for Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function HomeScreen() {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  console.log("Todos:", todos);

  const fetchTodos = async () => {
    await setLoading(true);
    try {
      const response = await fetch("http://localhost:8081/api/todo");
      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }
      const data = await response.json();
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setTodos(data);
    } catch (error) {
      console.error(error);
      // Handle error (e.g., show a message to the user)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleCreateTodo = async () => {
    if (!title.trim()) return; // Prevent creating empty todos

    try {
      const response = await fetch(
        "https://expo-prisma--qtodajatog.expo.app/api/todo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create todo");
      }
      await response.json();
      setTitle("");
    } catch (error) {
      console.error(error);
    } finally {
      fetchTodos();
    }
  };

  const renderTodoItem = ({ item }: { item: Todo }) => (
    <View style={styles.todoItem}>
      <Text style={styles.todoTitle}>{item.title}</Text>
      <Text style={styles.todoDate}>
        Created: {new Date(item.createdAt).toLocaleDateString()}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Danh sách công việc</Text>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Nhập công việc cần làm..."
            value={title}
            onChangeText={setTitle}
            style={styles.textInput}
            placeholderTextColor="#9A9A9A"
          />
          <TouchableOpacity style={styles.addButton} onPress={handleCreateTodo}>
            <Text style={styles.addButtonText}>Thêm</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flex: 1 }}>
        {loading && <Loading />}
        <FlatList
          data={todos}
          renderItem={renderTodoItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.listContentContainer}
          ListEmptyComponent={
            <View style={styles.emptyListContainer}>
              <Text style={styles.emptyListText}>Chưa có công việc nào</Text>
            </View>
          }
          ListHeaderComponent={<View style={{ height: 10 }} />}
          refreshing={loading}
          onRefresh={fetchTodos}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F2F5",
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#D0D0D0",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginRight: 10,
    backgroundColor: "#FFF",
  },
  addButton: {
    backgroundColor: "#007AFF", // iOS blue
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  listContentContainer: {
    paddingHorizontal: 20,
    flex: 1,
  },
  todoItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3, // Android shadow
  },
  todoTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
    marginBottom: 5,
  },
  todoDate: {
    fontSize: 12,
    color: "#777",
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  emptyListText: {
    fontSize: 16,
    color: "#888",
  },
});
