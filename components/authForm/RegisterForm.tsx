import { Colors } from "@/constants/Colors";
import { Pressable, TextInput, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { Dispatch, SetStateAction } from "react";

export default function RegisterForm({
  email,
  handleEmail,
  password,
  handlePassword,
  handleButton,
}: {
  email: string;
  handleEmail: Dispatch<SetStateAction<string>>;
  password: string;
  handlePassword: Dispatch<SetStateAction<string>>;
  handleButton: () => void;
}) {
  return (
    <View
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 15,
      }}
    >
      <TextInput
        value={email}
        onChangeText={handleEmail}
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
        value={password}
        onChangeText={handlePassword}
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
        onPress={handleButton}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? Colors.light.text : Colors.light.tint,
            borderRadius: 5,
            padding: 7,
            width: "100%",
          },
        ]}
      >
        <ThemedText type="subtitle" style={{ textAlign: "center" }}>
          Registrarme
        </ThemedText>
      </Pressable>
    </View>
  );
}
