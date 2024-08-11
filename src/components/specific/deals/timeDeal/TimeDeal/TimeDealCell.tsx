import TimeDealItem from './TimeDealItem';
import { GetCellData } from '@/types';

type TimeDealCellProps = {
  columnIndex: number;
  rowIndex: number;
  data: GetCellData;
};

const TimeDealCell = ({ columnIndex, rowIndex, data }: TimeDealCellProps) => {
  const cellData = data(columnIndex, rowIndex);

  if (!cellData) return null;
  if (cellData.isLoading) return <div style={cellData.style}>Loading...</div>;

  return <TimeDealItem item={cellData.item} isOpen={cellData.isOpen} />;
};

export default TimeDealCell;
