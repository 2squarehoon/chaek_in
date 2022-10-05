import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import styled, { ThemeConsumer } from 'styled-components/native';
import axios from 'axios';
import { HOST } from '@env';
import { useSelector } from 'react-redux';

function ReadScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [barcodeData, setBarcodeData] = useState(null);
  const [barcodeType, setBarcodeType] = useState(null);
  const { accessToken } = useSelector((state) => state.main);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setBarcodeType(type);
    setBarcodeData(data);
    Alert.alert('책읽기를 시작하시겠습니까?', '', [
      { text: '아니오', style: 'cancel' },
      { text: '네', onPress: () => RegistBook(data) },
    ]);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return (
      <EntireContainer>
        <LoadingText>카메라 허가 요청중입니다.</LoadingText>
      </EntireContainer>
    );
  }
  if (hasPermission === false) {
    return (
      <EntireContainer>
        <LoadingText>카메라에 연결되지 않은 상태입니다.</LoadingText>
      </EntireContainer>
    );
  }

  async function RegistBook(barcode) {
    console.log(barcode);
    const data = { isbn: barcode };
    await axios
      .post(`${HOST}/api/v1/books`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(function (response) {
        console.log(response.data);
        if (response.data.readStatus === 'READING') {
          Alert.alert('책 읽기를 시작합니다.', response.data.title);
        } else if (response.data.readStatus === 'COMPLETE') {
          Alert.alert('책 읽기를 완료합니다.', response.data.title);
        }
        navigation.navigate('BookDetail', { bookId: response.data.bookId });
      })
      .catch(function (error) {
        console.log(error.response.status);
        if (error.response.status === 404) {
          Alert.alert('DB에 등록되지 않은 책입니다ㅠㅠ');
        }
      });
  }

  return (
    <EntireContainer>
      <ScannerContainer>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      </ScannerContainer>
      {scanned && (
        <RetouchButton onPress={() => setScanned(false)}>
          <ButtonText>다시 스캔하기</ButtonText>
        </RetouchButton>
      )}
    </EntireContainer>
  );
}

const EntireContainer = styled.View`
  flex: 2;
  background-color: #fcf9f0;
  align-items: center;
`;

const ScannerContainer = styled.View`
  margin-top : 15%
  width: 300px
  height: 300px
  margin-bottom: 3%
`;

const RetouchButton = styled.TouchableOpacity`
  margin: 10% 20% 0;
  background-color: white;
  width: 60%;
  height: 8%;
  border-radius: 15px;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  border: 1px solid #000;
`;

const ButtonText = styled.Text`
  font-size: 20px;
  font-family: Medium;
`;

const LoadingText = styled.Text`
  font-family: Light;
  font-size: 30px;
`;

export default ReadScreen;
