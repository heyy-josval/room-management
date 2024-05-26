import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { ActivityIndicator, View } from "react-native";
import { Colors } from "@/constants/Colors";
import LoginForm from "@/components/authForm/LoginForm";
import RegisterForm from "@/components/authForm/RegisterForm";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const [authUser, setAuthUser] = useState({});
  const [loading, setLoading] = useState(true);
  //true: register
  //false: login
  const [authType, setAuthType] = useState(false);
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");

  const auth = getAuth();

  const toggleAuthType = () => {
    setAuthType(!authType);
    setFormEmail("");
    setFormPassword("");
  };

  const handleAuth = (mode: string) => {
    if (mode == "login") {
      signInWithEmailAndPassword(auth, formEmail, formPassword)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(`${errorCode}: ${errorMessage}`);
        });
    }
  };

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser({});
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [loaded, auth]);

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
                gap: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <ThemedText
                  type="subtitle"
                  style={{ opacity: authType ? 0.2 : 1 }}
                >
                  Logueo
                </ThemedText>
                <Switch onValueChange={toggleAuthType} value={authType} />
                <ThemedText
                  type="subtitle"
                  style={{ opacity: !authType ? 0.2 : 1 }}
                >
                  Registro
                </ThemedText>
              </View> */}
              {authType ? (
                <RegisterForm
                  email={formEmail}
                  handleEmail={setFormEmail}
                  password={formPassword}
                  handlePassword={setFormPassword}
                  handleButton={() => {
                    handleAuth("register");
                  }}
                />
              ) : (
                <LoginForm
                  email={formEmail}
                  handleEmail={setFormEmail}
                  password={formPassword}
                  handlePassword={setFormPassword}
                  handleButton={() => {
                    handleAuth("login");
                  }}
                />
              )}
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
