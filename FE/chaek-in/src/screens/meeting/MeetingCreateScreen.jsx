import React, { useState } from 'react';
import Axios from 'axios';
import { HOST } from '@env';
import { useSelector } from 'react-redux';
import { BackHandler, Modal, StyleSheet, Text, View, Pressable, Alert } from 'react-native';
import styled from 'styled-components/native';

function MeetingCreateScreen({ navigation }) {
  const { accessToken } = useSelector((state) => state.main);
  const [modalVisible, setModalVisible] = useState(false);
  const [meetingTitle, setMeetingTitle] = useState('');
  const [meetingNum, setMeetingNum] = useState(0);
  const [bookTitle, setBookTitle] = useState('');
  const [bookId, setBookId] = useState(0);
  const [meetingDescription, setMeetingDescription] = useState('');
  const [bookList, setBookList] = useState([]);

  function SearchBook() {
    Axios.get(`${HOST}/api/v1/books`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: { keyword: bookTitle },
    })
      .then(function (response) {
        console.log('응답 정상');
        setBookList(response.data.books);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const data = {
    title: meetingTitle,
    description: meetingDescription,
    bookId: bookId,
    maxCapacity: meetingNum,
  };

  function CreateMeeting() {
    Axios.post(`${HOST}/api/v1/meetings`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(function (response) {
        console.log(response.data);
        navigation.navigate('MeetingDetail');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <MeetingCreateView>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {bookList.map((book) => (
              <Pressable
                key={book.bookId}
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setBookId(book.bookId);
                  setBookTitle(book.title);
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>{book.title}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </Modal>

      <MeetingTitleInput
        placeholder='제목'
        value={meetingTitle}
        onChangeText={setMeetingTitle}
      ></MeetingTitleInput>
      <MeetingNumInput
        placeholder='0'
        value={meetingNum}
        onChangeText={setMeetingNum}
        keyboardType='numeric'
      ></MeetingNumInput>
      <BookSearch
        placeholder='책 제목을 입력하세요'
        onSubmitEditing={() => {
          setModalVisible(true);
          SearchBook();
        }}
        value={bookTitle}
        onChangeText={setBookTitle}
      ></BookSearch>
      <MeetingDescriptionInput
        placeholder='모임 설명'
        value={meetingDescription}
        onChangeText={setMeetingDescription}
      ></MeetingDescriptionInput>
      <MeetingCreateButton onPress={CreateMeeting}>
        <MeetingCreateButtonText>모임 생성</MeetingCreateButtonText>
      </MeetingCreateButton>
    </MeetingCreateView>
  );
}

// styled-components
const MeetingCreateView = styled.View`
  flex: 1;
  background-color: #fcf9f0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MeetingTitleInput = styled.TextInput`
  width: 80%;
  height: 50px;
  background-color: #f8dfaa;
  border-radius: 10px;
  border: 1px solid black;
  margin: 10px 0px;
  justify-content: center;
  align-items: center;
`;

const MeetingNumInput = styled.TextInput`
  width: 80%;
  height: 50px;
  background-color: #f8dfaa;
  border-radius: 10px;
  border: 1px solid black;
  margin: 10px 0px;
  justify-content: center;
  align-items: center;
`;

const BookSearch = styled.TextInput`
  width: 80%;
  height: 50px;
  background-color: #f8dfaa;
  border-radius: 10px;
  border: 1px solid black;
  margin: 10px 0px;
  justify-content: center;
  align-items: center;
`;

const MeetingDescriptionInput = styled.TextInput`
  width: 80%;
  height: 200px;
  background-color: #f8dfaa;
  border-radius: 10px;
  border: 1px solid black;
  margin: 10px 0px;
  justify-content: center;
  align-items: center;
`;

const MeetingCreateButton = styled.TouchableOpacity`
  width: 40%;
  height: 50px;
  background-color: #a8ca47;
  border-radius: 10px;
  border: 1px solid black;
  margin: 10px 0px;
  justify-content: center;
  align-items: center;
`;

const MeetingCreateButtonText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: white;
`;
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default MeetingCreateScreen;
