const appFunctions = require("./app_functions");
appFunctions.useMiddlewares();
appFunctions.useRouters();
appFunctions.connectDbAndListen();
