import React, { useState } from 'react';
import { Image, ImageBackground, Pressable, Text, View } from 'react-native';
import { useResponsiveScale } from '../../../shared/utils/responsive';
const eveningReactionBackground = require('../../../../assets/images/RoutineReaction-bg.png');
import MorningWorst from '../../../../assets/icons/face-Mworst-icon.svg';
import MorningBad from '../../../../assets/icons/face-Mbad-icon.svg';
import MorningNormal from '../../../../assets/icons/face-Mnormal-icon.svg';
import MorningGood from '../../../../assets/icons/face-Mgood-icon.svg';
import MorningBest from '../../../../assets/icons/face-Mbest-icon.svg';
import SelectedWorstImage from '../../../../assets/images/face-Sworst-icon.png';
import SelectedBadImage from '../../../../assets/images/face-Sbad-icon.png';
import SelectedNormalImage from '../../../../assets/images/face-Snormal-icon.png';
import SelectedGoodImage from '../../../../assets/images/face-Sgood-icon.png';
import SelectedBestImage from '../../../../assets/images/face-Sbest-icon.png';
import EveningWorstImage from '../../../../assets/images/face-Eworst-icon.png';
import EveningBadImage from '../../../../assets/images/face-Ebad-icon.png';
import EveningNormalImage from '../../../../assets/images/face-Enormal-icon.png';
import EveningGoodImage from '../../../../assets/images/face-Egood-icon.png';
import EveningBestImage from '../../../../assets/images/face-Ebest-icon.png';



function FaceImageIcon({ source, width, height }) {
  return <Image source={source} resizeMode="contain" style={{ width, height }} />;
}

const EveningWorst = (props) => <FaceImageIcon {...props} source={EveningWorstImage} />;
const EveningBad = (props) => <FaceImageIcon {...props} source={EveningBadImage} />;
const EveningNormal = (props) => <FaceImageIcon {...props} source={EveningNormalImage} />;
const EveningGood = (props) => <FaceImageIcon {...props} source={EveningGoodImage} />;
const EveningBest = (props) => <FaceImageIcon {...props} source={EveningBestImage} />;
const SelectedWorst = (props) => <FaceImageIcon {...props} source={SelectedWorstImage} />;
const SelectedBad = (props) => <FaceImageIcon {...props} source={SelectedBadImage} />;
const SelectedNormal = (props) => <FaceImageIcon {...props} source={SelectedNormalImage} />;
const SelectedGood = (props) => <FaceImageIcon {...props} source={SelectedGoodImage} />;
const SelectedBest = (props) => <FaceImageIcon {...props} source={SelectedBestImage} />;



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
  const labelColor = evening ? '#AAAAAA' : '#3F3F3F';

  return (
    <View
      className="flex-1 overflow-hidden rounded-[21px] border"
      style={{
        backgroundColor: evening ? 'transparent' : theme.card,
        borderColor: evening ? 'transparent' : theme.border,
        overflow: evening ? 'visible' : 'hidden',
        width: '100%',
        alignSelf: 'stretch',
      }}
    >
      <ImageBackground
        source={evening ? eveningReactionBackground : undefined}
        resizeMode="stretch"
        className="items-center px-[20px] py-[10px]"
        style={{ alignSelf: 'stretch' }}
      >
        <Text className="font-pretendard-regular" style={{ color: theme.text, fontSize: moderateScale(10) }}>오늘 루틴 어떠셨나요?</Text>
        <View className="flex-row items-center justify-between">
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
            <Text
              className="font-pretendard-regular flex-1 items-center"
              style={{
                color: evening && isSelected ? '#F7D961' : labelColor,
                fontSize: moderateScale(6),
              }}
            >
              {label} 
            </Text>
          </Pressable>
          );
        })}

        </View>
      </ImageBackground>
    </View>

  );
}
