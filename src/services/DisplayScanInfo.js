const mongoose = require('mongoose');
const ScanDetails = mongoose.model('ScanDetails');
const ScansRepo = require("../repository/ScansRepo");

function ScanDetails(_id, timestamp, url, inapplicable, passes, violations){
    this._id = _id;
    this.timestamp = timestamp;
    this.url = url;
    this.inapplicable = inapplicable;
    this.passes = passes;
    this.violations = violations;
}

ScanDetails.prototype.getId = function() {return this._id;}
ScanDetails.prototype.getTimestamp = function() {return this.timestamp;}
ScanDetails.prototype.getUrl = function() {return this.url;}
ScanDetails.prototype.getInapplicable = function() {return this.inapplicable;}
ScanDetails.prototype.getPasses = function() {return this.passes;}
ScanDetails.prototype.getViolations = function() {return this.violations;}

function Rule(id, impact, tags, description, help, nodes){
    this.id = id;
    // Read JSON file to get rule info
}

Rule.prototype.getId = function() {return this.id;}

async function createScanDetails(scanRequestId) {
    const scan_result = await ScansRepo.getScanResults(scanRequestId);
    const scanDetails = new ScanDetails(
        scan_result._id,
        scan_result.timestamp,
        scan_result.url,
        scan_result.inapplicable,
        scan_result.passes,
        scan_result.violations
    )
    return scanDetails;
}

function displayPassedRules(scanDetails){
    scanDetails.getPasses
}

