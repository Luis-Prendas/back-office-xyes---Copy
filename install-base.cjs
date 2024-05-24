const { exec, execSync } = require("child_process");
const { copyFileSync } = require("fs");
const path = require("path");

__dirname = path.resolve();

// console.log(__dirname);

const components_backoffice_xyes = [
  "back-office.moonhicr",
];

console.log("Instalando componentes");

Promise.all([
  components_backoffice_xyes.map((component) => {
    return new Promise(async (resolve, reject) => {
      try {
        const permissions777 = `sudo chmod -R 777 ${__dirname}`;
        const removeNodeModules = `rm -Rf node_modules`;
        const installNodeModules = `npm install`;
        console.log(`Instalando dependencias de ${component}`);
        execSync(permissions777);
        // execSync(removeNodeModules);
        execSync(installNodeModules);
        console.log(`Instalando dependencias de ${component} finalizado`);
        //
        // const removeNgnixConfig = `sudo rm /etc/nginx/sites-available/${component}.dev`;
        const copyNgnixConfig = `sudo cp ${__dirname}/autoInstallNginxDev/${component}.dev /etc/nginx/sites-available/${component}.dev`;
        const linkNginxConfig = `sudo ln -s /etc/nginx/sites-available/${component}.dev /etc/nginx/sites-enabled/${component}.dev`;
        // execSync(removeNgnixConfig);
        execSync(copyNgnixConfig);
        execSync(linkNginxConfig);
        copyFileSync(
          path.join(__dirname, component, ".env.dev"),
          path.join(__dirname, component, ".env")
        );
      } catch (err) {
        console.log(err);
      }
    });
  }),
]);

// copyFileSync(path.join(__dirname, ".env.prod"), path.join(__dirname, ".env"));

console.log("Entorno listo");
