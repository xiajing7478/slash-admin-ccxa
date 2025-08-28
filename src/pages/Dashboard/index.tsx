// import { useEffect } from 'react'
// import { getUserInfo } from '@/api/login'
// import useUserInfoStore from '@/store/userInfo'
const Dashboard: React.FC = () => {
  // const { getUserInfo } = useUserInfoStore()
  // useEffect(() => {
  //   init()
  // }, [])
  // const init = async () => {
  //   getUserInfo()
  // }
  return (
    <div>
      {Array.from({ length: 100 }, (_, i) => i + 1).map(i => (
        <h1 key={i} style={{ margin: '10px 0' }}>
          <span>{i}</span>
        </h1>
      ))}
      {/* <h1>Dashboard</h1> */}
    </div>
  )
}

export default Dashboard
