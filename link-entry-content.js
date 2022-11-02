/**
 * Script for linking an entry to a field on multiple entries
 */

const contentful = require("contentful-management");

// https://www.contentful.com/developers/docs/references/authentication/#getting-a-personal-access-token
const client = contentful.createClient({
  accessToken: '',
});

const spaceID = ''
const envID = ''
const targetEntries = []
const targetFieldID = 'saleContent'
const linkedEntryID = ''
const locale = 'en-US'

async function getPlps() {

  const filterBySlug = 'gift-guide'

  await client.getSpace(spaceID)
  .then((space) => space.getEnvironment(envID))
  .then((environment) => environment.getEntries({'content_type': 'page'})) // you can add more queries as 'key': 'value'
  .then((response) => response.items.filter(item => item.fields.slug['en-US'].startsWith(filterBySlug)).forEach(item => targetEntries.push(item.fields.content['en-US'].sys.id)))
  .catch(console.error)
  
//  console.log(JSON.stringify(targetEntries))

}

const deduplicatedContent = (entry) => {
  const originalFieldContent = entry.fields[targetFieldID][locale] || []
  const linkedEntry = [{"sys":{"type":"Link","linkType":"Entry","id": linkedEntryID}}]
  const newFieldContent = originalFieldContent.concat(linkedEntry)
  const deduplicatedFieldContent = newFieldContent.filter((item, index) => {
    const _item = JSON.stringify(item);
    return index === newFieldContent.findIndex(obj => {
      return JSON.stringify(obj) === _item;
    });
  });
  
  return deduplicatedFieldContent
}

async function linkContent() {

  await getPlps()

  // Update entry
  client.getSpace(spaceID)
  .then((space) => space.getEnvironment(envID))
  .then((environment) => targetEntries.forEach(entryID => environment.getEntry(entryID)
  .then((entry) => {
    const content = deduplicatedContent(entry)
    entry.fields[targetFieldID] = {[locale]: content}
    return entry.update()
  }).then((entry) => console.log(`Entry ${entry.sys.id} updated.`))
  ))
  .catch(console.error)
}


linkContent()