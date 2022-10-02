import React from 'react';
import { Keyboard } from 'react-native';
import styled from 'styled-components/native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import SelectDropdown from 'react-native-select-dropdown';

function GetAgeScreen({ navigation, route }) {
  const goToGender = async (age) => {
    console.log(age);
    await navigation.navigate('Gender', {
      age: age,
      email: route.params.email,
      nickname: route.params.nickname,
      job: route.params.job,
    });
  };
  const getYears = (num, start = 1) => new Array(num).fill(0).map((_, i) => start + i);

  return (
    <EntireContainer>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <TitleContainer>
          <TitleText>나이를 입력해주세요</TitleText>
          <TitleText> </TitleText>
        </TitleContainer>
        <FormContainer>
          <DropdownContainer>
            <SelectDropdown
              data={getYears(25, 1980)}
              // defaultValue='2000'
              onSelect={(selectedItem, index) => {
                console.log(selectedItem);
                goToGender(selectedItem);
              }}
              defaultButtonText='태어난 연도를 선택해주세요'
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

export default GetAgeScreen;
