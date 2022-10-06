import React, { useState } from 'react';
import Axios from 'axios';
import { HOST } from '@env';
import { useSelector } from 'react-redux';
import { BackHandler, Modal, StyleSheet, Text, View, Pressable, Alert, Keyboard } from 'react-native';
import styled from 'styled-components/native';
import { AntDesign } from '@expo/vector-icons';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';

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
        navigation.navigate('MeetingDetail', { meetingId: response.data.meetingId });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <MeetingCreateView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Modal
          animationType='slide'
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <ScrollView>
            {/* bookList가 있으면 표시하고, 없으면 '결과가 없습니다' 표시 */}
            <View style={styles.centeredView}>
              {bookList.length > 0 ? (
                <View style={styles.modalView}>
                  {bookList.map((book) => (
                    <ModalPressable
                      key={book.bookId}
                      onPress={() => {
                        setBookId(book.bookId);
                        setBookTitle(book.title);
                        setModalVisible(!modalVisible);
                      }}
                    >
                      <BookImage source={{ uri: book.cover }} />
                      <ModalText>{book.title}</ModalText>
                    </ModalPressable>
                  ))}
                </View>
              ) : (
                <View style={styles.modalView}>
                  <ModalText>결과가 없습니다</ModalText>
                </View>
              )}
            </View>
          </ScrollView>
        </Modal>

        <MeetingTitleInput
          placeholder='독서 모임 이름'
          value={meetingTitle}
          onChangeText={setMeetingTitle}
        ></MeetingTitleInput>
        <MeetingNumInput
          placeholder='인원수'
          value={meetingNum}
          onChangeText={setMeetingNum}
          keyboardType='numeric'
        ></MeetingNumInput>
        <SearchView>
          <AntDesign name='search1' size={24} color='black' />
          <BookSearch
            placeholder='책 검색하기'
            onSubmitEditing={() => {
              setModalVisible(true);
              SearchBook();
            }}
            value={bookTitle}
            onChangeText={setBookTitle}
          ></BookSearch>
        </SearchView>
        <MeetingDescriptionInput
          multiline={true}
          numberOfLines={10}
          placeholder='어떤 독서 모임인지 알려주세요!'
          value={meetingDescription}
          onChangeText={setMeetingDescription}
        ></MeetingDescriptionInput>
        <MeetingCreateButton onPress={CreateMeeting}>
          <MeetingCreateButtonText>독서 모임 만들기</MeetingCreateButtonText>
        </MeetingCreateButton>
        <FakeView></FakeView>
      </TouchableWithoutFeedback>
    </MeetingCreateView>
  );
}

// styled-components
const FakeView = styled.View`
  flex: 1;
`;
const MeetingCreateView = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: #fcf9f0;
  flex-direction: column;
  align-items: center;
`;

const MeetingTitleInput = styled.TextInput`
  flex: 0.5;
  width: 80%;
  height: 50px;
  background-color: white;
  border-radius: 10px;
  border: 1px solid black;
  margin: 10px 0px;
  padding: 10px;
  font-size: 14px;
  font-family: Medium;
  justify-content: center;
  align-items: center;
`;

const MeetingNumInput = styled.TextInput`
  flex: 0.5;
  width: 80%;
  height: 50px;
  background-color: white;
  border-radius: 10px;
  border: 1px solid black;
  margin: 10px 0px;
  padding: 10px;
  font-size: 14px;
  font-family: Medium;
  justify-content: center;
  align-items: center;
`;

const BookSearch = styled.TextInput`
  width: 80%;
  height: 50px;
  background-color: white;
  border-radius: 10px;
  border: 1px solid black;
  margin: 10px 0px;
  margin-left: 20px;
  padding: 10px;
  font-size: 14px;
  font-family: Medium;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const MeetingDescriptionInput = styled.TextInput`
  flex: 3;
  width: 80%;
  height: 50px;
  background-color: white;
  border-radius: 10px;
  border: 1px solid black;
  padding: 10px;
  margin: 10px 0px;
  font-size: 14px;
  font-family: Medium;
`;

const MeetingCreateButton = styled.TouchableOpacity`
  width: 45%;
  height: 7%;
  background-color: #a8ca47;
  border-radius: 15px;
  border: 1px solid black;
  margin: 10px 0px;
  justify-content: center;
  align-items: center;
`;

const MeetingCreateButtonText = styled.Text`
  font-size: 16px;
  font-family: Medium;
  color: white;
`;

const SearchView = styled.View`
  flex: 1;
  width: 80%;
  height: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 10px 0px;
`;

const ModalPressable = styled.Pressable`
  flex: 1;
  flex-direction: row;
  width: 100%;
  height: 90px;
  background-color: #f8dfaa;
  border-radius: 10px;
  border: 1px solid black;
  margin: 5px 0px;
  padding: 10px;
  justify-content: center;
  align-items: center;
`;

const ModalText = styled.Text`
  flex: 8;
  font-size: 14px;
  font-family: Medium;
  color: black;
`;

const BookImage = styled.Image`
  flex: 2;
  width: 40px;
  height: 50px;
  margin: 0 10px;
  resize-mode: contain;
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
    alignItems: 'flex-start',
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
