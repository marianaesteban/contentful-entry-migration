const contentful = require("contentful-management");

// https://www.contentful.com/developers/docs/references/authentication/#getting-a-personal-access-token
const client = contentful.createClient({
  accessToken: '',
});

const spaceID = ''
const sourceEnv = ''
const targetEnv = ''
const targetEntry = ''

const getData = (entry) => {
  return {
    content_type_id: entry.sys.contentType.sys.id,
    entry_id: entry.sys.id,
    fields: entry.fields,
  }
}

const delayCreateEntry = (environment, item, index) => {
  setTimeout(function() {
    console.log(item.entry_id)
     environment.createEntryWithId(item.content_type_id, item.entry_id, {
        fields: item.fields
      })
}, index * 1000)
}

const deleteUnsupportedFields = (item, fieldIds = []) => {
  fieldIds.forEach(fieldId => {
    delete item.fields[fieldId]
  })
}

async function run() {

  let response = []

// Get entry references
  await client.getSpace(spaceID)
  .then((space) => space.getEnvironment(sourceEnv))
  .then((environment) => environment.getEntryReferences(targetEntry, { include: 10 }))
  .then((entry) =>  entry.includes.Entry.forEach((item) => {
    // delete fields that are not in the target environment
    // deleteUnsupportedFields(item, ['fieldID', 'fieldID2'])
    response.push(getData(item))
  }))
  .catch(console.error)

// Get entry
  await client.getSpace(spaceID)
  .then((space) => space.getEnvironment(sourceEnv))
  .then((environment) => environment.getEntry(targetEntry))
  .then((entry) => response.push(getData(entry)))
  .catch(console.error)

// console.log(JSON.stringify(response))

// Create entries
  client.getSpace(spaceID)
  .then((space) => space.getEnvironment(targetEnv))
  .then((environment) => 
  response.forEach((item, index) =>
    delayCreateEntry(environment, item, index)
  ))
  .catch(console.error)

}

run()

