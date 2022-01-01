import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { ERROR } from '../constants/constant';
import { CONSTANT } from '../constants/finalConstant';
import { getGraphData } from '../redux/actions/graphActions';
import { ChartPlayerEstimate, PlayerInfo } from '../redux/interfacesAndTypes';
import { RootState } from '../redux/store';
import BackDropLoader from './BackDropLoader';
import { useQuery } from './Verify';

function LineGraph() {
  const { token } = useSelector((state: RootState) => state.auth);
  const { data } = useSelector((state: RootState) => state.graph);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const query = useQuery();
  const pokerboardId = query.get(CONSTANT.pokerboardId);
  const dispatch = useDispatch();

  function graphDataCallback(success: boolean, data: any) {
    setLoading(false);
    if (success) {
      setError('');
    } else {
      if (data.id || data.estimateNotFound || data.somethingWentWrong)
        setError(data.id || data.estimateNotFound || data.somethingWentWrong);
      else setError(ERROR.somethingWentWrong);
    }
  }

  useEffect(() => {
    setLoading(true);
    dispatch(getGraphData(token, graphDataCallback, pokerboardId));
  }, []);

  const ticketIds = Object.keys(data);
  const managerEstimates = ticketIds.map(
    (ticketId) => data[ticketId].actualEstimate
  );
  let playerEstimates: ChartPlayerEstimate = {};
  let playerInfo: PlayerInfo = {};
  for (let ticketId of ticketIds) {
    for (let playerData of data[ticketId].playersEstimate) {
      if (!playerInfo[playerData.id]) {
        playerInfo[playerData.id] = {
          username: playerData.name,
          time: playerData.time,
        };
        playerEstimates[playerData.id] = [];
      }
      if (playerData.estimate) {
        playerEstimates[playerData.id].push(playerData.estimate);
      } else {
        playerEstimates[playerData.id].push(0);
      }
    }
  }
  let playerIds = Object.keys(playerInfo);

  let graphData = [];
  for (let playerId of playerIds) {
    let data = {
      id: playerId,
      mainData: {
        labels: ticketIds,
        datasets: [
          {
            label: 'Manager',
            data: managerEstimates,
            borderWidth: 2,
            borderColor: 'red',
          },
          {
            label: playerInfo[playerId].username,
            data: playerEstimates[playerId],
            borderWidth: 2,
            borderColor: 'blue',
          },
        ],
      },
    };
    graphData.push(data);
  }

  return (
    <>
      <div className="container">
        <h1>Report</h1>
        {error ? (
          <h3>{error}</h3>
        ) : (
          graphData.map((graph) => (
            <Line
              className="chart-container"
              key={graph.id}
              data={graph.mainData}
            />
          ))
        )}
      </div>
      <BackDropLoader open={loading} />
    </>
  );
}

export default LineGraph;
