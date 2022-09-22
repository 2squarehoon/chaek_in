import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
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
        {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
      </ScannerContainer>
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
  flex: 1;
`;

const ResultContainer = styled.View`
  flex: 1;
`;

export default ReadScreen;
