export interface DataTableProps {
  dataSource: Array<any>
  columns: Array<any>
  isShowPagination?: boolean
  total?: number
  onPaginationChange: (current: number, pageSize: number) => void
  rowKey?: string
  // rowSelection?: any
  // scroll?: any
  loading?: boolean
  // size?: 'default' | 'middle' | 'small'
  bordered?: boolean
  // pagination?: any
  // className?: string
  // style?: React.CSSProperties
}
