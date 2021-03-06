import * as types from './mutation-types'
import {saveUserInfo, deleteUserInfo} from '../common/js/cache'
import {Mode} from '../common/js/config'
import {shuffle} from "../common/js/util";
import {
  saveSearch,
  clearSearch,
  deleteSearch,
  savePlay,
  clearPlay,
  saveFavorite,
  deleteFavorite,
  clearFavorite
} from '../common/js/cache'

function findIndex(list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}

//保存用户信息
export const saveUser = function ({commit}, userInfo) {
  commit(types.SET_USER_INFO, userInfo, saveUserInfo(userInfo))
}
export const deleteUser = function ({commit}) {
  commit(types.SET_USER_INFO, {}, deleteUserInfo())
}
export const selectPlay = function ({commit, state}, {list, index}) {
  commit(types.SET_SEQUENCE_LIST, list)
  if (state.playMode === Mode.random) {
    let randomList = shuffle(list)
    commit(types.SET_PLAY_LIST, randomList)
    index = findIndex(randomList, list[index])
  } else {
    commit(types.SET_PLAY_LIST, list)
  }
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULL_SCREEN, false)
  commit(types.SET_PLAYING_STATE, true)
}
export const sequencePlay = function ({commit, state}, {list}) {
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_PLAY_LIST, list)
  commit(types.SET_PLAYING_MODE, Mode.sequence)
  commit(types.SET_CURRENT_INDEX)
  commit(types.SET_FULL_SCREEN, false)
  commit(types.SET_PLAYING_STATE, true)
}
export const insertSong = function ({commit, state}, song) {
  let playlist = state.playList.slice()
  let sequencelist = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  let currentSong = playlist[currentIndex]
  let fpIndex = findIndex(playlist, song)
  currentIndex++
  playlist.splice(currentIndex, 0, song)
  if (fpIndex > -1) {
    if (currentIndex > fpIndex) {
      playlist.splice(fpIndex, 1)
      currentIndex--
    } else {
      playlist.splice(fpIndex + 1, 1)
    }
  }
  let currentSIndex = findIndex(sequencelist, currentSong) + 1
  let fsIndex = findIndex(sequencelist, song)
  sequencelist.splice(currentSIndex, 0, song)
  if (fsIndex > -1) {
    if (currentSIndex > fsIndex) {
      sequencelist.splice(fsIndex, 1)
    } else {
      sequencelist.splice(fsIndex + 1, 1)
    }
  }
  commit(types.SET_PLAY_LIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequencelist)
  commit(types.SET_CURRENT_INDEX, currentIndex)
  commit(types.SET_FULL_SCREEN, false)
  commit(types.SET_PLAYING_STATE, true)
}

export const deleteSong = function ({commit, state}, song) {
  let playlist = state.playList.slice()
  let sequencelist = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  let pIndedx = findIndex(playlist, song)
  playlist.splice(pIndedx, 1)
  let sIndex = findIndex(sequencelist, song)
  sequencelist.splice(sIndex, 1)
  if (currentIndex > pIndedx || currentIndex === playlist.length) {
    currentIndex--
  }
  commit(types.SET_PLAY_LIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequencelist)
  commit(types.SET_CURRENT_INDEX, currentIndex)

  const playingState = playlist.length > 0
  commit(types.SET_PLAYING_STATE, playingState)
}

export const deleteSongList = function ({commit}) {
  commit(types.SET_PLAY_LIST, [])
  commit(types.SET_SEQUENCE_LIST, [])
  commit(types.SET_CURRENT_INDEX, -1)
  commit(types.SET_PLAYING_STATE, false)
}

export const saveSearchHistory = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}

export const deleteSearchHistory = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}

export const clearSearchHistory = function ({commit}) {
  commit(types.SET_SEARCH_HISTORY, clearSearch())
}
export const savePlayHistory = function ({commit}, song) {
  commit(types.SET_PLAY_HISTORY, savePlay(song))
}
export const clearPlayHistory = function ({commit}) {
  commit(types.SET_PLAY_HISTORY, clearPlay())
}
export const saveFavoriteSong = function ({commit}, song) {
  commit(types.SET_FAVOURATE_LIST, saveFavorite(song))
}
export const deleteFavoriteSong = function ({commit}, song) {
  commit(types.SET_FAVOURATE_LIST, deleteFavorite(song))
}
export const clearFavoriteList = function ({commit}) {
  commit(types.SET_FAVOURATE_LIST, clearFavorite())
}
