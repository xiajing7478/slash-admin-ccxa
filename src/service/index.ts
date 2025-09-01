export const getAdminMenu = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          name: 'dashboard',
          route: '/dashboard',
        },
        {
          name: 'page1',
          route: '/page1',
        },
        {
          name: 'page2',
          route: '/page2',
        },
        {
          name: 'page3',
          route: '/page3',
        },
      ])
    }, 1000)
  })
}

export const getUserMenu = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          name: 'page3',
          route: '/page3',
          filePath: '/page3/index.tsx',
          component: 'Page3',
          icon: 'DashboardOutlined',
        },
        {
          name: 'about',
          route: '/about',
          filePath: '/about/index.tsx',
          component: 'About',
          icon: 'UserOutlined',
        },
        {
          name: 'page2',
          route: '/page2',
          filePath: '/page2/index.tsx',
          component: 'Page2',
          icon: 'TableOutlined',
        },
        {
          name: 'page1',
          route: '/page1',
          filePath: '/page1/index.tsx',
          component: 'Page1',
          icon: 'HomeOutlined',
        },
        {
          name: 'dashboard',
          route: '/dashboard',
          filePath: '/dashboard/index.tsx',
          component: 'Dashboard',
          icon: 'DashboardOutlined',
        },
      ])
    }, 1000)
  })
}
