import { ActivityIndicator, Pressable, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { Colors } from "@/constants/Colors";

export default function ProfileScreen() {
  const [user, setUser] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);
  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUser(user);
    } else {
      setUser({});
    }
  });
  return (
    <View
      style={{
        padding: 20,
      }}
    >
      {!loading ? (
        <View style={{ display: "flex", gap: 15 }}>
          <ThemedText type="subtitle">{user.email}</ThemedText>
          <ThemedText>{user.uid}</ThemedText>
          <Pressable
            onPress={handleLogout}
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
              Cerrar sesión
            </ThemedText>
          </Pressable>
        </View>
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
    </View>
  );
}
