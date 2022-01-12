import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  paper: {
    marginTop: '64px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding:  '16px',
  },
  root: {
    '& .MuiTextField-root': {
      margin: '8px',
    },
  },
  avatar: {
    margin: '8px',
    backgroundColor: 'red',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: '24px',
  },
}));
  