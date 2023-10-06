const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

function listContacts() {
  try {
    const data = fs.readFileSync(contactsPath, "utf8");
    const contacts = JSON.parse(data);
    console.table(contacts);
    return contacts;
  } catch (error) {
    console.error(error);
    return [];
  }
}

function getContactById(contactId) {
  try {
    const data = fs.readFileSync(contactsPath, "utf8");
    const contacts = JSON.parse(data);
    const contact = contacts.find((c) => c.id === contactId);
    console.log(contact);
    return contact || null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

function removeContact(contactId) {
  try {
    const data = fs.readFileSync(contactsPath, "utf8");
    const contacts = JSON.parse(data);
    const updatedContacts = contacts.filter((c) => c.id !== contactId);
    fs.writeFileSync(contactsPath, JSON.stringify(updatedContacts, null, 2));
    console.log("Contact removed successfully.");
  } catch (error) {
    console.error(error);
  }
}

function addContact(name, email, phone) {
  try {
    const data = fs.readFileSync(contactsPath, "utf8");
    const contacts = JSON.parse(data);
    const newContact = {
      id: Date.now(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    fs.writeFileSync(contactsPath, JSON.stringify(contacts, null, 2));
    console.log("Contact added successfully.");
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};