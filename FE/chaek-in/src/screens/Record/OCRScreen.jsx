import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import styles from './styles';
import { Text, View, ScrollView, Image, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import Environment from '../../config/environment';
// import { HeaderBackButton } from '@react-navigation/stack';
import Button from '../../components/Button';

// https://cloud.google.com/vision/docs/ocr?apix_params=%7B%22resource%22%3A%7B%22requests%22%3A%5B%7B%22features%22%3A%5B%7B%22type%22%3A%22TEXT_DETECTION%22%7D%5D%2C%22image%22%3A%7B%22source%22%3A%7B%22imageUri%22%3A%22gs%3A%2F%2Fcloud-samples-data%2Fvision%2Focr%2Fsign.jpg%22%7D%7D%7D%5D%7D%7D#vision_text_detection-nodejs

export default function OCRScreen({ navigation }) {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [response, setResponse] = useState(null);
  const [loadMessage, setLoadMessage] = useState('Pick an image');
  const [image, setImage] = useState(null);

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

  const handleClick = async () => {
    let result = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (result.granted === false) {
      Alert.alert('Need permission to Camera Roll for this to work');
      return;
    }
    const options = { base64: true };

    let pickedImage = await ImagePicker.launchImageLibraryAsync(options);

    if (pickedImage.cancelled === true) {
      return;
    }

    setImage(pickedImage);
    callGoogleApi(pickedImage.base64);
  };

  const handleCameraClick = async () => {
    let result = await Camera.requestCameraPermissionsAsync();

    if (result.granted === false) {
      Alert.alert('Need permission to Camera for this to work');
      return;
    }
    const options = { base64: true };
  };

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
          // console.log(res.responses[0].textAnnotations[0]);
        });
    } catch (e) {
      console.log(e);
      setLoadMessage('Google couldnt process the image');
    }
  };
  return (
    <ScrollView>
      <View style={styles.wrapper}>
        <View style={styles.textWrapper}>
          <Text style={styles.text}>Google Vision API</Text>
          <Text>Google will try to guess whats in your image</Text>
          {response && (
            <View style={styles.imgWrapper}>
              <Image
                style={styles.image}
                source={{
                  uri: `data:image/jpeg;base64,${image.base64}`,
                }}
              />
            </View>
          )}
          {(response && (
            <Text style={styles.nameText}>Your image contained: {response.description}</Text>
          )) || <Text style={styles.loadingText}>{loadMessage}</Text>}

          <Button text='Choose an Image' style={styles.button} onPress={handleClick} />
          <Button text='Snap a Picture' style={styles.button} onPress={handleCameraClick} />
        </View>
      </View>
    </ScrollView>
  );
}
