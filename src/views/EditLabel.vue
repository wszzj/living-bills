<template>
  <Layout class-prefix="editLabels">
    <div class="navBar">
      <Icon class="leftIcon" name="left" @click="goBack"></Icon>
      <span class="title">编辑标签</span>
      <span class="rightIcon"></span>
    </div>
    <div class="form-wrapper">
      <FormItem :value="currentTag.name"
                @update:value="onUpdateInput"
                field-name="标签名"
                placeholder="请输入标签名"></FormItem>
    </div>
    <div class="button-wrapper">
      <Button @click="remove">删除标签</Button>
    </div>

  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import FormItem from '@/components/money/FormItem.vue';
import Button from '@/components/money/Button.vue';

@Component({
  components: {Button, FormItem},

})
export default class EditLabel extends Vue {
  get currentTag() {
    return this.$store.state.currentTag;
  }

  created() {
    this.$store.commit('fetchTag')
    this.$store.commit('findTag',this.$route.params.id)
    if (!this.currentTag) {
      this.$router.replace('/404');
    }
  }

  onUpdateInput(name: string) {
    if (this.currentTag) {
      this.$store.commit('updateTag',{id:this.currentTag.id,name});
    }
  }

  remove(id: string) {
    if (this.currentTag) {
      this.$store.commit('removeTag',this.currentTag.id);
      this.$router.back();
    }
  }

  goBack() {
    this.$router.back();
  }
}
</script>

<style lang="scss" scoped>
.navBar {
  background: white;
  font-size: 16px;
  padding: 12px 16px;
  display: flex;
  align-content: center;
  justify-content: space-between;

  > .leftIcon {

    width: 24px;
    height: 24px;
  }

  > .title {

  }

  > .rightIcon {
    width: 24px;
    height: 24px;

  }
}

.form-wrapper {
  background: white;
  margin-top: 8px;

}

.button-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 44-16px;
}

</style>