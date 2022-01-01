import { graphData } from '../../services/graph.services';

export function getGraphData(
  token: string | null | undefined,
  graphDataCallback: Function,
  pokerboardId?: string | null
) {
  return async (dispatch: any) => {
    graphData(dispatch, token, graphDataCallback, pokerboardId);
  };
}
