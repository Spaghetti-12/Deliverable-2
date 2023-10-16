const { ObjectId } = require("mongodb");
const { connectDatabase } = require("../dao/database");
import rules from "./rules.json";

async function createScanRequest(url) {
  const database = await connectDatabase();
  const request_collection = database.collection("scan_requests");
  const result_collection = database.collection("scan_results");

  const insert = await request_collection.insertOne({
    url,
    status: "Incomplete",
    date_created: new Date(),
  });
  return insert.insertedId;
}

async function completeScanRequest(id) {
  const database = await connectDatabase();
  const request_collection = database.collection("scan_requests");

  const update = await request_collection.updateOne(
    { _id: id },
    { $set: { status: "Complete" } },
  );

  return update.modifiedCount;
}

async function saveScanResults(scanRequestId, results) {
  const database = await connectDatabase();
  const result_collection = database.collection("scan_results");

  const record = { scanRequestId, ...results };
  const insert = await result_collection.insertOne(record);

  return insert.insertedId;
}

async function getScanResults(scanRequestId) {
  const database = await connectDatabase();
  const result_collection = database.collection("scan_results");

  return await result_collection.findOne({
    scanRequestId: new ObjectId(scanRequestId),
  });
}

module.exports = {
  createScanRequest,
  completeScanRequest,
  saveScanResults,
  getScanResults,
};
