<template>
  <Survey :survey="survey" />
</template>
<script>
import { Survey, StylesManager, Model } from "survey-vue";
export default {
  name: "survey",
  components: {
    Survey,
  },
  data() {
    let data = {
      title: "问卷标题",
      pages: [
        {
          questions: [],
        },
      ],
    };
    StylesManager.applyTheme("bootstrap"); //使用bootstrap的样式
    let model = new Model(data);
    return {
      survey: model,
      result: null,
    };
  },
  async created() {
    //获取相应授权
    const auth = this.$cloudbase.auth();
    const db = this.$cloudbase.database();
    // 应用初始化时
    if (auth.hasLoginState()) {
      //获取数据
      db.collection("form")
        .field({
          _createTime: false,
          _updateTime: false,
          _id: false,
        })
        .get()
        .then((res) => {
          console.log("返回数据表单", res.data);
          // 此时已经登录
          let data = {
            title: "问卷标题",
            pages: [
              {
                questions: [...res.data],
              },
            ],
          };
          StylesManager.applyTheme("bootstrap"); //使用bootstrap的样式
          let model = new Model(data);
          model.onUploadFiles.add(async (survey,options)=>{//将上传文件转换格式，原本为base64
            let flie=await this.$cloudbase.uploadFile({
              cloudPath:`${Math.random()}`,
              filePath:options.files[0]
            })
            options.callback('success',[{
              file:options.files[0],
              content:file.fileID
            }])
          })
          model.onComplete.add((result) => {//添加数据处理,会将提交的数据保存到result中
             this.$cloudbase.callFunction({//调用uploadAnswer云函数
                    name:"uploadAnswer",
                    data:result.data
                  }).then(item =>{
                    console.log("函数提交完成",item)
                    alert("提交的信息已收到")
                  }).catch(error =>{
                    console.log("函数提交错误",error);
                  })
            this.result = result.data;
            console.log("提交数据", this.result);
          });
          this.survey = model;
        })
        .catch((err) => {
          console.log("数据查询错误", err);
        });
      console.log("登录", auth.hasLoginState());
    } else {
      // 此时未登录，执行您的登录流程
      this.$router.push({ path: "/" });
    }
  },
  methods: {},
};
</script>