interface mocks {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [id: string]: any;
}

const MOCK_BOARDS: mocks = {
  board1: {
    _id: '1',
    title: 'Board 1',
    columns: [
      {
        title: 'Column 1',
        cards: [
          {
            title: 'A title',
            description: 'A description',
            cardDetails: {
              tags: [],
              color: '#FF69B4',
              deadline: new Date(),
              attachment: '',
            },
          },
          {
            title: 'Another title',
            description: 'Another description',
            cardDetails: {
              tags: [],
              color: '#FF69B4',
              deadline: new Date(),
              attachment: '',
            },
          },
        ],
      },
    ],
  },
  board2: {
    _id: '2',
    title: 'Board 2',
    columns: [
      {
        title: 'Column 2',
        cards: [
          {
            title: 'Yet another title',
            description: 'Yet another description',
            cardDetails: {
              tags: [],
              color: '#FF69B4',
              deadline: new Date(),
              attachment: '',
            },
          },
          {
            title: 'Anotha title',
            description: 'Anotha description',
            cardDetails: {
              tags: [],
              color: '#FF69B4',
              deadline: new Date(),
              attachment: '',
            },
          },
        ],
      },
      {
        title: 'Column 4',
        cards: [
          {
            title: 'Yet another title',
            description: 'Yet another description',
            cardDetails: {
              tags: [],
              color: '#FF69B4',
              deadline: new Date(),
              attachment: '',
            },
          },
          {
            title: 'Anotha title',
            description: 'Anotha description',
            cardDetails: {
              tags: [],
              color: '#FF69B4',
              deadline: new Date(),
              attachment: '',
            },
          },
        ],
      },
    ],
  },
};

export default MOCK_BOARDS;
