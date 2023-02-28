const bcrypt = require('bcrypt');

bcrypt.hash("secureadmin1234", 10).then(pass => console.log(pass));




"$2b$10$HHsjHUoYXjfQwiMyjctDW.vIJ76ixqlfigOf3xHuJlPM9GttQ3WTi"