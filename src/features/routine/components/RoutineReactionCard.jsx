import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useResponsiveScale } from '../../../shared/utils/responsive';
import Worst from '../../../../assets/icons/face-worst-icon.svg';
import Bad from '../../../../assets/icons/face-bad-icon.svg';
import Normal from '../../../../assets/icons/face-normal-icon.svg';
import Good from '../../../../assets/icons/face-good-icon.svg';
import Best from '../../../../assets/icons/face-best-icon.svg';



const ITEMS = [[ Worst, '너무 건조해요'], [Bad, '조금 건조해요'], [Normal, '괜찮아요'], [Good, '좋아요'], [Best, '아주 좋아요']];


export default function RoutineReactionCard ( { theme }) {
  const { scale, moderateScale } = useResponsiveScale();
  const [selectedIndex, setSelectedIndex] = useState(null);

  return (
    <View className="flex-1 flex-col items-center rounded-[21px] py-[10px] px-[20px]" style={{ backgroundColor: theme.card, borderColor: theme.border}}>
      <Text className="font-pretendard-regular" style={{ color: theme.text, fontSize: moderateScale(10) }}>오늘 루틴 어떠셨나요?</Text>
      <View className="flex-row justify-between items-center ">
        {ITEMS.map(([FaceIcon, label], index) => {
          const isSelected = selectedIndex === index;

          return (
          <Pressable className="flex-1 items-center" key={label} onPress={() => setSelectedIndex(index)}>
            <View
              className="items-center justify-center my-[12.5px]"
              style={isSelected ? {
                borderRadius: scale(21),
                shadowColor: theme.reactionIconSelected,
                shadowOpacity: 0.75,
                shadowRadius: 6,
                shadowOffset: { width: 0, height: 0 },
                elevation: 6,
              } : undefined}
            >
              <FaceIcon
                width={scale(41)}
                height={scale(41)}
                color={isSelected ? theme.reactionIconSelected : theme.reactionIconBackground}
                fill={isSelected ? theme.reactionIconSelectedLine : theme.reactionIconLine}
                stroke={isSelected ? theme.reactionIconSelectedLine : theme.reactionIconLine}
              />
            </View>
            <Text className="font-pretendard-regular flex-1 items-center" style={{ color: isSelected ? theme.selectedText : theme.text, fontSize: moderateScale(6) }}>
              {label} 
            </Text>
          </Pressable>
          );
        })}

      </View>
    </View>

  );
}
