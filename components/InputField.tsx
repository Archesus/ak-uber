/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Image,
  TextInput,
  Platform,
  Keyboard,
} from "react-native";
import React from "react";
import { InputFieldProps } from "@/types/type";

const InputField = ({
  labelStyle,
  label,
  icon,
  secureTextEntry = false,
  containerStyle,
  inputStyle,
  iconStyle,
  className,
  ...props
}: InputFieldProps) => (
  <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="my-2 w-full">
        <Text className={`font-JakartaSemiBold text-lg mb-3 ${labelStyle}`}>
          {label}
        </Text>
        <View
          className={`flex flex-row justify-start items-center bg-neutral-100/30 relative rounded-full border border-neutral-100 focus:border-primary-500 ${containerStyle}`}
        >
          {icon && (
            <Image
              source={icon}
              className={`w-[22px] h-[22px] ml-4 ${iconStyle}`}
            />
          )}
          <TextInput
            className={`rounded-full font-JakartaSemiBold flex-1 p-4 text-[16px] ${inputStyle} text-left`}
            secureTextEntry={secureTextEntry}
            {...props}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
);

export default InputField;
