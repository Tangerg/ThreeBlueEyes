const DIndex = r => require.ensure([], () => r(require('desktop/index/index')), 'dIndex')
const Explore = r => require.ensure([], () => r(require('desktop/explore/explore')), 'dExplore')
const Detail = r => require.ensure([], () => r(require('desktop/detail/detail')), 'dDetail')
const Music = r => require.ensure([], () => r(require('desktop/music/music')), 'dMusic')
const MusicRecommend = r => require.ensure([], () => r(require('desktop/music/m-recommend/m-recommend')), 'dMusicRecommend')
const MusicList = r => require.ensure([], () => r(require('desktop/music/m-music-list/m-music-list')), 'dMusicList')
const MusicSinger = r => require.ensure([], () => r(require('desktop/music/m-singer/m-singer')), 'dMusicSinger')
const MusicSingerDetail = r => require.ensure([], () => r(require('desktop/music/m-singer-detail/m-singer-detail')), 'dMusicSingerDetail')
const MusicRank = r => require.ensure([], () => r(require('desktop/music/m-rank/m-rank')), 'dMusicRank')
const MusicRankDetail = r => require.ensure([], () => r(require('desktop/music/m-rank-detail/m-rank-detail')), 'dMusicRankDetail')
const Personal = r => require.ensure([], () => r(require('desktop/personal/personal')), 'dAbout')
const About = r => require.ensure([], () => r(require('desktop/about/about')), 'dAbout')
const Login = r => require.ensure([], () => r(require('desktop/login/login')), 'dLogin')
const Sign = r => require.ensure([], () => r(require('desktop/sign/sign')), 'dSign')

export default [
  {
    path: '/d',
    redirect: '/d/index'
  },
  {
    path: '/d/index',
    name: 'dIndex',
    component: DIndex
  },
  {
    path: '/d/explore',
    name: 'dExplore',
    component: Explore,
  },
  {
    path: '/d/p/:id',
    name: 'dDetail',
    component: Detail,
  },
  {
    path: '/d/music',
    name: 'dMusic',
    component: Music,
    redirect: '/d/music/recommend',
    children: [
      {
        path: '/d/music/recommend',
        name: 'dMusicRecommend',
        component: MusicRecommend,
      },
      {
        path: '/d/music/recommend/:id',
        name: 'dMusicList',
        component: MusicList,
      },
      {
        path: '/d/music/singer',
        name: 'dMusicSinger',
        component: MusicSinger,
      },
      {
        path: '/d/music/singer/:id',
        name: 'dMusicSingerDetail',
        component: MusicSingerDetail,
      },
      {
        path: '/d/music/rank',
        name: 'dMusicRank',
        component: MusicRank,
      },
      {
        path: '/d/music/rank/:id',
        name: 'dMusicRankDetail',
        component: MusicRankDetail,
      },
    ]
  },
  {
    path: '/d/about',
    name: 'dAbout',
    component: About,
  },
  {
    path: '/d/personal',
    name: 'dPersonal',
    component: Personal,
  },
  {
    path: '/d/login',
    name: 'dLogin',
    component: Login
  },
  {
    path: '/d/sign',
    name: 'dSign',
    component: Sign
  },
]
