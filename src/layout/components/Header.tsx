import { Row, Col, Typography, Button } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import RightContent from './RightContent'
const { Text } = Typography

interface HeaderProps {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}

const HeaderComp: React.FC<HeaderProps> = ({ collapsed, setCollapsed }) => {
  return (
    <Row justify="space-between" align={'middle'}>
      <Col>
        <Text strong style={{ fontSize: '20px' }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          React Admin
        </Text>
      </Col>
      <Col style={{ display: 'flex' }}>
        <RightContent />
      </Col>
    </Row>
  )
}

export default HeaderComp
