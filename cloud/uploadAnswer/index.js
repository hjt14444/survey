const cloudbase = require('@cloudbase/node-sdk')
const app = cloudbase.init({
    env:'cloud1-8g67o253ae1b4cab'
})
// 1. 获取数据库引用
var db = app.database()
exports.main = async (event,context) => {
        return {
            code:0,
            data:(await db.collection("answer").add(event))
        }
}
