# contentful-entry-migration
Script to migrate a single entry and it's references from a Contentful env into another

1. Clone repo and install with `npm i`

2. Add the following to the main.js script:
- Contentful Access Token
- Contentful Space ID
- Source Environment ID (the Contentful environment where the original entries you want to clone is)
- Target Environment ID (the Contentful environment where the cloned entries will be created)
- Target Entry ID (ID of the entry to clone, all referenced entries will be also cloned)

3. Run script with `node main.js`

NOTE: If you want to test the output before running the full script you can comment the `Create entries` function (at the end of `run()`) and console log the response with `console.log(JSON.stringify(response)` and running `node main.js > result.txt` to get the output on a text file
