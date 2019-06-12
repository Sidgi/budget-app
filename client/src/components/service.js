import axios from 'axios'

axios.defaults.baseURL = process.env.REACT_APP_HEROKU_URL;

export const userCreate = async (data)=>{
  try{
    const obj = {"user":data};
    const newUser = await axios.post('/users/',obj);
    return newUser;
  }catch(e){
    console.log(e.message)
  }
}

export const userLogin = async (data)=>{
  try{
    const token = await  axios.post('/auth/login',data);
    return token.data;
  }catch(e){
    console.log(e.message)
  }

}

export const createOperation = async (data)=>{
  try{
    const operation = await  axios.post('/operations',data);
    return operation;
  }catch(e){
    console.log(e.message)
  }
}

export const createWallet = async (data)=>{
  try{
    const wallet = await  axios.post('/wallets',data);
    return wallet;
  }catch(e){
    console.log(e.message)
  }
}

export const getAllWallets = async ()=>{
  try{
    const obj = {"user":localStorage.getItem('user_id')};
    const wallets = await axios.get(`/users/${localStorage.getItem('user_id')}`,obj);
    return wallets.data;
  }catch(e){
    console.log(e.message)
  }
}

export const getAllOperations = async ()=>{
  try{
    const obj = {"user":localStorage.getItem('user_id')};
    const user = await axios.get(`/users/${localStorage.getItem('user_id')}`,obj);
    return user.data;
  }catch(e){
    console.log(e.message)
  }
}

export const deleteOperation = async (e,id)=>{
  try{
    e.preventDefault();
    const deletedIncome = await  axios.delete(`/operations/${id}`,id);
    return deletedIncome.data;
  }catch(e){
    console.log(e.message)
  }
}

export const editOperation = async (data) =>{
  try{
    const editedOperations = await axios.put(`/operations/${data.id}`,data);
    return editedOperations.data;
  }catch(e){
    console.log(e.message)
  }
}