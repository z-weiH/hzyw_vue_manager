import Regs from '@/assets/js/regexp'
export const RULES = {
  require: { required : true , message : '不能为空' , trigger : 'blur'},
  phone: {required : true , pattern : Regs['telOrPhone'] , message : '手机号格式不正确'}, // 固定电话 或 手机号
  email: {required : true , pattern : Regs['email'] , message : '邮箱格式不正确'},// 邮箱
  certificate: {required : true , pattern : Regs['certificate'] , message : '身份证格式不正确'},// 身份证
  checkBankCard: {required : true , pattern : Regs['checkBankCard'] , message : '格式不正确'},// 银行卡
  areaCode: {required : true , pattern : Regs['areaCode'] , message : '格式不正确'},// 区号
  mustnum: {required : true , pattern : Regs['mustnum'] , message : '格式不正确'}, // 只能输入数字
  securityCode: {required : true , pattern : Regs['securityCode'] , message : '格式不正确'},// 验证码
  zipCode: {required : true , pattern : Regs['zipCode'] , message : '格式不正确'}, // 邮政编码
  psw: {required : true , pattern : Regs['psw'] , message : '格式不正确'},// 密码
  zhCN: {required : true , pattern : Regs['zhCN'] , message : '格式不正确'}, // 中文
  symbolfont20: {required : true , pattern : Regs['symbolfont20'] , message : '格式不正确'},// 最多输入20个字符(类型包括字母/数字/汉字)
  gt0:{ validator: (rule, value, callback) => {
        if (value < 0) {
          callback(new Error('必须大于0'));
        } else {
          callback();
        }
      },
    trigger: 'blur' }
};
