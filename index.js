const { program } = require('commander');
const { listContacts, getContactById, removeContact, addContact } = require('./contacts');

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const contactList = await listContacts();
      console.table(contactList);
      break;

    case 'get':
      const getContact = await getContactById(id);
      console.log(getContact);
      break;

    case 'add':
      const addedContact = await addContact(name, email, phone);
      console.log(addedContact);
      break;

    case 'remove':
      const deletedContact = await removeContact(id);

      if (deletedContact) {
        console.log('Contact has been successfully deleted');
      }
      if (deletedContact === null) {
        console.log('Contact could not be deleted');
      }
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
};

invokeAction(argv);
