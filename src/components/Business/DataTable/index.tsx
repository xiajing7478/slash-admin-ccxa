import { Table } from 'antd'
import { type DataTableProps } from './type'

const DataTable: React.FC<DataTableProps> = ({
  columns,
  dataSource,
  isShowPagination = true,
  total,
  onPaginationChange,
  loading,
  bordered = true,
  rowKey,
}) => {
  const onChangePage = (current: number, pageSize: number) => {
    onPaginationChange(current, pageSize)
  }
  return (
    <Table
      rowKey={rowKey}
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      bordered={bordered}
      scroll={{
        x: 'max-content',
      }}
      pagination={
        isShowPagination
          ? {
              defaultCurrent: 1,
              total,
              showTotal: total => `Total ${total} items`,
              showQuickJumper: true,
              onChange: onChangePage,
            }
          : false
      }
    />
  )
}

export default DataTable
