<template>
  <div class="body_container">
    <div class="header_container">
      <div class="header">
        <el-row>
          <el-col :span="3">
            <span class="header_title">预审完成</span>
          </el-col>
          <el-col :span="4">
            <el-checkbox-group v-model="auditStatusList" class="mt-30">
              <el-checkbox class="header_checkbox" checked label="已通过"></el-checkbox>
              <el-checkbox class="header_checkbox" checked label="未通过"></el-checkbox>
            </el-checkbox-group>
          </el-col>
          <el-col :span="17">
            <el-button type="primary" class="fr mr-10 mt-20">通过</el-button>
            <el-button class="fr mr-10 mt-20">退回</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="card">
      <div class="card_header">
        <el-row>
          <el-col :span="12">
            <div class="smallBatch_title mt-10 f_18">
              <span class="f_14">1</span>/<span class="f_14">100</span>
              <span>王小二</span>与<span>张三封</span>的借款合同纠纷
              <span class="ico_group">
                            <i class="ico_idcard right"></i>
                            <i class="ico_edit wrong"></i>
                            <i class="ico_computer wrong"></i>
                          </span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="fr mt-5">
              <el-button>审核意见</el-button>
            </div>
          </el-col>
        </el-row>

      </div>

      <div class="card_body">
        <div class="part_tit f_18">身份证信息</div>
        <div class="img zhen">
          <pic-zoom url="static/idcard-0.png" :scale="3"></pic-zoom>
        </div>
        <div class="img fan">
          <pic-zoom url="static/idcard-1.png" :scale="3"></pic-zoom>
        </div>
        <div class="img_desc">
          <ul>
            <li><i class="i_nopass"></i>万焕昌</li>
            <li><i class="i_pass"></i>男</li>
            <li><i class="i_pass"></i>汗</li>
            <li><i class="i_pass"></i>阿谁都不会覅斌</li>
            <li><i class="i_pass"></i>12315641561561</li>
            <li><i class="i_pass"></i>(有效期)</li>
          </ul>
        </div>
        <div class="audit">
          <p class="audit_title">审核意见:</p>
          <ul>
            <li>1.被申请人姓名与身份证不一致 </li>
            <li>2.被申请人身份证有效期已过期或即将过期</li>
          </ul>
        </div>
      </div>

      <div class="sign_body sTopborder">
        <div class="part_tit f_18">签名信息</div>
        <div class="of-hidden">
          <div class="mockTable fl">
            <div class="cellTr">
              <div class="cell">签名时间</div>
              <div class="cell">2018-02-05 15:00:14</div>
              <div class="cell">签名实体</div>
              <div class="cell">2018-02-05 15:00:14</div>
            </div>
            <div class="cellTr">
              <div class="cell">签名时间</div>
              <div class="cell">2018-02-05 15:00:14</div>
              <div class="cell">签名实体</div>
              <div class="cell">2018-02-05 15:00:14</div>
            </div>
            <div class="cellTr">
              <div class="cell">签名时间</div>
              <div class="cell">2018-02-05 15:00:14</div>
              <div class="cell">签名实体</div>
              <div class="cell">2018-02-05 15:00:14</div>
            </div>
            <div class="cellTr">
              <div class="cell">借款开始时间</div>
              <div class="cell">2018-02-05 15:00:14</div>
              <div class="cell">借款合同</div>
              <div class="cell"><span class="btn_link">点击查看</span></div>
            </div>
          </div>
          <div class="sign_info fl">
            <ul>
              <li><i class="i_nopass"></i>万焕昌</li>
              <li><i class="i_pass"></i>男</li>
              <li><i class="i_pass"></i>汗</li>
            </ul>
          </div>
        </div>
        <div class="audit">
          <p class="audit_title">审核意见:</p>
          <ul>
            <li>1.被申请人姓名与身份证不一致 </li>
            <li>2.被申请人身份证有效期已过期或即将过期</li>
          </ul>
        </div>
      </div>

      <div class="applybook_body">
        <div class="applybook_title of-hidden">
          <div class="tit fl">仲裁申请书</div>
          <div class="scroll_toolbar fr">
            <scroll-y @handleClick="scrollbarClick" :options="scrollList" :defaultWidth="420"></scroll-y>
          </div>
        </div>
        <div class="applybook_content of-hidden">
          <div class="article_left fl">
            <img src="./../../../assets/img/pdf-0.png" alt="">
          </div>
          <div class="article_right fr">
            <img src="./../../../assets/img/pdf-1.png" alt="">
          </div>
        </div>
      </div>


    </div>

    <!-- 左右分页 tool -->
    <div class="fix_screen">
      <span class="arrow_left"></span><span class="arrow_right"></span>
    </div>
    <!-- ** -->
  </div>
