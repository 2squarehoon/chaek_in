import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import styled, { ThemeConsumer } from 'styled-components/native';
import Axios from 'axios';
import { HOST } from '@env';
import { useSelector } from 'react-redux';

function ReadScreen() {
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

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    setBarcodeType(type);
    setBarcodeData(data);
    await Alert.alert('책읽기를 시작하시겠습니까?', '', [
      { text: '아니오', style: 'cancel' },
      { text: '네', onPress: () => RegistBook(data) },
    ]);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  async function RegistBook(barcode) {
    const data = { isbn: barcode };
    console.log(barcode);
    console.log(typeof barcode);
    await Axios.post(`${HOST}/api/v1/books`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <>
      <ScannerContainer>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      </ScannerContainer>
      {scanned && <Button title={'다시 스캔하기'} onPress={() => setScanned(false)} />}
      <ResultContainer>
        <View>
          <Text>타입 : {barcodeType}</Text>
        </View>
        <View>
          <Text>데이터 : {barcodeData}</Text>
        </View>
      </ResultContainer>
    </>
  );
}

const ScannerContainer = styled.View`
  width: 60%
  margin-left: 20%
  margin-bottom: 5%
  flex: 2;
`;

const ResultContainer = styled.View`
  flex: 1;
`;

export default ReadScreen;
