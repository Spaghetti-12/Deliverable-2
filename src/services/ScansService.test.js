const ScansService = require('./ScansService');

test('Creating a scan request', async () => {
    const scanRequestId = await ScansService.createScan("https://google.com/");
    expect(scanRequestId).toBeTruthy();
})