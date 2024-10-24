/* eslint-disable prettier/prettier */
import { Alert, Image, Text, View } from "react-native";
import Custombutton from "./CustomButtons";
import { icons } from "@/constants";
import React, { useCallback } from "react";
import { useOAuth } from "@clerk/clerk-expo";
import { googleOAuth } from "@/lib/auth";
import { router } from "expo-router";

const OAuth = () => {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const handleGooglesignIn = useCallback(async () => {
    try {
      const result = await googleOAuth(startOAuthFlow);

      if (result.code === "session_exists" || result.code === "success") {
        router.push("/(root)/(tabs)/home");
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View>
      <View className="flex flex-row justify-center items-center mt-3 gap-x-3">
        <View className="flex-1 h-[1px] bg-general-100" />
        <Text className="text-lg font-JakartaLight text-general-200">Or</Text>
        <View className="flex-1 h-[1px] bg-general-100" />
      </View>

      <Custombutton
        title="Log In with Google"
        className="mt-3 w-full shadow-none"
        IconLeft={() => (
          <Image
            source={icons.google}
            resizeMode="contain"
            className="w-5 h-5 mx-2"
          />
        )}
        bgvariant="outline"
        textVariant="primary"
        onPress={handleGooglesignIn}
      />
    </View>
  );
};

export default OAuth;
