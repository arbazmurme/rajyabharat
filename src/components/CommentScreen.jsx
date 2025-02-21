import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const CommentScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    {id: '1', text: '💬 User1: This is amazing news!'},
    {id: '2', text: '💬 User2: Thanks for sharing!'},
  ]);

  const addComment = () => {
    if (comment.trim().length > 0) {
      setComments([
        ...comments,
        {id: Date.now().toString(), text: `💬 You: ${comment}`},
      ]);
      setComment('');
    }
  };

  return (
    <View>
      {/* Comment Button */}
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text>
          <FontAwesome name="commenting-o" size={20} color="gray" />{' '}
          <Text style={{color: 'gray'}}>{comments.length}</Text>
        </Text>
      </TouchableOpacity>

      {/* Full-Screen Modal */}
      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Comments</Text>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}>
              <FontAwesome name="close" size={24} color="white" />
            </TouchableOpacity>
          </View>

          {/* Comment List */}
          <FlatList
            data={comments}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <Text style={styles.comment}>{item.text}</Text>
            )}
            contentContainerStyle={styles.commentList}
          />

          {/* Input Section */}
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Write a comment..."
              value={comment}
              onChangeText={setComment}
            />
            <TouchableOpacity onPress={addComment} style={styles.sendButton}>
              <FontAwesome name="send" size={20} color="white" />
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},

  commentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
  },
  commentCount: {marginLeft: 5, color: 'gray', fontSize: 16},

  modalContainer: {flex: 1, backgroundColor: 'white'},

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007bff',
  },
  title: {fontSize: 22, fontWeight: 'bold', color: 'white'},
  closeButton: {padding: 10, backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 100},

  commentList: {padding: 20},
  comment: {
    fontSize: 16,
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
    marginBottom: 10,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 8,
  },
});

export default CommentScreen;
