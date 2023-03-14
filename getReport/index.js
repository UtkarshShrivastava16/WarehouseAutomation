const CosmosClient = require("@azure/cosmos").CosmosClient;

module.exports = async function (context, req) {
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
        const { resources: items } = await container.items.readAll().fetchAll();
        const response = {
            status: 200,
            body: items
        };
        context.res = response;
    } catch (error) {
        context.log(error);
        context.res = {
            status: 500,
            body: error.message
        };
    }
};
