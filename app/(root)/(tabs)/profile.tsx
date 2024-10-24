/* eslint-disable prettier/prettier */
// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Image,
//   TouchableOpacity,
//   Alert,
//   Text,
//   TouchableWithoutFeedback,
// } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import { icons } from "@/constants";
// import { SafeAreaView } from "react-native-safe-area-context";
// import InputField from "@/components/InputField";
// import { useUser } from "@clerk/clerk-expo";

// export default function ProfilePicture() {
//   const { user } = useUser();
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const pickImage = async () => {
//     setIsLoading(true);
//     try {
//       const { status } =
//         await ImagePicker.requestMediaLibraryPermissionsAsync();

//       if (status !== "granted") {
//         Alert.alert(
//           "Permission Required",
//           "Please allow access to your photo library to change your profile picture."
//         );
//         setIsLoading(false);
//         return;
//       }

//       let result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         aspect: [1, 1],
//         quality: 1,
//       });

//       console.log("Image picker result:", result); // Debug log

//       if (!result.canceled && result.assets && result.assets[0]) {
//         const imageUri = result.assets[0].uri;
//         console.log("Setting image URI:", imageUri); // Debug log
//         setSelectedImage(imageUri);
//       }
//     } catch (error) {
//       console.error("Error picking image:", error);
//       Alert.alert("Error", "Failed to pick image");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Debug useEffect to monitor state changes
//   useEffect(() => {
//     console.log("Selected image state updated:", selectedImage);
//   }, [selectedImage]);

//   const profileImage = selectedImage || "https://i.pravatar.cc/300";
//   console.log("Current profile image:", profileImage); // Debug log

//   return (
//     <SafeAreaView>
//       <Text className="text-2xl font-JakartaBold p-7">Your Profile</Text>
//       <View className="flex items-center justify-center">
//         <TouchableOpacity
//           onPress={pickImage}
//           className="relative"
//           activeOpacity={0.8}
//         >
//           <View className="w-32 h-32 overflow-hidden rounded-full bg-gray-200 shadow-lg shadow-neutral-900">
//             <Image
//               source={{ uri: profileImage }}
//               className="w-full h-full"
//               resizeMode="cover"
//               onError={(e) => {
//                 console.error("Image loading error:", e.nativeEvent.error);
//                 Alert.alert("Error", "Failed to load image");
//               }}
//               onLoad={() => console.log("Image loaded successfully")} // Debug log
//             />
//           </View>

//           <View className="absolute bottom-0 right-0 bg-white/80 border border-neutral-200 shadow-neutral-500 rounded-full p-1.5 items-center justify-center shadow-md">
//             <Image source={icons.camera} className="w-6 h-6" />
//           </View>
//         </TouchableOpacity>

//         {isLoading && <Text className="mt-2 text-gray-500">Loading...</Text>}
//       </View>

//       <View className="h-full w-11/12 mx-auto bg-white mt-7 rounded-lg p-5">
//         <TouchableWithoutFeedback>
//           <InputField
//             label="First Name"
//             value={user?.firstName}
//             editable={false}
//             inputStyle="text-neutral-600"
//           />
//         </TouchableWithoutFeedback>

//         <TouchableWithoutFeedback>
//           <InputField
//             label="Last Name"
//             value={user?.lastName}
//             editable={false}
//             inputStyle="text-neutral-600"
//           />
//         </TouchableWithoutFeedback>

//         <TouchableWithoutFeedback>
//           <InputField
//             label="Email"
//             value={user?.emailAddresses[0].emailAddress}
//             editable={false}
//             inputStyle="text-neutral-600"
//           />
//         </TouchableWithoutFeedback>

//         <TouchableWithoutFeedback>
//           <InputField
//             label="Phone Number"
//             value="+123-456-789"
//             editable={false}
//             inputStyle="text-neutral-600"
//           />
//         </TouchableWithoutFeedback>
//       </View>
//     </SafeAreaView>
//   );
// }

import { useUser } from "@clerk/clerk-expo";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import InputField from "@/components/InputField";
import React from "react";

const Profile = () => {
  const { user } = useUser();

  return (
    <SafeAreaView className="flex-1">
      <ScrollView
        className="px-5"
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <Text className="text-2xl font-JakartaBold my-5">My profile</Text>

        <View className="flex items-center justify-center my-5">
          <Image
            source={{
              uri: user?.externalAccounts[0]?.imageUrl ?? user?.imageUrl,
            }}
            style={{ width: 110, height: 110, borderRadius: 110 / 2 }}
            className=" rounded-full h-[110px] w-[110px] border-[3px] border-white shadow-sm shadow-neutral-300"
          />
        </View>

        <View className="flex flex-col items-start justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 px-5 py-3">
          <View className="flex flex-col items-start justify-start w-full">
            <InputField
              label="First name"
              placeholder={user?.firstName || "Not Found"}
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={false}
            />

            <InputField
              label="Last name"
              placeholder={user?.lastName || "Not Found"}
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={false}
            />

            <InputField
              label="Email"
              placeholder={
                user?.primaryEmailAddress?.emailAddress || "Not Found"
              }
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={false}
            />

            <InputField
              label="Phone"
              placeholder={user?.primaryPhoneNumber?.phoneNumber || "Not Found"}
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={false}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
