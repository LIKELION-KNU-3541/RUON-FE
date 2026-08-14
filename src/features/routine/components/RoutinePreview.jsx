import React from 'react';
import { ImageBackground, Image, Text, View } from 'react-native';

const backgrounds = {
  morning: require('../../../../assets/images/MorningRoutine-bg.png'),
  evening: require('../../../../assets/images/EveningRoutine-bg.png'),
};

function Bottle({ index, product }) {
  return (
    <View className="flex-col h-[153px]">
      <View className="items-center gap-4">
        <Text className="font-pretendard font-extrabold text-[10px] text-[#FBF9F7]">Step 0{index +1}</Text>
        <View className="rounded-[50%] w-2 h-2 bg-[#FBF9F7]"></View>
        <View className="justify-center h-full max-h-32">
          <Image resizeMode="contain" source={product.image}></Image>
        </View>
      <Text className="-m-4 font-pretendard-regular w-[55px] text-center text-[10px] text-[#FBF9F7] whitespace-pre-wrap">{product.label}</Text>
      </View>

    </View>
  );
}

export default function RoutinePreview({ products, evening }) {
  return (
    <ImageBackground className="relative overflow-hidden h-[240px] rounded-[16px]" 
      source={evening ? backgrounds.evening : backgrounds.morning} style={{ flex: 1}}>
      <View className="relative items-center h-[208px] overflow-hidden rounded-[18px]">
        <View className="absolute left-[42px] right-[42px] top-[65px] h-[1px] bg-white/80" />
        <View className="absolute justify-between gap-4  bottom-[20px] left-[53px] flex-row w-[254px]">{products.map((product, index) => <Bottle key={product.label} index={index} product={product} />)}</View>
      </View>
    </ImageBackground>
  );
}
