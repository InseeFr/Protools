export const getConfig = async () => {
  fetch("/configuration.json")
      .then(response => { response.json() })
      .then(data => {
          console.log(data);
          return data;
      })
};

export const getOidcFile = async () => { 
    fetch("/oidc.json")
        .then(response => { response.json() })
        .then(data => {
            console.log(data);
            return data;
        })
};