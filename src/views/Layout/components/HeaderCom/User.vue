<template>
  <div class="user-wrapper">
    <div class="nick">
      <span>yunye</span>
    </div>
    <div class="more">
      <div>登出</div>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
.user-wrapper {
  position: relative;
  width: 150px;
  height: 70px;
  color: #17b3ff;
  font-size: 1.6rem;
  text-align: center;
  .nick {
    height: 100%;
    line-height: 70px;
    cursor: pointer;
    span {
      position: relative;
      &::before {
        position: absolute;
        content: " ";
        left: -16px;
        top: 50%;
        transform: translateY(-50%);
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: #17b3ff;
      }
    }
  }
  .more {
    background-color: #1c2139;
    position: absolute;
    display: none;
    top: 70px;
    left: 150px;
    width: 100%;
    height: 50px;
    line-height: 50px;
    transition: .5s;
    border-radius:8px 0px 0px 8px;
    color: #DB7889;
    z-index: 9999;
  }
  &:hover .more{
    display: block;
    left: 0;
  }
}
</style>
