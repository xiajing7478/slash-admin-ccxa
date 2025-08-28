import React, { useState, useCallback, useMemo } from 'react'
import UserListItem from '@/components/bussniss/UserListItem'
import { Button, Divider } from 'antd'
interface IUser {
  id: number
  name: string
  email: string
  active: boolean
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([
    { id: 1, name: 'John Doe', email: 'john@example.com', active: true },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', active: false },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', active: true },
  ])

  const [searchTerm, setSearchTerm] = useState<string>('')
  const [count, setCount] = useState<number>(0)

  const handleToggleActive = useCallback(
    (id: number) => {
      setUsers(users.map((user: IUser) => (user.id === id ? { ...user, active: !user.active } : user)))
    },
    [users],
  )

  const handleDelete = useCallback(
    (id: number) => {
      console.log(`删除用户: ${id}`)
      setUsers(users.filter(user => user.id !== id))
    },
    [users],
  )

  const add = () => {
    console.log('add')
    setCount(count + 1)
  }

  const filteredUsers = useMemo(() => {
    return users.filter((user: IUser) => {
      return user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase()) // Filter users based on search term
    })
  }, [users, searchTerm])

  return (
    <div>
      <h2>UserList</h2>
      <input
        type="text"
        style={{ width: '100%', padding: '8px', marginBottom: '20px' }}
        placeholder="Search"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      {filteredUsers.map(user => (
        <UserListItem key={user.id} user={user} onToggleActive={handleToggleActive} onDelete={handleDelete} />
      ))}
      <Divider />
      <h1>{count}</h1>
      <Button onClick={add}>+</Button>
    </div>
  )
}

export default UserList
