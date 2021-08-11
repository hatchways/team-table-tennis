import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  column: {
    backgroundColor: '#F4F6FF',
    minWidth: 400,
    marginLeft: 10,
    marginRight: 10,
  },
  columnTitle: {
    fontWeight: 'bolder',
  },
  task: {
    marginTop: 10,
    marginBottom: 10,
    minHeight: 100,
  },
  taskNew: {
    border: '3px solid',
    borderColor: '#80A3FB',
  },
  taskDragging: {
    transform: 'rotate(-2Deg)',
    boxShadow: '2px 2px 2px 2px rgba(128, 163, 251, 0.3)',
  },
  selectTag: {
    fontWeight: 800,
  },
  newColumnModal: {
    minWidth: '300px',
    minHeight: '300px',
  },
  newColumnModalBox: {
    minWidth: '300px',
  },
  deleteIcon: {
    color: 'white',

    '&:hover': {
      color: 'black',
    },
  },
});

export default useStyles;
