import { Moment8SpatialRightPane } from '../moment8/Moment8SpatialRightPane';

type Moment10SpatialRightPaneProps = { dataName?: string };

/** Moment10 reuses the SOAP workspace with the same review-flow chrome as moment9; chat starts empty. */
export function Moment10SpatialRightPane({ dataName = 'Moment10SpatialRightPane' }: Moment10SpatialRightPaneProps = {}) {
  return <Moment8SpatialRightPane dataName={dataName} variant="moment10" />;
}
