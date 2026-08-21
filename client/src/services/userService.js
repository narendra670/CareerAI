import api from '../utils/api';

const userService = {
  getProfile: async () => {
    const { data } = await api.get('/users/profile');
    return data;
  },

  updateProfile: async (updates) => {
    const { data } = await api.put('/users/profile', updates);
    return data;
  },

  saveCareer: async (careerId) => {
    const { data } = await api.post(`/users/save-career/${careerId}`);
    return data;
  },
};

export default userService;
