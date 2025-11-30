test("homepage loads", () => {
  const fs = require("fs");
  const html = fs.readFileSync("./index.html", "utf8");
  expect(html).toContain("<title>");
});
