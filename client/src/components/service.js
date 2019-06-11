import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000';

export const userCreate = async (data)=>{
  const obj = {"user":data};
  const newUser = await axios.post('/users/',obj);
  return newUser;
}

export const userLogin = async (data)=>{
  const token = await  axios.post('/auth/login',data);
  return token.data;
}

export const createOperation = async (data)=>{
  const operation = await  axios.post('/operations',data);
  return operation;
}

export const createWallet = async (data)=>{
  const wallet = await  axios.post('/wallets',data);
  return wallet;
}

export const getAllWallets = async ()=>{
  const obj = {"user":localStorage.getItem('user_id')};
  const wallets = await axios.get(`/users/${localStorage.getItem('user_id')}`,obj);
  return wallets.data;
}

export const getAllOperations = async ()=>{
  const obj = {"user":localStorage.getItem('user_id')};
  const user = await axios.get(`/users/${localStorage.getItem('user_id')}`,obj);
  return user.data;
}

export const deleteOperation = async (e,id)=>{
  e.preventDefault();
  const deletedIncome = await  axios.delete(`/operations/${id}`,id);
  return deletedIncome.data;
}

export const editOperation = async (data) =>{
  const editedOperations = await axios.put(`/operations/${data.id}`,data);
  return editedOperations.data;
}