</template>

<script>
import PicZoom from "vue-piczoom";
import scrollY from "@/components/scroll-y";
export default {
  data() {
    return {
      auditStatusList: ["1", "2"],
      scrollList:[
        {
          name:'借款协议'
        },
        {
          name:'借款咨询服务协议'
        },
        {
          name:'收款证明单'
        },
        {
          name:'打款凭证'
        },
        {
          name:'债权转让协议'
        },
        {
          name:'债转通知'
        },
      ]
    };
  },
  methods: {
    scrollbarClick(){

    }
  },
  components: {
    PicZoom,
    scrollY
  }
};
</script>

<style lang="scss" scoped>
$themeColor: #193b8c;
.body_container {
  background: #f7f7f7;
  // height: 100%;
  .header_container {
    height: 76px;
    background: #fff;
    .header {
      width: 1200px;
      margin: 0 auto;
      height: 76px;
      .header_title {
        font-size: 28px;
        color: #193b8c;
        line-height: 76px;
        font-weight: 500;
      }
      .header_checkbox {
        margin-left: 20px;
      }
    }
  }
  .card {
    width: 1200px;
    border: 1px solid #e5eaee;
    background: #fff;
    margin: 16px auto;
    .card_header {
      height: 49px;
      border-bottom: 1px solid #e5eaee;
      background: #eef3ff;
      padding-left: 12px;
      padding-right: 10px;
    }
    .card_body {
      padding: 30px 0 30px 22px;
      .img {
        float: left;
        width: 370px;
        height: 225px;
        border: 1px solid #e5eaee;
        border-radius: 10px;
        overflow: hidden;
        &.zhen {
          margin-right: 17px;
        }
        &.fan {
          margin-right: 28px;
        }
      }
      .img_desc {
        ul {
          li {
            line-height: 38px;
            font-size: 14px;
            color: #363636;
          }
        }
      }
    }
    .audit {
      margin-top: 28px;
      .audit_title {
        font-size: 17px;
        color: #193b8c;
        margin-bottom: 10px;
      }
      ul {
        padding-left: 15px;
        li {
          font-size: 14px;
          line-height: 24px;
          color: #444;
        }
      }
    }
  }
  .smallBatch_title {
    color: $themeColor;
  }
}

// fonts size style
.f_14 {
  font-size: 14px !important;
}

.f_18 {
  font-size: 18px !important;
}

// small ico style
.ico_group {
  position: relative;
  top: 4px;
  padding-left: 20px;
  i {
    margin-right: 10px;
  }
}

%_circle_border {
  border-radius: 50%;
}

.ico_idcard {
  display: inline-block;
  width: 26px;
  height: 18px;
  background: url(./../../../assets/img/ic20_001.png) no-repeat 100%;
}

.ico_edit {
  display: inline-block;
  width: 30px;
  height: 23px;
  background: url(./../../../assets/img/ic20_002.png) no-repeat 100%;
}

.ico_computer {
  display: inline-block;
  width: 24px;
  height: 19px;
  background: url(./../../../assets/img/ic20_003.png) no-repeat 100%;
}

// right or wrong
%fix_rw_ico {
  @extend %_circle_border;
  position: absolute;
  content: "";
  display: block;
  right: -5px;
  bottom: -5px;
  width: 15px;
  height: 15px;
  background-size: 100%;
  background-repeat: no-repeat;
  background-color: #fff;
}

