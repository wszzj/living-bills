import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import idCreator from '@/lib/idCreator';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    recordList: [],
    createdRecordError: null,
    createdTagError: null,
    tagList: [],
    currentTag: undefined,
  } as RootState,
  mutations: {
    fetchRecord(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
    },
    createRecord(state, record: RecordItem) {
      const record2: RecordItem = clone(record);
      record2.createdTime = new Date().toISOString();
      state.recordList.push(record2);
      store.commit('saveRecord');
    },
    saveRecord(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
    },
    fetchTag(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
      if (!state.tagList || state.tagList.length === 0) {
        store.commit('createTag', '衣');
        store.commit('createTag', '食');
        store.commit('createTag', '住');
        store.commit('createTag', '行');
      }
    },
    findTag(state, id: string) {
      state.currentTag = state.tagList.filter(item => item.id === id)[0];
    },
    createTag(state, name: string) {
      state.createdTagError = null;
      const names = state.tagList.map(item => item.name);
      if (names.indexOf(name) >= 0) {
        return state.createdTagError=new Error('Tag name is duplicated');
      }
      const id = idCreator().toString();
      state.tagList.push({id: id, name: name});
      store.commit('saveTag');
    },
    removeTag(state, id: string) {
      let index = -1;
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i;
          break;
        }
      }
      state.tagList.splice(index, 1);
      store.commit('saveTag');
      window.alert('删除成功')
    },
    updateTag(state, payload: { id: string, name: string }) {
      const {id, name} = payload;
      const idList = state.tagList.map(item => item.id);
      if (idList.indexOf(id) >= 0) {
        const names = state.tagList.map(item => item.name);
        if (names.indexOf(name) >= 0) {
          window.alert('标签名重复');
        } else {
          const tag = state.tagList.filter(item => item.id === id)[0];
          tag.name = name;
          store.commit('saveTag');
        }
      }
    },
    saveTag(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
    },
  },
});

export default store;
