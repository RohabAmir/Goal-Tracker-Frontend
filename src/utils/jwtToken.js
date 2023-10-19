export function setJWTToken(idToken, refreshToken, localId) {
    
    localStorage.setItem("idToken", idToken) // we need this to get access to loginScreen
    localStorage.setItem("refreshToken",  refreshToken)
    localStorage.setItem("localId",  localId)
  }
  
export function getidToken(){
    return localStorage.getItem('idToken');
}

export function getrefreshToken(){
  return localStorage.getItem('refreshToken');
}

export function getLocalId(){
  return localStorage.getItem('localId');
}


