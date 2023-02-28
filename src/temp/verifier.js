const bcrypt = require('bcrypt');


bcrypt.compare("secureadmin1234", "$2b$10$HHsjHUoYXjfQwiMyjctDW.vIJ76ixqlfigOf3xHuJlPM9GttQ3WTi").then(res => console.log(res))