import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://630b5943f280658a59da0079.mockapi.io/api/contacts',
});

export const getContacts = async () => {
  const data = await instance.get('/');
  return data;
};

export const deleteContact = async id => {
  const data = await instance.delete(`/${id}`);
  return data;
};

export const addNewContact = async data => {
  console.log('data: ', data);
  const result = await instance.post('/', data);
  return result;
};
