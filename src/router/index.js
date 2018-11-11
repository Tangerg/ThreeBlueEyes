import Vue from 'vue'
import Router from 'vue-router'

/*import Desktop from 'desktop/desktop'
import DIndex from 'desktop/index/index'
import Explore from 'desktop/explore/explore'
import Detail from 'desktop/detail/detail'
import Music from 'desktop/music/music'
import MusicRecommend from 'desktop/music/m-recommend/m-recommend'
import MusicList from 'desktop/music/m-music-list/m-music-list'
import MusicSinger from 'desktop/music/m-singer/m-singer'
import MusicRank from 'desktop/music/m-rank/m-rank'
import About from 'desktop/about/about'
import Login from 'desktop/login/login'
import Sign from 'desktop/sign/sign'
import Mobile from 'mobile/mobile'
import MIndex from 'mobile/index/index'*/

Vue.use(Router)
//路由懒加载
const DIndex = (resolve) => {
  import('desktop/index/index').then((module) => {
    resolve(module)
  })
}
const Explore = (resolve) => {
  import('desktop/explore/explore').then((module) => {
    resolve(module)
  })
}
const Detail = (resolve) => {
  import('desktop/detail/detail').then((module) => {
    resolve(module)
  })
}
const Music = (resolve) => {
  import('desktop/music/music').then((module) => {
    resolve(module)
  })
}
const MusicRecommend = (resolve) => {
  import('desktop/music/m-recommend/m-recommend').then((module) => {
    resolve(module)
  })
}
const MusicList = (resolve) => {
  import('desktop/music/m-music-list/m-music-list').then((module) => {
    resolve(module)
  })
}
const MusicSinger = (resolve) => {
  import('desktop/music/m-singer/m-singer').then((module) => {
    resolve(module)
  })
}
const MusicSingerDetail = (resolve) => {
  import('desktop/music/m-singer-detail/m-singer-detail').then((module) => {
    resolve(module)
  })
}
const MusicRank = (resolve) => {
  import('desktop/music/m-rank/m-rank').then((module) => {
    resolve(module)
  })
}
const MusicRankDetail = (resolve) => {
  import('desktop/music/m-rank-detail/m-rank-detail').then((module) => {
    resolve(module)
  })
}
const About = (resolve) => {
  import('desktop/about/about').then((module) => {
    resolve(module)
  })
}
const Login = (resolve) => {
  import('desktop/login/login').then((module) => {
    resolve(module)
  })
}
const Sign = (resolve) => {
  import('desktop/sign/sign').then((module) => {
    resolve(module)
  })
}
const Mobile = (resolve) => {
  import('mobile/mobile/mobile').then((module) => {
    resolve(module)
  })
}
const MIndex = (resolve) => {
  import('mobile/index/index').then((module) => {
    resolve(module)
  })
}




const router = new Router({
  mode: 'history',
  routes: [
    /*desktop start*/
    {
      path: '/d',
      redirect: '/d/index'
    },
    {
      path:'/d/index',
      component:DIndex
    },
    {
      path:'/d/explore',
      component:Explore,
      meta:{
        keepAlive:false
      }
    },
    {
      path:'/d/p/:id',
      component:Detail,
      meta:{
        keepAlive:false
      }
    },
    {
      path:'/d/music',
      component:Music,
      children:[
        {
          path: '/d/music',
          redirect: '/d/music/recommend'
        },
        {
          path:'/d/music/recommend',
          component:MusicRecommend,
          children:[
            {
              path:':id',
              component:MusicList,
            },
          ]
        },
        {
          path:'/d/music/singer',
          component:MusicSinger,
          children:[
            {
              path:':id',
              component:MusicSingerDetail,
            },
          ]
        },
        {
          path:'/d/music/rank',
          component:MusicRank,
          children:[
            {
              path:':id',
              component:MusicRankDetail,
            },
          ]
        }
      ]
    },
    {
      path:'/d/about',
      component:About,
      keepalive:false
    },
    {
      path:'/d/login',
      component:Login
    },
    {
      path:'/d/sign',
      component:Sign
    },
    /*desktop end*/

    /*mobile start*/
    {
      path: '/m',
      component: Mobile,
    },

    /*mobile end*/
  ],
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    if (savedPosition) {
      console.log(savedPosition)
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
})
export default router
