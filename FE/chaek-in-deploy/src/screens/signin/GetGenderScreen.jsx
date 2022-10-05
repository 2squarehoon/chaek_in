import React from 'react';
import { Keyboard } from 'react-native';
import styled from 'styled-components/native';
import SelectDropdown from 'react-native-select-dropdown';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

function GetGenderScreen({ navigation, route }) {
  const goToRating = async (gender) => {
    await navigation.navigate('RatingSkip', {
      email: route.params.email,
      sub: route.params.sub,
      nickname: route.params.nickname,
      job: route.params.job,
      age: route.params.age,
      gender: gender,
    });
  };

  return (
    <EntireContainer>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <TitleContainer>
          <TitleText>성별을 선택해주세요</TitleText>
          <TitleText> </TitleText>
        </TitleContainer>
        <FormContainer>
          <DropdownContainer>
            <SelectDropdown
              data={['남성', '여성']}
              defaultButtonText='성별을 선택해주세요'
              onSelect={(selectedItem, index) => {
                if (selectedItem == '남성') {
                  goToRating('MALE');
                } else if (selectedItem == '여성') {
                  goToRating('FEMALE');
                }
              }}
              buttonStyle={{
                width: 200,
                backgroundColor: '#ffffff',
                borderBottomWidth: 1,
                borderBottomColor: '#000000',
              }}
              rowStyle={{ backgroundColor: '#fcf9f0' }}
            />
          </DropdownContainer>
        </FormContainer>
      </TouchableWithoutFeedback>
    </EntireContainer>
  );
}

const EntireContainer = styled.View`
  background-color: #fcf9f0;
  flex: 1;
`;

const TitleContainer = styled.View`
  margin: 5% 5% 18%;
`;

const TitleText = styled.Text`
  font-size: 35px;
`;

const FormContainer = styled.View`
border: 1px solid #000;
width: 90%;
height: 70%
border-radius: 15px;
margin-left:5%
background-color: #ffffff;
`;

const DropdownContainer = styled.View`
  margin: 5% 5%;
`;

export default GetGenderScreen;
