// This is part is to get the chat messsages...

export default () => fetch('/users/0/chats').then(response => response.json());