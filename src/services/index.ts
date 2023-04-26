import axios from 'axios';

const baseEndpoint = 'https://engineering-task.elancoapps.com/api/applications';
export const fetchAllApplications = async () => {
  return axios
    .get(baseEndpoint)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error('Error while getting all applications data', error);
    });
};

export const fetchApplicationDetailsByName = async (appName: string) => {
  return axios
    .get(`${baseEndpoint}/${appName}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error('Error while getting application details', error);
    });
};
