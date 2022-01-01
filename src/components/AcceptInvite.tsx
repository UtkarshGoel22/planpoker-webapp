import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CONSTANT, ROUTE } from '../constants/constant';
import { RootState } from '../redux/store';
import { inviteAccept } from '../services/accept.invite.services';
import { useQuery } from './Verify';
import BackDropLoader from './BackDropLoader';
import CustomModal from './CustomModal';

function AcceptInvite() {
  const query = useQuery();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const history = useHistory();
  let { token } = useSelector((store: RootState) => store.auth);
  const pokerboardId = query.get(CONSTANT.pokerBoardId);

  function AcceptInviteCallback(success: boolean, err: any) {
    setLoading(false);
    if (success) {
      setError('');
      setMessage(err.message);
    } else {
      setError(err ? err.invite || err.api : '');
      setMessage('');
    }
  }

  useEffect(() => {
    if (token) {
      if (pokerboardId) {
        inviteAccept(token, pokerboardId, AcceptInviteCallback);
      } else {
        history.replace(ROUTE.notFound);
      }
    } else {
      history.replace(ROUTE.signin);
    }
  }, []);

  return (
    <div className="container">
      <BackDropLoader open={loading} />
      {error && error.length > 0 ? (
        <h3>{error}</h3>
      ) : (
        <>
          <CustomModal
            open={true}
            message={message}
            buttonText={CONSTANT.gotoPokerboard}
            handleOnClick={() => {
              history.replace(`${ROUTE.pokerboardOnly}${pokerboardId}`);
            }}
          />
        </>
      )}
    </div>
  );
}

export default AcceptInvite;
