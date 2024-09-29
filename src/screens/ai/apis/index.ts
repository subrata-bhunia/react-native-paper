export const getMessages = (prompt: string) => {
  return [
    {
      _id: 2,
      text: `Your intelligent and intuitive AI assistant, crafted with care and expertise by Subrata Bhunia. SubrataX is designed to offer personalized support, insightful conversations, and innovative solutions right at your fingertips. Whether you're looking for a knowledgeable companion to assist with your queries or a creative mind to help brainstorm ideas, SubrataX is here to elevate your experience. Powered by advanced technology and shaped by a deep understanding of user needs, SubrataX is more than just a chatbot—it's your go-to partner in navigating the digital world with ease and confidence.`,
      createdAt: new Date(),
      user: {
        name: 'SubrataX',
        _id: 'ai',
        avatar: require('../../../assets/icons/ai.png'),
      },
    },
    {
      _id: 1,
      text: `Welcome to SubrataX!`,
      createdAt: new Date(),
      user: {
        name: 'SubrataX',
        _id: 'ai',
        avatar: require('../../../assets/icons/ai.png'),
      },
    },
  ];
};
type Method = 'GET' | 'POST';
export const apiCall = async (method: Method, path: string, body?: any) => {
  let bodyContent = JSON.stringify(body);
  let response = await fetch('http://localhost:11434/' + path, {
    method: method,
    body: bodyContent,
  });
  return response;
};
