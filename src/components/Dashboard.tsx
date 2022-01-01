import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import { PokerboardData } from '../utils/utils.pokerboard';
import PokerboardInfo from './PokerboardInfo';
import { dashboardStyles } from '../styles/style';
import { RootState } from '../redux/store';
import { pokerboardList } from '../redux/actions/pokerboardActions';
import BackDropLoader from './BackDropLoader';

function Dashboard() {
  const [list, setList] = useState<PokerboardData[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { userId, token } = useSelector((state: RootState) => state.auth);
  const classes = dashboardStyles();

  function dashboardCallback(success: boolean, result: any) {
    setLoading(false);
    if (success) {
      setError('');
      setList(result.data);
    } else {
      setError(result.message);
    }
  }

  useEffect(() => {
    dispatch(pokerboardList(dashboardCallback, userId, token));
  }, []);

  return (
    <div className={classes.root}>
      {error ? (
        <div className="container">
          <h3>{error}</h3>
        </div>
      ) : (
        ''
      )}
      <BackDropLoader open={loading} />
      <Card>
        <CardHeader title="Saved Pokerboards" style={{ textAlign: 'center' }} />
        <CardContent>
          {list.map((item) => {
            return <PokerboardInfo key={item.id} data={item} />;
          })}
        </CardContent>
      </Card>
    </div>
  );
}

export default Dashboard;
