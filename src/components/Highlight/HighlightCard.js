import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import {makeStyles} from '@material-ui/core';
import CountUp from 'react-countup';

const useStyles = makeStyles({
  wrapper: (props) => {
    if (props.type === 'confirmed') {
      return { borderLeft: '5px solid #c9302c' };
    } else if (props.type === 'recovered') {
      return { borderLeft: '5px solid #28a745' };
    } else {
      return { borderLeft: '5px solid gray' };
    }
  },
  title: { fontSize: 18, marginBottom: 5 },
  count: { fontWeight: 'bold', fontSize: 18 },
});

export default function HighlightCard({ title, count, type }) {
  const classes = useStyles({ type });
  return (
    <Card className={classes.wrapper}>
        <CardContent>
          <Typography variant='body2' component='p' className={classes.title}>
            {title}
          </Typography>
          <Typography variant='body2' component='span' className={classes.count}>
            <CountUp end={count} separator=' ' duration={2} />
          </Typography>
        </CardContent>
    </Card>
  );
}
