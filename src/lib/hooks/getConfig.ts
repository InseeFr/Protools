export const getConfig = async () => {
  //console.log("getConfig");
  return fetch("/configuration.json")
    .then(response => response.json())
    .then(data => {
      console.log(data);
      return data;
    });
};

export const getOidcFile = async () => { 
    fetch("/oidc.json")
        .then(response => { response.json() })
        .then(data => {
            console.log(data);
            return data;
        })
};