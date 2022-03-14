mw.loader.addStyleTag(`
/**
 * GNU Public License
 *
 * InPageEdit default skin
 * @author 机智的小鱼君
 */
/* 编辑器 */
.in-page-edit .mw-editsection,
.in-page-edit .hide-for-ipe {
  display: none;
}

.in-page-edit {
  color: #252525;
  font-size: 16px;
}

/* @FIX For WikiEditor dialogs */
.ssi-backdrop,
.ssi-modalOuter.in-page-edit {
  z-index: 800;
}

.in-page-edit .ssi-modalWindow {
  padding: 0;
  border-radius: 0;
}

.in-page-edit .ssi-overflow {
  background-image: radial-gradient(
      farthest-side at 50% 0,
      rgba(26, 26, 26, 0.12),
      transparent
    ),
    radial-gradient(
      farthest-side at 50% 100%,
      rgba(26, 26, 26, 0.12),
      transparent
    );
  background-position: 0 0, 0 100%;
  background-repeat: no-repeat;
  background-size: 100% 9px;
  position: relative;
  z-index: 1;
  padding-top: 0;
  padding-bottom: 0;
}

.in-page-edit .ssi-overflow:before,
.in-page-edit .ssi-overflow:after {
  content: '';
  display: block;
  background-color: #fff;
  height: 30px;
  position: relative;
  z-index: -1;
  margin: 0 0 -30px;
}

.in-page-edit .ssi-overflow:after {
  margin: 0 0 -29px;
}

.ssi-center .ssi-modalContent {
  max-height: 70vh;
  overflow-y: auto;
}

.in-page-edit .ssi-topIcons {
  text-align: center;
}

.in-page-edit .ssi-topIcons .ssi-closeIcon {
  background: 0 0;
  color: #d33;
  font-size: 20px;
  margin: 0;
  padding: 8px 12px;
}

.in-page-edit .ssi-topIcons .ssi-closeIcon:hover {
  color: #f22;
}

.in-page-edit .ssi-closeIcon:before {
  content: '✕';
  display: unset !important;
}

.in-page-edit:not(.notify) .ssi-modalTitle {
  font-style: normal;
  font-family: sans-serif;
  font-weight: bold;
  background: #ffffff;
  color: #252525;
  font-size: 1.1em;
  line-height: 1.8em;
  text-align: center;
}

.ipe-editor .editTools {
  background: #eaf3ff;
  border: 1px solid #c8ccd1;
  border-bottom: none;
  float: left;
  width: calc(100% - 1px);
}

.ipe-editor .editTools .btnGroup {
  float: left;
  padding-right: 6px;
  border-right: 1px solid #c8ccd1;
  margin: 3px;
}

.ipe-editor .editTools .btnGroup .fa-stack {
  width: 1em;
  height: 1em;
  line-height: 1;
}

.ipe-editor .editTools .btnGroup.special-tools {
  border-right: none;
  border-left: 1px solid #c8ccd1;
  padding-right: 3px;
  padding-left: 6px;
}

.ipe-editor .editTools .label {
  color: #888;
  padding-right: 6px;
  cursor: default;
}

.ipe-editor .editTools .btn {
  color: #47494d;
  font-size: 14px;
  background: none;
  box-shadow: none;
  margin: 0 2px;
  padding: 2px 6px;
}

.in-page-edit.ipe-editor .toolSelect {
  display: block;
  position: relative;
  margin: 0;
}

.in-page-edit.ipe-editor .toolSelect .label {
  color: #222222;
  background-color: #ffffff;
  background-image: linear-gradient(transparent, transparent),
    url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+PHBhdGggZD0iTTEzLjAwMiA2LjAwMWwtNSA1LjAwMS01LTUuMDAxeiIgZmlsbD0iIzc5Nzk3OSIvPjwvc3ZnPg==');
  background-repeat: no-repeat;
  background-position: calc(100% - 2px);
  padding: 2px 20px 2px 4px;
  border: 1px solid #c8ccd1;
  cursor: default;
}

.in-page-edit.ipe-editor .toolSelect .ul-list {
  list-style: none;
  margin: 0;
  padding: 0;
  background: #ffffff;
  border: 1px solid #c8ccd1;
  position: absolute;
  z-index: 50;
  width: 100%;
  display: none;
}

.in-page-edit.ipe-editor .toolSelect .ul-list .editToolBtn {
  padding: 4px;
  cursor: pointer;
}

.in-page-edit.ipe-editor .toolSelect .ul-list .editToolBtn:hover {
  background-color: #eaf3ff;
}

.in-page-edit.ipe-editor .toolSelect:hover .ul-list {
  display: unset;
}

.ipe-editor .editArea {
  border: 1px solid #c8ccd1;
  border-top: none;
  border-radius: 0;
  max-width: 100%;
  min-width: 100%;
  min-height: 350px;
  margin: 0;
}

.notify .ssi-modalTitle {
  font-style: normal;
  font-family: inherit;
}

.in-page-edit .ssi-modalTitle .showEditNotice {
  font-size: small;
  display: block;
  line-height: 0;
}

.in-page-edit.ipe-editor .ssi-buttons {
  background-color: #eaecf0;
  color: #222;
  /* border: 1px solid #c8ccd1; */
  border-top: 0;
  padding: 1em 1em 0.5em 1em;
  margin-bottom: 0;
}

.in-page-edit .editSummary, .in-page-edit .newSectionTitleInput {
  width: 98%;
  margin: 4px auto 8px 0.5em;
}

.in-page-edit .editOptionsLabel {
  margin: 0 auto 16px auto;
}

.in-page-edit h4 {
  margin: 2px 0 0 0;
}

.in-page-edit .btn {
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  color: #222;
  border: 1px solid transparent;
  border-radius: 2px;
  padding: 0.25em 0.8em;
  transition: all 0.1s;
}

.in-page-edit .btn:focus {
  box-shadow: inset 0 0 0 1px #36c;
}

.in-page-edit .btn.btn-primary {
  color: #fff;
  background-color: #36c;
  border-color: #36c;
}

.in-page-edit .btn.btn-primary:hover {
  background-color: #447ff5;
  border-color: #447ff5;
}

.in-page-edit .btn.btn-primary:active {
  background-color: #2a4b8d;
}

.in-page-edit .btn.btn-secondary {
  color: #252525;
  border-color: #c8ccd1;
  background-color: #f8f9fa;
}

.in-page-edit .btn.btn-secondary:hover {
  background-color: #ffffff;
  color: #454545;
}

.in-page-edit .btn.btn-secondary:active {
  border: 1px solid #36c;
}

.in-page-edit .btn.btn-danger {
  background: transparent;
  color: #d33;
  background-color: #f4f4f4;
}

.in-page-edit .btn.btn-danger:hover {
  color: #ff4242;
  background-color: #fafafa;
}

.in-page-edit .btn.btn-danger:active {
  color: #d00;
  border: 1px solid #36c;
}

.in-page-edit .btn:disabled {
  background-color: #c8ccd1 !important;
  color: #ffffff !important;
  cursor: not-allowed;
}

.in-page-edit .btn:disabled:hover {
  background-color: #c8ccd1 !important;
  color: #ffffff !important;
}

.in-page-edit .btn:disabled .ssi-countDown {
  color: #fff;
}

.in-page-edit input {
  padding: 0.25em 0.35em;
  border: 1px solid #ccc;
  border-radius: 2px;
  transition: all 0.2s;
  line-height: 1.5em;
}

.in-page-edit input:focus {
  border-color: #36c;
  box-shadow: inset 0 0 0 1px #36c;
}

.in-page-edit .dialog .ssi-modalContent {
  padding-top: 18px;
  font-size: large;
}

.in-page-edit .dialog .ssi-buttons .btn {
  margin: 0;
  padding: 0.5em;
  background: transparent;
  color: #252525;
  border: 1px solid #efefef;
  border-radius: 0;
  width: 50%;
}

.in-page-edit .dialog .ssi-buttons .btn:hover {
  background: #f8f8f8 !important;
}

.in-page-edit .btn.btn-single {
  width: 100% !important;
}

.in-page-edit .dialog .ssi-buttons .btn.btn-danger {
  color: #c33;
}

.in-page-edit .btn.btn-primary.btn-danger {
  background: #d33;
  border-color: #d33;
  color: #ffffff;
}

.in-page-edit .btn.btn-primary.btn-danger:hover {
  background: #f33;
}

.in-page-edit .btn.btn-primary.btn-danger:focus {
  background: #c22;
  border-color: #c22;
  box-shadow: inset 0 0 0 1px #fff;
}

.in-page-edit .dialog .ssi-buttons {
  padding: 0;
}

.in-page-edit .dialog .ssi-buttons .ssi-rightButtons {
  width: 100%;
}

.in-page-edit-article-link-group:before {
  content: '[';
}

.in-page-edit-article-link-group:after {
  content: ']';
}

.mw-editsection .in-page-edit-article-link-group:before {
  content: ' | ';
}

.mw-editsection .in-page-edit-article-link-group:after {
  content: '';
}

.mw-diff-undo .in-page-edit-article-link-group {
  display: none;
}

.in-page-edit .detailArea .detailBtnGroup {
  margin-left: 1.25em;
}

/** 快速差异 **/
.quick-diff .diff-hidden-history {
  color: #a8a8a8;
  text-decoration: line-through;
}

/** 个人设置 **/
.ipe-preference .preference-tabber .tab-list {
  display: flex;
  list-style: none;
  margin: 0;
  white-space: nowrap;
  overflow-x: auto;
}

.ipe-preference .preference-tabber .tab-list li {
  flex: auto;
  padding: 0;
  margin: 0;
  display: inline-block;
  text-align: center;
  text-transform: uppercase;
}

.ipe-preference .preference-tabber .tab-list li a {
  display: block;
  padding: 4px 8px;
  color: #08d;
  text-decoration: none;
}

.ipe-preference .preference-tabber .tab-list li:hover a {
  box-shadow: 0 -2px 0 rgba(0, 136, 221, 0.25) inset;
}

.ipe-preference .preference-tabber .tab-list li a.active {
  box-shadow: 0 -2px 0 #08d inset;
}

.ipe-preference .preference-tabber .tab-content {
  height: 60vh;
  overflow-y: auto;
}

.ipe-preference .preference-tabber .tab-content section {
  display: none;
}

.ipe-preference .preference-tabber .tab-content section.active {
  display: block;
}

.ipe-preference .preference-tabber .tab-content section label {
  display: block;
}

.ipe-preference #plugin-container ul {
  margin: 0;
  list-style: none;
  border: 1px solid #ccc;
}

.ipe-preference #plugin-container li:not(:last-of-type) {
  border-bottom: 1px solid #ccc;
}

.ipe-preference #plugin-container li {
  padding: 4px 30px 4px 8px;
}

.ipe-preference #plugin-container li:hover {
  background-color: #efefef;
}

.ipe-preference #plugin-container li label {
  padding: 0;
  cursor: pointer;
}

.ipe-preference #plugin-container li label input + span {
  position: absolute;
  right: 0;
}

.ipe-preference #plugin-container li .plugin-name {
  display: block;
  font-weight: bold;
}

.ipe-preference #plugin-container li .plugin-author {
  display: block;
  font-style: italic;
  font-size: 12px;
}

/* 
.ipe-preference #analysis-container ul {
  list-style: none;
  margin: 0;
}

.ipe-preference #analysis-container li > div {
  position: relative;
  color: #ffffff;
  text-shadow: 0 0 2px #222;
  background-color: #c23531;
  height: 100%;
}

.ipe-preference #analysis-container li > div > div:first-of-type {
  padding-left: 2px;
  font-weight: bold;
}

.ipe-preference #analysis-container li > div > div:last-of-type {
  position: absolute;
  right: 0;
  top: 0;
  padding-right: 2px;
}
 */

.ipe-preference .plugin-footer {
  font-size: 12px;
  font-style: italic;
  margin-top: 1rem;
}

/** 进度条 **/
.ipe-progress {
  height: 1em;
  border: 1px solid #c5c5c5;
  border-radius: 2px;
  background: white;
  overflow: hidden;
}

.ipe-progress .ipe-progress-bar {
  height: 100%;
  width: auto;
  background: #3360c3;
  animation: progress 2s linear infinite;
  opacity: 1;
}

.ipe-progress.done {
  background: #3360c3;
  transition: all 0.8s;
}

.ipe-progress.done .ipe-progress-bar {
  animation: none;
  width: 0%;
  margin: auto 0;
  opacity: 0;
  transition: all 0.8s;
}

@keyframes progress {
  from {
    margin-left: -40%;
    margin-right: 110%;
  }

  to {
    margin-left: 110%;
    margin-right: -40%;
  }
}

/* 通知框 */
.in-page-edit.notify {
  border-radius: 0;
  font-family: unset;
}

.in-page-edit.notify .ssi-modalTitle {
  background: none;
  color: unset;
}

/** 背景颜色 **/
.ssi-backdrop {
  background: rgba(255, 255, 255, 0.5);
}

/** 修改checkbox样式 **/
.in-page-edit label input[type='checkbox'] + span,
.in-page-edit label input[type='radio'] + span {
  user-select: none;
  line-height: 1.2em;
}

.in-page-edit label input[type='checkbox'] + span::before,
.in-page-edit label input[type='radio'] + span::before {
  /* 不换行空格可以保持选择框的高度 */
  content: '\\a0';
  display: inline-block;
  width: 1.2em;
  height: 1.2em;
  margin-top: 0.15em;
  margin-right: 0.375em;
  border-radius: 2px;
  background-color: #f8f8f8;
  border: 1px solid #72777d;
  cursor: pointer;
  transition: all 0.12s;
}

.in-page-edit label input[type='radio'] + span::before {
  border-radius: 50%;
  box-sizing: border-box;
  vertical-align: text-bottom;
}

.in-page-edit label input[type='checkbox']:checked + span::before {
  content: '\\a0';
  background-color: #36c;
  background-image: url(data:image/svg+xml;base64,PHN2ZyBzdHlsZT0iZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kOyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMTYgMTYiPjxnIGlkPSJjaGVja21hcmsiPjxwYXRoIGQ9Ik0xMy43NDkyKzMuNDkwOTVMNS44NjMxMisxMS42MzM3TDIuMjUwNzcrNy45NjA4MkwxLjQ4NzYrOC43NTc3OEw1Ljg2MzEyKzEzLjE5M0wxNC41MTI0KzQuMjg3OUwxMy43NDkyKzMuNDkwOTVaIiBvcGFjaXR5PSIxIiBmaWxsPSIjZmZmZmZmIi8+PC9nPjwvc3ZnPg==);
  background-repeat: no-repeat;
}

.in-page-edit label input[type='radio']:checked + span::before {
  border-color: #36c;
  border-width: 6px;
}

.in-page-edit label input[type='checkbox']:checked + span:hover::before {
  background-color: #447ff5;
}

.in-page-edit label input[type='radio']:checked + span:hover::before {
  border-color: #447ff5;
}

.in-page-edit label input[type='checkbox']:active + span::before,
.in-page-edit label input[type='checkbox']:focus + span::before {
  box-shadow: inset 0 0px 0px 1px rgb(255, 255, 255);
  border-color: #3366cc;
}

.in-page-edit label input[type='checkbox'],
.in-page-edit label input[type='radio'] {
  position: absolute;
  clip: rect(0, 0, 0, 0);
}

.in-page-edit label input[type='checkbox']:disabled + span::before {
  border-color: #d6d6d6;
}

.in-page-edit label input[type='radio']:disabled + span::before {
  background-color: #c8ccd1;
  border-color: #c8ccd1;
}

.in-page-edit label input[type='checkbox']:disabled:checked + span::before {
  background-color: #a0a0a0;
}

.in-page-edit label input[type='radio']:disabled:checked + span::before {
  background-color: #fff;
}

/** 右下角小工具箱 **/
#ipe-edit-toolbox {
  position: fixed;
  right: 32px;
  bottom: 32px;
  user-select: none;
  z-index: 199;
}

#ipe-edit-toolbox .ipe-toolbox-btn {
  color: white;
  background: #bebebe;
  text-align: center;
  height: 35px;
  width: 35px;
  font-size: 20px;
  border: 0;
  border-radius: 50%;
  box-shadow: 0 0 5px gray;
  text-shadow: 0 0 2px #4c4c4c;
  padding: 0;
  margin: 0;
  cursor: pointer;
}

#ipe-edit-toolbox #toolbox-toggle {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 42px;
  height: 42px;
  background: #3f51b5;
  font-size: 24px;
  line-height: 1;
  margin: 0;
  transition: all 0.26s ease-in-out;
  transform: rotate(0deg);
}

#ipe-edit-toolbox #toolbox-toggle.opened {
  transform: rotate(45deg);
}

#ipe-edit-toolbox .btn-group.group1 .btn-tip-group {
  transform: translate3d(0, 100%, 0);
}

#ipe-edit-toolbox .btn-group.group2 .btn-tip-group {
  transform: translate3d(100%, 0, 0);
}

#ipe-edit-toolbox .btn-group .btn-tip-group {
  transition-timing-function: ease-in-out;
  transition-duration: 0.3s;
  opacity: 0;
}

#ipe-edit-toolbox .btn-group.opened .btn-tip-group {
  transform: translate3d(0, 0, 0);
  opacity: 1;
}

#ipe-edit-toolbox .btn-group.opened .btn-tip-group:nth-of-type(1),
#ipe-edit-toolbox .btn-group:not(.opened) .btn-tip-group:nth-of-type(3) {
  transition-delay: 0s;
}

#ipe-edit-toolbox .btn-group .btn-tip-group:nth-of-type(2) {
  transition-delay: 0.06s;
}

#ipe-edit-toolbox .btn-group:not(.opened) .btn-tip-group:nth-of-type(1),
#ipe-edit-toolbox .btn-group.opened .btn-tip-group:nth-of-type(3) {
  transition-delay: 0.108s;
}

/* 不显示时使其完全缩小到没有，以防被点到 */
#ipe-edit-toolbox .btn-group:not(.opened) {
  transform: scaleZ(0);
  transition-delay: 0.408s;
}

#ipe-edit-toolbox .btn-group.opened {
  transform: scaleZ(1);
}

#ipe-edit-toolbox .ipe-toolbox-btn#toolbox-toggle.click {
  box-shadow: 0 0 4px gray, 0 0 10px #444 inset;
}

#toolbox-toggle.click:before {
  content: '\\f023'; /*fa-lock*/
  font-family: 'FontAwesome';
  display: block;
  position: absolute;
  bottom: 50%;
  right: 0;
  font-size: 12px;
  transform: rotateZ(-45deg);
}

#ipe-edit-toolbox .ipe-toolbox-btn#edit-btn {
  background: #2196f3;
}

#ipe-edit-toolbox .ipe-toolbox-btn#redirectfrom-btn {
  background: #00bcd4;
}

#ipe-edit-toolbox .ipe-toolbox-btn#redirectto-btn {
  background: #009688;
}

#ipe-edit-toolbox .ipe-toolbox-btn#deletepage-btn {
  background: #e91e63;
}

#ipe-edit-toolbox .ipe-toolbox-btn#renamepage-btn {
  background: #ff5722;
}

#ipe-edit-toolbox .ipe-toolbox-btn#preference-btn {
  background: #ffc107;
}

#ipe-edit-toolbox .btn-group {
  position: absolute;
  float: right;
  list-style: none;
  margin: 0;
}

#ipe-edit-toolbox .btn-group.group1 {
  bottom: calc(35px + 6px);
  right: 2px;
}

#ipe-edit-toolbox .btn-group.group2 {
  bottom: 0;
  right: calc(35px + 6px);
}

#ipe-edit-toolbox .btn-group.group1 .btn-tip-group {
  margin-bottom: 6px;
}

#ipe-edit-toolbox .btn-group.group2 .btn-tip-group {
  margin-right: 6px;
}

#ipe-edit-toolbox .btn-group.opened {
  visibility: visible;
}

#ipe-edit-toolbox .btn-tip-group .btn-tip {
  position: absolute;
  text-align: center;
  font-size: 12px;
  width: 6em;
  right: -20px;
  top: -2.1em;
  background: white;
  padding: 0px 4px;
  box-shadow: 0 0 4px gray;
  pointer-events: none;
  display: none;
}

#ipe-edit-toolbox .btn-tip-group:hover .btn-tip {
  display: block;
}

#ipe-edit-toolbox .btn-tip-group .btn-tip:after {
  content: '';
  display: block;
  border: 5px solid transparent;
  border-right-color: #fff;
  border-bottom-color: #fff;
  position: absolute;
  bottom: -4px;
  left: calc(50% - 2.5px);
  transform: rotate(45deg);
}

/** 
 * Animate.css Lite
 * Only zoomIn & zoomOut
 **/
@keyframes zoomIn {
  from {
    opacity: 0;
    -webkit-transform: scale3d(0.3, 0.3, 0.3);
    transform: scale3d(0.3, 0.3, 0.3);
  }

  50% {
    opacity: 1;
  }
}

.zoomIn {
  -webkit-animation-name: zoomIn;
  animation-name: zoomIn;
}

@keyframes zoomOut {
  from {
    opacity: 1;
  }

  50% {
    opacity: 0;
    -webkit-transform: scale3d(0.3, 0.3, 0.3);
    transform: scale3d(0.3, 0.3, 0.3);
  }

  to {
    opacity: 0;
  }
}

.zoomOut {
  -webkit-animation-name: zoomOut;
  animation-name: zoomOut;
}

.animated {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

.animated.faster {
  -webkit-animation-duration: 500ms;
  animation-duration: 500ms;
}
`)