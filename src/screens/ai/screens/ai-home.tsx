import {View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {Icon, MD3Colors, Text} from 'react-native-paper';
import {wp} from '../../../utils/helper/dimensions';
import {getMessages} from '../apis';
import ai_constants from '../apis/ai_constants';
import axios from 'axios';

type Props = {};

const AiHome = (props: Props) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [server, setServer] = useState(false);
  const [istyp, setIstyp] = useState(false);
  const onSend = useCallback(
    async (messages = []) => {
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, messages),
      );
      if (text != '') {
        setIstyp(true);
        await axios
          .post(ai_constants.AI_LOCAL_URL + 'api/chat', {
            model: ai_constants.AI_LOCAL_MODEL,
            messages: [
              {
                role: 'user',
                content: text,
              },
            ],
            stream: false,
          })
          .then(res => {
            let msg: never[] = [
              {
                _id: Date.now(),
                text: res?.data?.message?.content,
                createdAt: new Date(),
                user: {
                  name: 'SubrataX',
                  _id: 'ai',
                  avatar: require('../../../assets/icons/ai.png'),
                },
              } as never,
            ];
            setMessages(previousMessages =>
              GiftedChat.append(previousMessages, msg),
            );
            setIstyp(false);
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    [text],
  );

  useEffect(() => {
    setMessages(getMessages('') as never);
    axios.get(ai_constants.AI_LOCAL_URL).then(res => {
      if (res.status == 200) {
        setServer(true);
        console.log(res.data);
      }
    });
  }, []);
  return (
    <View
      style={{
        flex: 1,
      }}>
      {server ? (
        <GiftedChat
          messages={messages}
          showAvatarForEveryMessage={true}
          onSend={messages => onSend(messages as any)}
          showUserAvatar
          text={text}
          onInputTextChanged={text => setText(text)}
          user={{
            _id: 1,
            name: 'AI',
            avatar: () => {
              return (
                <View
                  style={{
                    height: wp(10),
                    width: wp(10),
                    borderRadius: wp(100),
                    backgroundColor: MD3Colors.primary90,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Icon
                    color={MD3Colors.error0}
                    source={'account-outline'}
                    size={30}
                  />
                </View>
              );
            },
          }}
          isTyping={istyp}
        />
      ) : (
        <View>
          <Text>Server is not running.</Text>
        </View>
      )}
    </View>
  );
};

export default AiHome;
