## Node JS Package for chat using socket io

### 1. Install package in your node app using below command
```bash
npm i emp-chat-node
```

### 2. Open your main nodejs (index.js) file and add below code in it
```bash
const socketHelper = require("emp-chat-node");

// creating socket io instance
socketHelper(http);

where http is your server created variable
```