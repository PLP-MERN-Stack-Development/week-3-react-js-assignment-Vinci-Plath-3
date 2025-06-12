import users from './data.json';

// Simulate an async API call
export const fetchUsers = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(users);
    }, 500); // 500ms delay to mimic network latency
  });
};
