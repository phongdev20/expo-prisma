import { Colors } from "@/constants/Colors";
import { StyleSheet, Text, View } from "react-native";

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text>User</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
});
