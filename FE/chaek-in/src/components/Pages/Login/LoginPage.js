import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import styled from 'styled-components/native';

const LoginPage = () => {
  return (
    <View style={styles.inputContainer}>
      <StyledTextInput placeholder='Add an item!' placeholderTextColor={'#999'} autoCorrect={false} />
      <View style={styles.button}>
        <Button title={'zzz'} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: 20,
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    fontSize: 24,
    marginLeft: 20,
  },
  button: {
    marginRight: 10,
  },
});

const StyledTextInput = styled.TextInput`
  padding: 20px;
  border-bottom-color: #bbb;
  border-bottom-width: 1px;
  font-size: 24px;
  margin-left: 20px;
  color: palevioletred;
`;

export default LoginPage;
