import { View, ActivityIndicator, Pressable } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/ThemedText";
import { database } from "@/firebaseConfig";
import { child, get, onValue, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";

const handleButton = () => {
  const dbRef = ref(database);
  get(child(dbRef, "door/open"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        set(ref(database, "door/open"), !snapshot.val());
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export default function HomeScreen() {
  const [doorStatus, setDoorStatus] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const doorStatusRef = ref(database, "door/open");
    const unsubscribe = onValue(doorStatusRef, (snapshot) => {
      const data = snapshot.val();
      setDoorStatus(data);
    });
    setLoading(false);
    // Cleanup the subscription on unmount
    return () => unsubscribe();
  }, []); // Empty dependency array means this runs once when the component mounts

  return (
    <SafeAreaView
      style={{
        padding: 20,
        width: "100%",
        height: "100%",
      }}
    >
      {!loading ? (
        <>
          <Pressable
            onPress={handleButton}
            style={({ pressed }) => [
              {
                backgroundColor: pressed
                  ? Colors.light.text
                  : Colors.light.tint,
                borderRadius: 5,
                padding: 5,
              },
            ]}
          >
            <ThemedText
              type="defaultSemiBold"
              style={{ fontSize: 18, textAlign: "center" }}
            >
              {doorStatus ? "Cerrar puerta" : "Abrir puerta"}
            </ThemedText>
          </Pressable>
          <View
            style={{
              flexDirection: "row",
              paddingTop: 20,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <ThemedText>La puerta esta actualmente:</ThemedText>
            <ThemedText
              type="defaultSemiBold"
              style={{ color: doorStatus ? "#9dff87" : "#ff8f87" }}
            >
              {doorStatus ? "Abierto" : "Cerrado"}
            </ThemedText>
          </View>
        </>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      )}
    </SafeAreaView>
  );
}
