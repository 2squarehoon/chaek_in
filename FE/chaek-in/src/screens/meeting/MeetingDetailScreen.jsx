import { StyleSheet, Text, View, Button, TextInput, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Axios from 'axios';
import { HOST } from '@env';
import styled from 'styled-components/native';

function MeetingDetailScreen({ route }) {
  const { accessToken } = useSelector((state) => state.main);
  const [bookTitle, setBookTitle] = useState('');
  const [cover, setCover] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [currentMember, setCurrentMember] = useState(0);
  const [description, setDescription] = useState('');
  const [isMine, setIsMine] = useState(false);
  const [maxCapacity, setMaxCapacity] = useState(0);
  const [meetingId, setMeetingId] = useState(0);
  const [meetingTitle, setMeetingTitle] = useState('');

  const [comment, setComment] = useState('');
  const [replyComment, setReplyComment] = useState('');
  const [isReplyOpened, setIsReplyOpened] = useState(false);
  // MeetingDetail 가져오기
  useEffect(() => {
    Axios.get(`${HOST}/api/v1/meetings/${route.params.meetingId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(function (response) {
        console.log(response.data);
        setBookTitle(response.data.bookTitle);
        setCover(response.data.cover);
        setCreatedAt(response.data.createdAt);
        setCurrentMember(response.data.currentMember);
        setDescription(response.data.description);
        setIsMine(response.data.isMine);
        setMaxCapacity(response.data.maxCapacity);
        setMeetingId(response.data.meetingId);
        setMeetingTitle(response.data.meetingTitle);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  // 댓글 조회
  const [commentList, setCommentList] = useState([]);
  useEffect(() => {
    Axios.get(`${HOST}/api/v1/meetings/${route.params.meetingId}/comments`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(function (response) {
        console.log(response.data.comments);
        setCommentList(response.data.comments);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  // 댓글 작성
  function CreateComment() {
    const data = {
      content: comment,
    };
    Axios.post(`${HOST}/api/v1/meetings/${meetingId}/comments`, data, {
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

  // 대댓글 작성
  function CreateReplyComment(parentId) {
    const data = {
      parentId: parentId,
      content: replyComment,
    };
    Axios.post(`${HOST}/api/v1/meetings/${meetingId}/comments`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(function (response) {
        console.log(parentId);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <View style={styles.container}>
      <Text>{meetingTitle}</Text>
      <Text>{bookTitle}</Text>
      <Text>{description}</Text>
      <Text>{currentMember}</Text>
      <Text>{maxCapacity}</Text>
      <Text>{createdAt}</Text>
      <Text>{isMine}</Text>
      <Text>{meetingId}</Text>
      <Image
        style={{ width: 60, height: 80 }}
        source={{
          uri: cover,
        }}
      />
      <CommentScrollView>
        {/* {commentList.map((comment) => (
          <CommentView key={comment}>
            <CommentText>{comment.parent.content}</CommentText>
            <ReplyCommentText>{comment.child.content}</ReplyCommentText>
            <ReplyCommentView>
              {commentList.map((comment) => (
                <ReplyCommentText key={comment.children.meetingCommentId}>
                  {comment.children.content}
                </ReplyCommentText>
              ))}
            </ReplyCommentView>
            <OpenChildCommentInputButton
              onPress={() => {
                setIsReplyOpened(!isReplyOpened);
              }}
            >
              <OpenChildCommentInputButtonText>대댓글 작성</OpenChildCommentInputButtonText>
            </OpenChildCommentInputButton>

            {isReplyOpened && (
              <ChildCommentInput>
                <TextInput
                  style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                  onChangeText={(text) => setReplyComment(text)}
                  value={replyComment}
                  onSubmitEditing={() => CreateReplyComment(comment.parent.meetingCommentId)}
                />
              </ChildCommentInput>
            )}
          </CommentView>
        ))} */}
      </CommentScrollView>
      <View>
        <CommentInput
          value={comment}
          onChangeText={setComment}
          onSubmitEditing={() => {
            CreateComment();
          }}
        ></CommentInput>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const CommentInput = styled.TextInput`
  width: 100%;
  height: 50px;
  border: 1px solid #000;
  border-radius: 10px;
  padding: 10px;
`;

const CommentScrollView = styled.ScrollView`
  width: 100%;
  height: 100px;
  border: 1px solid #000;
  border-radius: 10px;
  padding: 10px;
`;

const CommentView = styled.View`
  width: 100%;
  height: 200px;
  border: 1px solid #000;
  border-radius: 10px;
  padding: 10px;
`;

const CommentText = styled.Text`
  font-size: 20px;
`;

const ChildCommentInput = styled.View`
  width: 100%;
  height: 50px;
  border: 1px solid #000;
  border-radius: 10px;
  padding: 10px;
`;

const ReplyCommentView = styled.View`
  width: 100%;
  height: 100px;
  border: 1px solid #000;
  border-radius: 10px;
  padding: 10px;
`;

const ReplyCommentText = styled.Text`
  font-size: 20px;
`;

const OpenChildCommentInputButton = styled.TouchableOpacity`
  width: 20px;
  height: 20px;
  border: 1px solid #000;
  border-radius: 10px;
  padding: 10px;
`;

const OpenChildCommentInputButtonText = styled.Text`
  font-size: 14px;
`;

export default MeetingDetailScreen;
