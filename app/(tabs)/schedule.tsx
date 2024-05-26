import { View } from "react-native";
import { useState } from "react";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";

LocaleConfig.locales["pe"] = {
  monthNames: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ],
  monthNamesShort: [
    "Ene.",
    "Feb.",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Ago.",
    "Sept.",
    "Oct.",
    "Nov.",
    "Dic.",
  ],
  dayNames: [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ],
  dayNamesShort: ["Dom.", "Lun.", "Mar.", "Miér.", "Jue.", "Vier.", "Sáb."],
  today: "Hoy",
};

LocaleConfig.defaultLocale = "pe";

export default function ScheduleScreen() {
  const [selected, setSelected] = useState("");
  return (
    <SafeAreaView
      style={{
        padding: 20,
      }}
    >
      <Calendar
        // Customize the appearance of the calendar
        style={{}}
        // Callback that gets called when the user selects a day
        onDayPress={(day) => {
          console.log("selected day", day);
        }}
        // Mark specific dates as marked
        markedDates={{
          "2024-05-26": { selected: true, marked: true, selectedColor: "blue" },
          "2024-05-27": { marked: true },
          "2024-05-28": { selected: true, marked: true, selectedColor: "blue" },
        }}
      />
      <ThemedText>"Horario" Proximamente</ThemedText>
    </SafeAreaView>
  );
}
