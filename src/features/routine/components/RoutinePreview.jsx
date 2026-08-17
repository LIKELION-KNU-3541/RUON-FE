import React from 'react';
import { ImageBackground, Image, Text, View } from 'react-native';

const backgrounds = {
  morning: require('../../../../assets/images/MorningRoutine-bg.png'),
  evening: require('../../../../assets/images/EveningRoutine-bg.png'),
};

function Bottle({ index, product }) {
  return (
    <View className="w-[55px] h-[153px] items-center">
      <View className="w-full items-center gap-4">
        <Text className="font-pretendard font-extrabold text-[10px] text-[#FBF9F7]">
          Step 0{index +1}
        </Text>
        <View className="w-2 h-2" />
        <View className="justify-center h-full max-h-32">
          <Image resizeMode="contain" source={product.image}></Image>
        </View>
      <Text className="-m-4 font-pretendard-regular w-[55px] text-center text-[10px] text-[#FBF9F7] whitespace-pre-wrap">
        {product.label}
      </Text>
      </View>

    </View>
  );
}

export default function RoutinePreview({ products, evening }) {
  return (
    <ImageBackground className="relative overflow-hidden h-[240px] rounded-[16px]" 
      source={evening ? backgrounds.evening : backgrounds.morning} style={{ flex: 1}}>
      <View className="relative items-center h-[208px] overflow-hidden rounded-[18px]">
        <View className="absolute left-[42px] right-[42px] top-[63px] h-2">
          <View
            className="absolute left-0 right-0 h-[1px] bg-white/80"
            style={{ top: '50%', transform: [{ translateY: -0.5 }] }}
          />
          <View className="absolute left-[11px] top-0 w-[254px] flex-row justify-between">
            {products.map((product) => (
              <View key={product.label} className="w-[55px] items-center">
                <View className="rounded-[50%] w-2 h-2 bg-[#FBF9F7]" />
              </View>
            ))}
          </View>
        </View>
        <View className="absolute bottom-[20px] left-[53px] w-[254px] flex-row justify-between">
          {products.map((product, index) => <Bottle key={product.label} index={index} product={product} />)}</View>
      </View>
    </ImageBackground>
  );
}
