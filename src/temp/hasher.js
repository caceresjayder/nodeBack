const bcrypt = require('bcrypt');

bcrypt.hash("secureUser123", 10).then(pass => console.log(pass));


"$2b$10$MMXJszIWk4zm/.cPMoS26eNPvm1i9yH/dKyxqgmAUG0eZJqBT7Bh6"

"$2b$10$HHsjHUoYXjfQwiMyjctDW.vIJ76ixqlfigOf3xHuJlPM9GttQ3WTi"