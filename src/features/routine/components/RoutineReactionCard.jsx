import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useResponsiveScale } from '../../../shared/utils/responsive';
import RoutineGlassBackground from './RoutineGlassBackground';
import MorningWorst from '../../../../assets/icons/face-Mworst-icon.svg';
import MorningBad from '../../../../assets/icons/face-Mbad-icon.svg';
import MorningNormal from '../../../../assets/icons/face-Mnormal-icon.svg';
import MorningGood from '../../../../assets/icons/face-Mgood-icon.svg';
import MorningBest from '../../../../assets/icons/face-Mbest-icon.svg';
import EveningWorst from '../../../../assets/icons/face-Eworst-icon.svg';
import EveningBad from '../../../../assets/icons/face-Ebad-icon.svg';
import EveningNormal from '../../../../assets/icons/face-Enormal-icon.svg';
import EveningGood from '../../../../assets/icons/face-Egood-icon.svg';
import EveningBest from '../../../../assets/icons/face-Ebest-icon.svg';
import SelectedWorst from '../../../../assets/icons/face-Sworst-icon.svg';
import SelectedBad from '../../../../assets/icons/face-Sbad-icon.svg';
import SelectedNormal from '../../../../assets/icons/face-Snormal-icon.svg';
import SelectedGood from '../../../../assets/icons/face-Sgood-icon.svg';
import SelectedBest from '../../../../assets/icons/face-Sbest-icon.svg';



const ITEMS = [
  [MorningWorst, EveningWorst, SelectedWorst, '당기고 건조했어요 '],
  [MorningBad, EveningBad, SelectedBad, '따갑거나 붉어졌어요'],
  [MorningNormal, EveningNormal, SelectedNormal, '평소와 같아요'],
  [MorningGood, EveningGood, SelectedGood, '편안했어요'],
  [MorningBest, EveningBest, SelectedBest, '촉촉해졌어요'],
];


export default function RoutineReactionCard ( { theme }) {
  const { scale, moderateScale } = useResponsiveScale();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const evening = theme?.screenBackground === '#9A5B2C';

  return (
    <View className="flex-1 flex-col items-center overflow-hidden rounded-[21px] border py-[10px] px-[20px]" style={{ backgroundColor: theme.card, borderColor: theme.border}}>
      <RoutineGlassBackground visible={evening} />
      <Text className="font-pretendard-regular" style={{ color: theme.text, fontSize: moderateScale(10) }}>오늘 루틴 어떠셨나요?</Text>
      <View className="flex-row justify-between items-center ">
        {ITEMS.map(([MorningFaceIcon, EveningFaceIcon, SelectedFaceIcon, label], index) => {
          const isSelected = selectedIndex === index;
          const DisplayIcon = isSelected
            ? SelectedFaceIcon
            : evening ? EveningFaceIcon : MorningFaceIcon;

          return (
          <Pressable className="flex-1 items-center" key={label} onPress={() => setSelectedIndex(index)}>
            <View
              className="items-center justify-center my-[12.5px]"
            >
              <DisplayIcon
                width={scale(41)}
                height={scale(41)}
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
