const MOCK_BOARDS = [
  {
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
    ],
  },
];

export default MOCK_BOARDS;
