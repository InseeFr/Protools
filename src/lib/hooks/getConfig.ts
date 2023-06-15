const getConfig = async () => {
  fetch("./public/configuration.json")
      .then(response => { response.json() })
      .then(data => {
          console.log(data);
          return data;
      })
};

export default getConfig;