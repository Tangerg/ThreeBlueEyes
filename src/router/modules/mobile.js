const MIndex = r => require.ensure([], () => r(require('mobile/index/index')), 'mIndex')
const MDetail = r => require.ensure([], () => r(require('mobile/detail/detail')), 'mDetail')
const MMusic = r => require.ensure([], () => r(require('mobile/music/music')), 'mMusic')
const MMV = r => require.ensure([], () => r(require('mobile/music/mv/mv')), 'mMv')
const MSearch = r => require.ensure([], () => r(require('mobile/music/search/search')), 'mSearch')
const MInfo = r => require.ensure([], () => r(require('mobile/music/info/info')), 'mInfo')
const MHome = r => require.ensure([], () => r(require('mobile/music/home/home')), 'mHome')
const MRecommend = r => require.ensure([], () => r(require('mobile/music/recommend/recommend')), 'mRecommend')
const MSinger = r => require.ensure([], () => r(require('mobile/music/singer/singer')), 'mSinger')
const MRank = r => require.ensure([], () => r(require('mobile/music/rank/rank')), 'mRank')
const MRankDetail = r => require.ensure([], () => r(require('mobile/music/rank-detail/rank-detail')), 'mRankDetail')
const MMusicList = r => require.ensure([], () => r(require('mobile/music/music-list/music-list')), 'mMusicList')
const MSingerList = r => require.ensure([], () => r(require('mobile/music/singer-list/singer-list')), 'mSingerList')
const MSingerDetail = r => require.ensure([], () => r(require('mobile/music/singer-detail/singer-detail')), 'mSingerDetail')
const MPlayHistory = r => require.ensure([], () => r(require('mobile/music/play-history/play-history')), 'mPlayHistory')
const MFavourate = r => require.ensure([], () => r(require('mobile/music/favourate/favourate')), 'mFavourate')
const MPersonal = r => require.ensure([], () => r(require('mobile/personal/personal')), 'mPersonal')
const MAbout = r => require.ensure([], () => r(require('mobile/about/about')), 'mAbout')
const MLogin = r => require.ensure([], () => r(require('mobile/login-sign/login-sign')), 'mLogin')

export default [
  {
    path: '/m',
    redirect: '/m/index'
  },
  {
    path: '/m/index',
    name: 'mIndex',
    component: MIndex
  },
  {
    path: '/m/p/:id',
    name: 'mDetail',
    component: MDetail
  },
  {
    path: '/m/music',
    name: 'mMusic',
    component: MMusic,
    children: [
      {
        path: '/m/music',
        redirect: '/m/music/home/'
      },
      {
        path: '/m/music/mv',
        component: MMV
      },
      {
        path: '/m/music/info',
        component: MInfo,
        children: [
          {
            path: '/m/music/info/history',
            component: MPlayHistory
          },
          {
            path: '/m/music/info/favourate',
            component: MFavourate
          }
        ]
      },
      {
        path: '/m/music/home',
        component: MHome,
        children: [
          {
            path: '/m/music/home',
            redirect: '/m/music/home/recommend',
          },
          {
            path: '/m/music/home/recommend',
            component: MRecommend,
            children: [
              {
                path: '/m/music/home/recommend/:id',
                component: MMusicList
              }
            ]
          },
          {
            path: '/m/music/home/singer',
            component: MSinger,
            children: [
              {
                path: '/m/music/home/singer/list',
                component: MSingerList,
              },
              {
                path: ':id',
                component: MSingerDetail,
              },
            ]
          },
          {
            path: '/m/music/home/rank',
            component: MRank,
            children: [{
              path: '/m/music/home/rank/:id',
              component: MRankDetail
            }]
          }
        ]
      },
      {
        path: '/m/music/search',
        component: MSearch,
        children: [
          {
            path: 'singer/:id',
            component: MSingerDetail
          },
          {
            path: 'list/:id',
            component: MMusicList
          }
        ]
      }
    ]
  },
  {
    path: '/m/personal',
    name: 'mPersonal',
    component: MPersonal
  },
  {
    path: '/m/about',
    name: 'mAbout',
    component: MAbout
  },
  {
    path: '/m/login',
    name: 'mLogin',
    component: MLogin
  }
]
