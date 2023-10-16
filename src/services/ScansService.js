const { AxePuppeteer } = require("@axe-core/puppeteer");
const puppeteer = require("puppeteer");

const ScansRepo = require("../repository/ScansRepo");
const { request } = require("express");

async function createScan(url) {
  const requestId = await ScansRepo.createScanRequest(url);
  runScan(requestId, url).then((r) => ScansRepo.completeScanRequest(requestId));
  return requestId;
}

async function runScan(scanRequestId, url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  await page.addScriptTag({ path: require.resolve("axe-core") });

  try {
    const results = await new AxePuppeteer(page).analyze();
    await ScansRepo.completeScanRequest(scanRequestId);
    await ScansRepo.saveScanResults(scanRequestId, results);
    return results;
  } catch (err) {
    console.log(err);
  }
}

async function getResults(scanRequestId) {
  return await ScansRepo.getScanResults(scanRequestId);
}

async function calculateAccessibilityScore(scanResults) {
  if (!scanResults) {
    throw new Error(
      "Scan results are required to calculate the accessibility score.",
    );
  }

  const totalChecks = scanResults.violations.length + scanResults.passes.length;
  const passedChecks = scanResults.passes.length;

  if (totalChecks === 0) {
    return 100;
  }

  const accessibilityScore = (passedChecks / totalChecks) * 100;
  return parseFloat(accessibilityScore.toFixed(2));
}

module.exports = { createScan, getResults, calculateAccessibilityScore };
