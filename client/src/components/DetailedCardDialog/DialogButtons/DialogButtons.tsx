import { Button } from '@material-ui/core';
import useStyles from './useStyles';

type Props = {
  title: string;
};
export default function DialogButtons({ title }: Props) {
  const classes = useStyles();

  return <Button className={classes.buttonstyle}>{title}</Button>;
}
