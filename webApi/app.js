const appFunctions = require("./app_functions");
appFunctions.useMiddlewaresBeforeRouters();
appFunctions.useRouters();
appFunctions.useMiddlewaresAfterRouters();
appFunctions.connectDbAndListen();
