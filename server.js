const express = require('express');
const { updateDescImgs } = require('./actions/updateDescImgs.js'); // Adjust the path as needed
const app = express();
const port = 3000;

app.get('/action', async (req, res) => {
    const { projectName, actionName, skuList } = req.query;
    try {
        if (!projectName || !actionName || !skuList) {
            return res.status(400).send('Missing required query parameters.');
        }
        const parsedSkuList = JSON.parse(decodeURIComponent(skuList));

        // Map actionName to the corresponding function
        switch (actionName) {
            case 'updateDescImgs':
                await updateDescImgs(projectName, actionName, parsedSkuList);
                break;
            // Add other actions here as needed
            default:
                return res.status(400).send('Invalid action name.');
        }

        res.status(200).send('Process completed successfully.');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred.');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
