import AsyncStorage from '@react-native-async-storage/async-storage';

const StoreStringData = async (storeKey, value) => {
  try {
    await AsyncStorage.setItem(storeKey, value);
  } catch (e) {
    console.log(e);
  }
};

const StoreObjectData = async (storeKey, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(storeKey, jsonValue);
  } catch (e) {
    console.log(e);
  }
};

const GetStringData = async (storeKey) => {
  try {
    return await AsyncStorage.getItem(storeKey);
  } catch (e) {
    console.log(e);
  }
};

const GetObjectData = async (storeKey) => {
  try {
    const jsonValue = await AsyncStorage.getItem(storeKey);
    return jsonValue != null ? JSON.parse(jsonValue) : false;
  } catch (e) {
    console.log(e);
  }
};

const RemoveItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (exception) {
    return false;
  }
};

export {
  StoreStringData,
  StoreObjectData,
  GetStringData,
  GetObjectData,
  RemoveItem,
};
