const contentful = require("contentful-management");

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

async function run() {

  let response = []

//get entry references
  await client.getSpace(spaceID)
  .then((space) => space.getEnvironment(sourceEnv))
  .then((environment) => environment.getEntryReferences(targetEntry, { include: 10 }))
  .then((entry) =>  entry.includes.Entry.forEach((item) =>{
    delete item.fields.aplicationName
    delete item.fields.seoBlockTitle
    delete item.fields.schema
    response.push(getData(item))}))

// get entry
  await client.getSpace(spaceID)
  .then((space) => space.getEnvironment(sourceEnv))
  .then((environment) => environment.getEntry(targetEntry))
  .then((entry) => response.push(getData(entry)))

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

