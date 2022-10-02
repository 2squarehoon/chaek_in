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
  // 참가 관련 state
  const [isParticipated, setIsParticipated] = useState(false);
  // 찜하기 관련 state
  const [isFavorited, setIsFavorited] = useState(false);
  // 댓글 관련 state
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
      .then(function (response) {})
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
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <MeetingContainer>
      <MeetingHeader>
        <MeetingTitle>{meetingTitle}</MeetingTitle>
        <EnterButton>
          <EnterButtonText>참가하기</EnterButtonText>
        </EnterButton>
        <FavoriteButton>
          <FavoriteButtonText>찜하기</FavoriteButtonText>
        </FavoriteButton>
        <CurrentMemberText>
          {currentMember} / {maxCapacity}
        </CurrentMemberText>
      </MeetingHeader>
      <MeetingInfo>
        <MeetingInfoTitle>모임 소개</MeetingInfoTitle>
        <Text>{createdAt}</Text>
        <Text>{description}</Text>
      </MeetingInfo>
      <BookInfo>
        <BookInfoTitle>이 책을 읽어요</BookInfoTitle>
        <BookCover
          style={{ width: 60, height: 80 }}
          source={{
            uri: cover,
          }}
        />
        <BookTitleText>{bookTitle}</BookTitleText>
      </BookInfo>
      {/* <Text>{isMine}</Text> */}
      <CommentContainer>
        <CommentScrollView>
          {commentList.map((comment) => (
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
          ))}
        </CommentScrollView>
        <CommentInput
          value={comment}
          onChangeText={setComment}
          onSubmitEditing={() => {
            CreateComment();
          }}
        ></CommentInput>
      </CommentContainer>
    </MeetingContainer>
  );
}

const MeetingContainer = styled.View`
  flex: 1;
  background-color: #fcf9f0;
  padding: 0 5%;
`;

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

const MeetingHeader = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

const MeetingInfo = styled.View`
  flex: 3;
  margin-top: 10px;
`;

const BookInfo = styled.View`
  flex: 2;
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;

const CommentContainer = styled.View`
  flex: 4;
  margin-top: 10px;
`;

const MeetingTitle = styled.Text`
  font-size: 18px;
  font-family: Medium;
`;

const EnterButton = styled.TouchableOpacity`
  width: 80px;
  height: 30px;
  background-color: #f2f2f2;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

const EnterButtonText = styled.Text`
  font-size: 14px;
  font-family: Medium;
`;

const FavoriteButton = styled.TouchableOpacity`
  width: 80px;
  height: 30px;
  background-color: #f2f2f2;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

const FavoriteButtonText = styled.Text`
  font-size: 14px;
  font-family: Medium;
`;

const CurrentMemberText = styled.Text`
  font-size: 14px;
  font-family: Medium;
`;

const MeetingInfoTitle = styled.Text`
  font-size: 18px;
  font-family: Medium;
`;

const BookInfoTitle = styled.Text`
  font-size: 18px;
  font-family: Medium;
`;

const BookCover = styled.Image`
  width: 60px;
  height: 80px;
  margin-right: 10px;
`;

const BookTitleText = styled.Text`
  font-size: 14px;
  font-family: Medium;
`;

export default MeetingDetailScreen;
