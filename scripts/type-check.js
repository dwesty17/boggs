const fs = require("fs");

const root = `${__dirname}/../`;

const walkSync = (dir, filelist = []) => {
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
        if (fs.statSync(dir + file).isDirectory()) {
            filelist = walkSync(dir + file + "/", filelist);
        }
        else {
            filelist.push(file);
        }
    });
    return filelist;
};

console.log(walkSync(root));
