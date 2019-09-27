<template v-slot:header>
  <div class="modal">
    <div class="modal-wrapper">
      <div class="modal-window">
        <slot name="header"></slot>
        <slot name="title"></slot>
        <slot name="message"></slot>
      </div>
    </div>
  </div>
</template>

<style lang=scss scoped>
.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 30;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal-window {
  width: 600px;
  height: 250px;
  padding: 10px 20px;
  background-color: #fff;
  border-radius: 4px;
  transition: all .3s ease;
  border: solid 1px;
}
.modal-header{
  font-size: 24px;
  font-weight: bold;
}
.modal-close-button{
  position: relative;
  float: right;
  top: -30px;
}
  :hover{
    cursor: pointer;
  }

.modal-window {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
