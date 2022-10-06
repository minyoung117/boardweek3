const mongoose = require('mongoose');

const connect = () => {
  mongoose
    .connect('mongodb+srv://test:sparta@cluster0.kelrm3b.mongodb.net/Cluster0?retryWrites=true')
    .catch(err => console.log(err))
};

mongoose.connection.on('error', err => {
  console.error('몽고디비 연결 에러', err)
})

module.exports = connect;