import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { Text, View, ScrollView, Image, Alert, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Button from '../../components/Button';
import styled from 'styled-components/native';
import { GOOGLE_CLOUD_VISION_API_KEY } from '@env';

// https://cloud.google.com/vision/docs/ocr?apix_params=%7B%22resource%22%3A%7B%22requests%22%3A%5B%7B%22features%22%3A%5B%7B%22type%22%3A%22TEXT_DETECTION%22%7D%5D%2C%22image%22%3A%7B%22source%22%3A%7B%22imageUri%22%3A%22gs%3A%2F%2Fcloud-samples-data%2Fvision%2Focr%2Fsign.jpg%22%7D%7D%7D%5D%7D%7D#vision_text_detection-nodejs

function OCRScreen({ navigation, route }) {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [response, setResponse] = useState(null);
  const [loadMessage, setLoadMessage] = useState('Pick an image');
  const [image, setImage] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [camera, setCamera] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [isCamera, setIsCamera] = useState(true);
  const [isResponse, setIsResponse] = useState(false);
  const bookId = route.params.bookId;

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
      await fetch(`https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_CLOUD_VISION_API_KEY}`, {
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
      })
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
      setIsCamera(false);
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
      setIsCamera(true);
      return;
    }
    // Image state 업데이트
    setImage(pickedImage);
    // cloud vision api 호출
    callGoogleApi(pickedImage.base64);
    setIsCamera(false);
  };

  return (
    <ScrollView
      style={{
        backgroundColor: '#FCF9F0',
        flex: 1,
      }}
    >
      {isCamera ? (
        <Camera
          ref={(ref) => setCamera(ref)}
          style={{ width: '100%', height: 400 }}
          type={type}
          ratio={'1:1'}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'row',
            }}
          ></View>
          <TouchableOpacity
            style={{
              alignSelf: 'flex-end',
              alignItems: 'center',
              backgroundColor: '#A8CA47',
              borderRadius: 10,
              margin: 10,
              padding: 10,
              borderColor: 'black',
              borderWidth: 1,
            }}
            onPress={takePicture}
          >
            <Text style={{ fontSize: 14, color: 'white', fontFamily: 'Medium' }}>문장 찍기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignSelf: 'flex-end',
              alignItems: 'center',
              backgroundColor: '#A8CA47',
              borderRadius: 10,
              margin: 10,
              padding: 10,
              borderColor: 'black',
              borderWidth: 1,
            }}
            onPress={handleClick}
          >
            <Text style={{ fontSize: 14, color: 'white', fontFamily: 'Medium' }}>내 갤러리</Text>
          </TouchableOpacity>
        </Camera>
      ) : (
        <View
          styles={{
            flex: 1,
            backgroundColor: '#FCF9F0',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            style={{
              width: 300,
              height: 300,
              marginLeft: 30,
              borderRadius: 10,
              borderColor: 'black',
              borderWidth: 1,
            }}
            source={{
              uri: imageUri,
            }}
          />
          <View
            style={{
              marginHorizontal: 20,
              backgroundColor: '#FCF9F0',
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('OCRRecordCreate', {
                  OCRText: response.description,
                  bookId: bookId,
                });
              }}
            >
              <View>
                <OCRScrollView
                  style={{
                    backgroundColor: 'white',
                  }}
                >
                  <View style={{ padding: 10 }}>
                    {(response && (
                      <Text
                        style={{
                          fontFamily: 'Medium',
                        }}
                      >
                        {response.description}
                      </Text>
                    )) || (
                      <Text
                        style={{
                          fontFamily: 'Medium',
                        }}
                      >
                        {loadMessage}
                      </Text>
                    )}
                  </View>
                </OCRScrollView>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const OCRScrollView = styled.ScrollView`
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #000;
  border-radius: 5px;
  width: 100%;
  height: 200px;
`;

export default OCRScreen;
