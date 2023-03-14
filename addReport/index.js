const CosmosClient = require('@azure/cosmos').CosmosClient;

module.exports = async function (context, req) {
    // Parse the request body as a JSON object
    const document = req.body;

    // Cosmos DB endpoint and connection string
    const endpoint = 'https://warehouse-automation-cs.documents.azure.com:443/';
    const key = 'lL6okxorHI5bnH12nZsUiDZ3Wb89CEGAWA7Nzggbo2ZyMVPVMbcRpuCleaNzsVwmQH26hKOF53edACDbcePCIg==';

    // Create a new instance of the CosmosClient
    const client = new CosmosClient({ endpoint, key });

    // Select the database and container
    const databaseId = 'warehouse-container';
    const containerId = 'container1';

    // Get a reference to the container
    const container = client.database(databaseId).container(containerId);

    try {
        // Create the document in Cosmos DB
        const { resource: createdDocument } = await container.items.create(document);
        context.res = {
            status: 200,
            body: createdDocument
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: error.message
        };
    }
}