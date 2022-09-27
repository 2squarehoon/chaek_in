import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import styled from 'styled-components/native';

function ReadScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [barcodeType, setBarcodeType] = useState(null);
  const [barcodeData, setBarcodeData] = useState(null);

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
    Alert.alert('스캔되었습니다.');
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
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
