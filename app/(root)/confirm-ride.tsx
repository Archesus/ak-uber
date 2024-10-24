/* eslint-disable prettier/prettier */
import Custombutton from "@/components/CustomButtons";
import DriverCard from "@/components/DriverCard";
import RideLayout from "@/components/RideLayout";
import { useDriverstore } from "@/store";
import { router } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

const ConfirmRide = () => {
  const { drivers, selectedDriver, setSelectedDriver } = useDriverstore();

  return (
    <RideLayout title="Choose a Ride" snapPoints={["65%", "85%"]}>
      <FlatList
        data={drivers}
        renderItem={({ item }) => (
          <DriverCard
            item={item}
            selected={selectedDriver!}
            setSelected={() => setSelectedDriver(Number(item.id)!)}
          />
        )}
        ListFooterComponent={() => (
          <View className="mx-5 mt-10">
            <Custombutton
              title="Select Ride"
              onPress={() => router.push("/(root)/book-ride")}
            />
          </View>
        )}
      />
    </RideLayout>
  );
};

export default ConfirmRide;
