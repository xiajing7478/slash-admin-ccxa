import React, { memo } from 'react'
interface IUser {
  id: number
  name: string
  email: string
  active: boolean
}

interface IUserListItemProps {
  user: IUser
  onToggleActive: (id: number) => void
  onDelete: (id: number) => void
}

const UserListItem: React.FC<IUserListItemProps> = ({ user, onToggleActive, onDelete }) => {
  console.log(`child UserListItem rendered: ${user.name}`)
  return (
    <div>
      <h3>{user.name}</h3>
      <p>Email: {user.email}</p>
      <p>Status: {user.active ? 'Active' : 'Inactive'}</p>
      <button onClick={() => onToggleActive(user.id)}>{user.active ? 'Deactivate' : 'Activate'}</button>
      <button onClick={() => onDelete(user.id)} style={{ marginLeft: '10px' }}>
        Delete
      </button>
    </div>
  )
}

// 使用memo优化用户列表项组件
export default memo(UserListItem)
// export default UserListItem
