import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ActivityIndicator, Pressable, TextInput, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const [authUser, setAuthUser] = useState({});
  const [loading, setLoading] = useState(true);

  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setAuthUser(user);
      const uid = user.uid;
      console.log(uid);
    } else {
      console.log("user signed out!");
    }
    setLoading(false);
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      {!loading ? (
        <>
          {authUser.hasOwnProperty("uid") ? (
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
          ) : (
            <View
              style={{
                backgroundColor: Colors.dark.background,
                width: "100%",
                height: "100%",
                paddingTop: 40,
                paddingHorizontal: 60,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <ThemedText type="title">Autenticación</ThemedText>
              </View>
              <View
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 15,
                }}
              >
                <TextInput
                  placeholder="Correo"
                  textContentType="emailAddress"
                  keyboardType="email-address"
                  inputMode="email"
                  style={{
                    borderWidth: 1,
                    borderColor: Colors.dark.icon,
                    padding: 10,
                    width: "100%",
                  }}
                />
                <TextInput
                  placeholder="Contraseña"
                  secureTextEntry
                  textContentType="password"
                  keyboardType="visible-password"
                  inputMode="text"
                  style={{
                    borderWidth: 1,
                    borderColor: Colors.dark.icon,
                    padding: 10,
                    width: "100%",
                  }}
                />
                <Pressable
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed
                        ? Colors.light.text
                        : Colors.light.tint,
                      borderRadius: 5,
                      padding: 7,
                      width: "100%",
                    },
                  ]}
                >
                  <ThemedText type="subtitle" style={{ textAlign: "center" }}>
                    Iniciar sesión
                  </ThemedText>
                </Pressable>
              </View>
            </View>
          )}
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
    </ThemeProvider>
  );
}
