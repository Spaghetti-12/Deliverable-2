const ScansService = require("../services/ScansService");
const { getScanResults } = require("../repository/ScansRepo");

async function createScan(request, response) {
  try {
    console.log(request.body);
    const request_id =  await ScansService.createScan(request.body.scan_url);
    response.json({request_id});
  } catch (err) {
    console.error(err);
    response.status(500);
  }
}

async function getResults(request, response) {
  try {
    response.json(await ScansService.getResults(request.body.scanRequestId));
  } catch (err) {
    console.error(err);
  }
}

async function getAccessibilityScore(request, response) {
  try {
    const scanRequestID = request.body.scanRequestId;

    const scanResults = await getScanResults(scanRequestID);

    if (!scanResults) {
      return response.status(404).json({ message: "Scan result not found." });
    }

    const accessibilityScore =
      await ScansService.calculateAccessibilityScore(scanResults);

    return response.json({ accessibilityScore });
  } catch (err) {
    console.error(err);
    response.status(500).json({
      error: "An error occurred while calculating the accessibility score.",
    });
  }
}

module.exports = { createScan, getResults, getAccessibilityScore };
