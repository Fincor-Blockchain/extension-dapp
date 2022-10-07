import { SET_CONTACTS, SET_ACTIVE_CONTACT } from "../wallet/actionTypes";

export const allContacts = (contacts) => ({
  type: SET_CONTACTS,
  payload: contacts,
});

export const activeContacts = (contact) => ({
  type: SET_ACTIVE_CONTACT,
  payload: contact,
});
