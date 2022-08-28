import {
  getContacts,
  deleteContact,
  addNewContact,
} from '../../services/contacts';
import * as actions from './contacts-actions';

export const fetchContacts = () => {
  const func = async dispatch => {
    dispatch(actions.fetchContactsRequest());
    try {
      const { data } = await getContacts();
      dispatch(actions.fetchContactsSuccess(data));
    } catch (error) {
      dispatch(actions.fetchContactsError(error));
    }
  };
  return func;
};

export const addContact = result => {
  const func = async (dispatch, getState) => {
    const { contacts } = getState();
    const isDublicate = contacts.items.find(
      item => item.name.toLowerCase() === result.name.toLowerCase()
    );
    if (isDublicate) {
      alert(`${result.name} is already in contacts`);
      return;
    } else if (result.name === '') {
      alert('Please enter your name');
      return;
    }
    dispatch(actions.addContactRequest());
    try {
      const { data } = await addNewContact(result);
      dispatch(actions.addContactSuccess(data));
    } catch (error) {
      dispatch(actions.addContactError(error));
    }
  };
  return func;
};

export const removeContact = contactId => {
  const func = async dispatch => {
    dispatch(actions.removeContactRequest());
    try {
      const { data } = await deleteContact(contactId);
      dispatch(actions.removeContactSuccess(data.id));
    } catch (error) {
      dispatch(actions.removeContactError(error));
    }
  };
  return func;
};
