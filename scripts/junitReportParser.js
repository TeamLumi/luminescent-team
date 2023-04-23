const { XMLParser } = require('fast-xml-parser');
const fs = require('fs');
const path = require('path');

const parser = new XMLParser({ ignoreAttributes: false });
const junitReportFilePath = path.join(__dirname, '../reports/jest-report.xml');

const XMLdata = fs.readFileSync(junitReportFilePath);
const xmlObj = parser.parse(XMLdata);

const failedLines = xmlObj.testsuites.testsuite
  .map((suite) => {
    return suite.testcase.map((c) => {
      if (c.failure) {
        return c['@_name'];
      }
    });
  })
  .flat()
  .filter((line) => !!line);

const failedForms = failedLines.map((line) => {
  const lineHalfs = line.split(' for ');
  const filename = lineHalfs[0].split(' ').slice(-1)[0];
  const formName = lineHalfs[1].split(' ').slice(0, -1).join(' ');
  return `${formName};${filename}`;
});

fs.writeFileSync(path.join(__dirname, '../reports/failed-tests.txt'), failedLines.join('\n'));
fs.writeFileSync(path.join(__dirname, '../reports/missing-images.csv'), failedForms.join('\n'));
