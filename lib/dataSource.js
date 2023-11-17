const fs = require("fs")

class DataSource {
  #dir;
  constructor(dir) {
    this.#dir = dir;
  }

  write(data) {
    fs.writeFileSync(this.#dir, JSON.stringify(data, undefined, 4));
  }

  read() {
    const jsonData = fs.readFileSync(this.#dir, {
      encoding: "utf8",
      flag: "r",
    });

    return jsonData ? JSON.parse(jsonData) : [];
  }

  readAsync() {
    return new Promise((res, rej) => {
      fs.readFile(this.#dir, { encoding: "utf8", flag: "r" }, (err, data) => {
        if (err) {
          rej(err);
        }

        res(data ? JSON.parse(data) : []);
      });
    });
  }
}


module.exports = DataSource
