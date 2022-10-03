import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Axios from 'axios';
import { HOST } from '@env';
import styled from 'styled-components/native';

function MeetingDetailScreen({ route, navigation }) {
  const { accessToken, email } = useSelector((state) => state.main);
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
  // 댓글 관련 state
  const [comment, setComment] = useState('');
  const [replyComment, setReplyComment] = useState('');
  const [isReplyOpened, setIsReplyOpened] = useState(0);

  const isFocused = useIsFocused();
  // MeetingDetail 가져오기
  useEffect(
    () => {
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
          // 만약 내가 속한 모임이면 isParticipated를 true로
          if (response.data.isMine) {
            setIsParticipated(true);
          }
          setMaxCapacity(response.data.maxCapacity);
          setMeetingId(response.data.meetingId);
          setMeetingTitle(response.data.meetingTitle);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    [
      // isFocused,
      // currentMember,
      // accessToken,
      // route.params.meetingId,
      // isParticipated,
      // isMine,
      // isReplyOpened,
      // comment,
      // replyComment,
    ],
  );
  // 모임 참가, /api/v1/meetings/{meetingId}/participants
  function participateMeeting() {
    Axios.post(
      `${HOST}/api/v1/meetings/${route.params.meetingId}/participants`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
      .then(function (response) {
        setIsParticipated(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // 댓글 조회
  const [commentList, setCommentList] = useState([]);
  useEffect(() => {
    Axios.get(`${HOST}/api/v1/meetings/${route.params.meetingId}/comments`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(function (response) {
        console.log(response.data);
        setCommentList(response.data.comments);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [
    // isFocused,
    // currentMember,
    // accessToken,
    // route.params.meetingId,
    // isParticipated,
    // isMine,
    // isReplyOpened,
    comment,
    // commentList,
    // replyComment,
  ]);

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
        navigation.navigate('MeetingDetail', { meetingId: meetingId });
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
        console.log(response.data);
        setIsReplyOpened(0);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <MeetingContainer>
      <MeetingHeader>
        <MeetingTitle>{meetingTitle}</MeetingTitle>
        {/* 이미 참여한 모임이면 버튼 보여주지 않음 */}
        <MeetingHeaderRight>
          <CurrentMemberText>
            {currentMember} / {maxCapacity}명
          </CurrentMemberText>
          <EnterButton
            onPress={() => {
              participateMeeting();
            }}
          >
            <EnterButtonText>참가하기</EnterButtonText>
          </EnterButton>
        </MeetingHeaderRight>
      </MeetingHeader>
      <MeetingInfo>
        <MeetingInfoTitle>모임 소개</MeetingInfoTitle>
        <CreatedText>
          {/* 시간 부분은 잘라내기 */}
          since {createdAt.split(' ')[0]}
        </CreatedText>
        <DescriptionText>{description}</DescriptionText>
      </MeetingInfo>
      <BookInfo>
        <BookInfoTitle>이 책을 읽어요</BookInfoTitle>
        <BookContainer>
          <BookCover
            source={{
              uri: cover,
            }}
          />
          <BookTitleText>{bookTitle}</BookTitleText>
        </BookContainer>
      </BookInfo>
      {/* 댓글 부분 */}
      <CommentMainView>
        <CommentScrollView>
          {commentList.map((comment) => (
            <CommentView key={comment.parent.content}>
              <CommentText>{comment.parent.content}</CommentText>
              <ReplyCommentText>{comment.children.content}</ReplyCommentText>
              {/* 대댓글 출력 */}
              {comment.children.map((replyComment) => (
                <ReplyCommentText key={replyComment.meetingCommentId}>
                  {replyComment.content}
                </ReplyCommentText>
              ))}
              <OpenChildCommentInputButton
                onPress={() => {
                  setIsReplyOpened(comment.parent.meetingCommentId);
                }}
              >
                <OpenChildCommentInputButtonText>대댓글 작성</OpenChildCommentInputButtonText>
              </OpenChildCommentInputButton>
              {isReplyOpened === comment.parent.meetingCommentId ? (
                <ChildCommentInput
                  style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                  onChangeText={(text) => setReplyComment(text)}
                  value={replyComment}
                  onSubmitEditing={() => CreateReplyComment(comment.parent.meetingCommentId)}
                ></ChildCommentInput>
              ) : null}
            </CommentView>
          ))}
        </CommentScrollView>
      </CommentMainView>

      <CommentInput
        value={comment}
        onChangeText={setComment}
        onSubmitEditing={() => {
          CreateComment();
        }}
      ></CommentInput>
      <FakeView></FakeView>
    </MeetingContainer>
  );
}

const MeetingContainer = styled.ScrollView`
  flex: 1;
  background-color: #fcf9f0;
  padding: 0 5%;
`;

const BookContainer = styled.View`
  flex-direction: column;
`;

const CommentInput = styled.TextInput`
  width: 100%;
  height: 50px;
  border: 1px solid #000;
  border-radius: 10px;
  padding: 10px;
  font-family: Medium;
`;

const CommentScrollView = styled.ScrollView`
  flex: 4;
  width: 100%;
  height: 100%;
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
  margin-bottom: 15px;
`;

const CommentText = styled.Text`
  font-size: 20px;
  font-family: Medium;
`;

const ChildCommentInput = styled.TextInput`
  width: 100%;
  height: 50px;
  border: 1px solid #000;
  border-radius: 10px;
  padding: 10px;
  font-family: Medium;
`;

const ReplyCommentView = styled.View`
  flex: 1;
  width: 100%;
  height: 100px;
  border: 1px solid #000;
  border-radius: 10px;
  padding: 10px;
`;

const ReplyCommentText = styled.Text`
  font-size: 20px;
  font-family: Medium;
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
  font-family: Medium;
`;

const MeetingHeader = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const MeetingHeaderRight = styled.View`
  flex: 2;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 0px;
`;

const MeetingInfo = styled.View`
  flex: 3;
  margin-top: 10px;
`;

const BookInfo = styled.View`
  flex: 2;
  flex-direction: column;
  align-items: flex-start;
  margin: 10% 0;
`;

const MeetingTitle = styled.Text`
  flex: 8;
  font-size: 24px;
  font-family: Medium;
`;

const EnterButton = styled.TouchableOpacity`
  width: 80px;
  height: 30px;
  background-color: #a8ca47;
  border: 1px solid #000;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const EnterButtonText = styled.Text`
  font-size: 14px;
  font-family: Medium;
`;

const CurrentMemberText = styled.Text`
  font-size: 14px;
  font-family: Light;
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
  width: 180px;
  height: 250px;
  margin: 20px 0;
  resize-mode: contain;
`;

const BookTitleText = styled.Text`
  font-size: 14px;
  font-family: Medium;
`;

const CreatedText = styled.Text`
  font-size: 14px;
  font-family: Medium;
  margin-top: 10px;
`;

const DescriptionText = styled.Text`
  font-size: 14px;
  font-family: Light;
  margin-top: 10px;
`;

const FakeView = styled.View`
  height: 100px;
`;

const CommentMainView = styled.View`
  flex: 1;
  background-color: white;
`;

export default MeetingDetailScreen;
