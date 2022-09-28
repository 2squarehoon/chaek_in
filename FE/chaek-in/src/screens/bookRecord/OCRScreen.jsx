import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import styles from './styles';
import { Text, View, ScrollView, Image, Alert, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Environment from '../../config/environment';
import Button from '../../components/Button';
import styled from 'styled-components/native';

// https://cloud.google.com/vision/docs/ocr?apix_params=%7B%22resource%22%3A%7B%22requests%22%3A%5B%7B%22features%22%3A%5B%7B%22type%22%3A%22TEXT_DETECTION%22%7D%5D%2C%22image%22%3A%7B%22source%22%3A%7B%22imageUri%22%3A%22gs%3A%2F%2Fcloud-samples-data%2Fvision%2Focr%2Fsign.jpg%22%7D%7D%7D%5D%7D%7D#vision_text_detection-nodejs

function OCRScreen({ navigation }) {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [response, setResponse] = useState(null);
  const [loadMessage, setLoadMessage] = useState('Pick an image');
  const [image, setImage] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [camera, setCamera] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  // 카메라 권한 허용
  const permissionFunction = async () => {
    const cameraPermission = await Camera.requestCameraPermissionsAsync();
    setCameraPermission(cameraPermission.status === 'granted');
    if (cameraPermission.status !== 'granted') {
      Alert.alert('Permission for media access needed.');
    }
  };
  useEffect(() => {
    permissionFunction();
  }, []);

  // Google Cloud Vision API 호출
  const callGoogleApi = async (base64) => {
    setResponse(null);
    setLoadMessage('Loading...');
    try {
      await fetch(
        'https://vision.googleapis.com/v1/images:annotate?key=' + Environment['GOOGLE_CLOUD_VISION_API_KEY'],
        {
          method: 'POST',
          body: JSON.stringify({
            requests: [
              {
                image: {
                  content: base64,
                },
                features: [{ type: 'TEXT_DETECTION' }],
              },
            ],
          }),
        },
      )
        .then((res) => res.json())
        .then((res) => {
          setResponse(res.responses[0].textAnnotations[0]);
        });
    } catch (e) {
      console.log(e);
      setLoadMessage('Cloud Vision API에서 오류가 발생했어요');
    }
  };

  // 사진 촬영
  const takePicture = async () => {
    if (camera) {
      const options = { quality: 0.5, base64: true };
      const data = await camera.takePictureAsync(options);
      setImageUri(data.uri);
      callGoogleApi(data.base64);
    }
  };

  // 이미지 선택
  const handleClick = async () => {
    let result = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (result.granted === false) {
      Alert.alert('Need permission to Camera Roll for this to work');
      return;
    }
    // base64로 인코딩
    const options = { base64: true };
    // 선택된 이미지를 인코딩하여 변수에 저장
    let pickedImage = await ImagePicker.launchImageLibraryAsync(options);
    if (pickedImage.cancelled === true) {
      return;
    }
    // Image state 업데이트
    setImage(pickedImage);
    // cloud vision api 호출
    callGoogleApi(pickedImage.base64);
  };

  return (
    <ScrollView>
      <Camera ref={(ref) => setCamera(ref)} style={{ width: '100%', height: 300 }} type={type}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}
        >
          <TouchableOpacity
            style={{
              flex: 0.5,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={takePicture}
          >
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>SNAP</Text>
          </TouchableOpacity>
        </View>
      </Camera>
      <Image
        style={{
          width: 200,
          height: 200,
          resizeMode: 'contain',
        }}
        source={{
          uri: imageUri,
        }}
      />
      <View style={styles.wrapper}>
        <View style={styles.textWrapper}>
          <OCRTouchableText
            onPress={() => {
              navigation.navigate('OCRRecordCreate', { OCRText: response.description });
            }}
          >
            {(response && <Text style={styles.nameText}>OCR 처리 완료: {response.description}</Text>) || (
              <Text style={styles.loadingText}>{loadMessage}</Text>
            )}
          </OCRTouchableText>
          <Button text='갤러리' style={styles.button} onPress={handleClick} />
          <Button text='사진 찍기' style={styles.button} onPress={takePicture} />
        </View>
      </View>
    </ScrollView>
  );
}

const OCRTouchableText = styled.TouchableOpacity`
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #000;
  border-radius: 5px;
  width: 100%;
  height: 200px;
`;

export default OCRScreen;
