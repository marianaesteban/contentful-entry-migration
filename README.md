# contentful-entry-migration
Script to migrate a single entry and it's references from a Contentful env into another

1. Clone repo and install with `npm i`

### To migrate an entry from one Contentful environment into another:
2. Add the following to the `migrate-entry.js` script:
- Contentful Access Token
- Contentful Space ID
- Source Environment ID (the Contentful environment where the original entries you want to clone is)
- Target Environment ID (the Contentful environment where the cloned entries will be created)
- Target Entry ID (ID of the entry to clone, all referenced entries will be also cloned)

3. Run script with `node migrate-entry.js`

##### TESTING BEFORE RUNNING SCRIPT 
If you want to test the output before running the full script:
1. Comment the `Create entries` function (at the end of `run()`)

2. Log the response adding `console.log(JSON.stringify(response))` at the end of `run()` 

3. Run script with `node main.js > result.txt` to get the output on a text file


### To link a specific entry to a field on multiple pages:
2. Add the following to the `link-entry-content.js` script:
- Contentful Access Token
- Contentful Space ID
- Environment ID
- Target Field ID (the content type ID of the field where the entry will be linked)
- Linked Entry ID (ID of the entry to link into the pages)
- (if necesary) Filter By Slug (Slug to filter the pages where the entry will be linked, works with `startsWith`)

3. Run script with `node link-entry-content.js`
