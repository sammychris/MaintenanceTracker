
export default [
    {
        id: '0',
        firstname: 'samuel',
        lastname: 'christopher',
        email: 'ebusameric@gmail.com',
        password: 'ebusam12',
        usersChat: [
            {
                id: '1',
                name: 'Emeka Emmanuel',
                chat: [
                    {
                        date: '12-20-2018',
                        messages: [
                            { me: 'Hello', user: 'Hi' },
                            { me: 'how are you doing?', user: 'great!' },
                            { me: 'where are you from?', user: 'Lagos Nigeria.' },
                        ],
                    },
                ],
            },
            {
                id: '2',
                name: 'Patric Usman',
                chat: [
                    {
                        date: '12-20-2018',
                        messages: [
                            { me: 'Hello', user: 'Hi' },
                            { me: 'how are you doing?', user: 'great!' },
                            { me: 'where are you from?', user: 'Lagos Nigeria.' },
                        ],
                    },
                ],
            },
            {
                id: '3',
                name: 'Johnson Matthew',
                chat: [
                    {
                        date: '12-20-2018',
                        messages: [
                            { me: 'Hello', user: 'Hi' },
                            { me: 'how are you doing?', user: 'great!' },
                            { me: 'where are you from?', user: 'Lagos Nigeria.' },
                        ],
                    },
                ],
            },
        ],
        role: ['admin'],
    },
    {
        id: '1',
        firstname: 'Emeka',
        lastname: 'Emmanuel',
        email: 'emeka@gmail.com',
        password: 'ebusam12',
        usersChat: [],
        requestId: ['0', '1', '2', '3', '6'],
    },
    {
        id: '2',
        firstname: 'Patric',
        lastname: 'Usman',
        email: 'patric@gmail.com',
        password: 'ebusam12',
        usersChat: [],
        requestId: ['4', '5', '7'],
    },
];