.right {
  position: relative;
  &:after {
    @extend %fix_rw_ico;
    background-image: url(./../../../assets/img/ic20_009.png);
  }
}

.wrong {
  position: relative;
  &:after {
    @extend %fix_rw_ico;
    background-image: url(./../../../assets/img/ic20_008.png);
  }
}

.i_pass {
  display: inline-block;
  width: 14px;
  height: 10px;
  background-image: url(./../../../assets/img/ic20_006.png);
  background-repeat: no-repeat;
  background-position: 100%;
  margin-right: 5px;
}

.i_nopass {
  display: inline-block;
  width: 14px;
  height: 14px;
  background-image: url(./../../../assets/img/ic20_007.png);
  background-repeat: no-repeat;
  background-position: 0 center;
  margin-right: 5px;
}

.part_tit {
  color: $themeColor;
  padding-bottom: 20px;
  &:before {
    content: "|";
    display: inline-block;
    font-weight: bold;
    font-size: 16px;
    vertical-align: baseline;
    margin-right: 5px;
    position: relative;
    top: -2px;
  }
}

// 左右分页ui
.fix_screen {
  > span {
    display: inline-block;
    width: 89px;
    height: 89px;
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: 100% 100%;
    position: fixed;
    top: 20%;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
  .arrow_left {
    left: 16%;
    background-image: url(./../../../assets/img/rct_page01.png);
  }
  .arrow_right {
    right: 16%;
    background-image: url(./../../../assets/img/rct_page02.png);
  }
}

// 内容主体面板固定内padding
%_themainPadding {
  padding: 30px 0 30px 22px;
}

// 上边框
.sTopborder {
  border-top: 1px solid #e5eaee;
}

// 签名信息
.sign_body {
  @extend %_themainPadding;
}

// 小表格样式
.mockTable {
  // width: 762px;
  display: table;
  border-collapse: collapse;
  // table-layout: fixed;
  border-spacing: 0;
  .cellTr {
    border-collapse: collapse;
    width: 100%;
    &:hover {
      background-color: #f5f7fa;
    }
    .cell:nth-child(odd) {
      width: 130px;
    }
    &:first-child {
      .cell {
        border: 1px solid #e5eaee;
      }
    }
  }
  .cell {
    display: table-cell;
    height: 50px;
    line-height: 50px;
    width: 220px;
    text-indent: 20px;
    border-left-width: 1px;
    border-right-width: 1px;
    border-bottom-width: 1px;
    border-top-width: 0;
    border-style: solid;
    border-color: #e5eaee;
  }
}

.sign_info {
  margin-top: 57px;
  margin-left: 22px;
  ul {
  }
  li {
    padding-bottom: 20px;
  }
}

.applybook_body {
  @extend %_themainPadding;

  .applybook_title {
    font-size: 17px;
    color: $themeColor;
    padding-bottom: 30px;
    .scroll_toolbar {
      font-size: 14px;
      padding-right: 30px;
      .active {
        border-bottom: 2px solid $themeColor;
      }
      position: relative;
      .ac_left {
        position: absolute;
        left: -20px;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 8px;
        height: 13px;
        background: url(./../../../assets/img/ic20_004.png) no-repeat center;
      }
      .ac_right {
        position: absolute;
        right: -20px;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 8px;
        height: 13px;
        background: url(./../../../assets/img/ic20_005.png) no-repeat center;
      }
    }
  }

  .applybook_content {
    padding-right: 30px;
    .article_left,
    .article_right {
      width: 565px;
      height: 780px;
      border: 1px solid #9b9b9b;
      overflow: hidden;
    }
  }
}
</style>

<scroll-y @handleClick="handleClick" :options="list" :defaultWidth="500" label="name"></scroll-y>
    this.list = [
      {name : '1-'},
      {name : '2-1'},
      {name : '张三啦啦啦-2'},
      {name : '张三啦啦啦-'},
    ]
