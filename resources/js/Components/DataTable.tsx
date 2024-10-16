import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

type DataTableProps<T> = {
  columns: ColumnsType<T>;
  dataSource: T[];
  loading?: boolean;
  pagination?: object;
  rowKey?: string;
};

const DataTable = <T extends object>({
  columns,
  dataSource,
  loading = false,
  pagination = { pageSize: 10 },
  rowKey = 'id',
}: DataTableProps<T>) => {
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      pagination={pagination}
      rowKey={rowKey}
      bordered
    />
  );
};

export default DataTable;
