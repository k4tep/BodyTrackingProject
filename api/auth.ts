export async function signUp(email:string, password:string) {
  const headers = new Headers();
  headers.append('Accept', 'application/json');

  const response = await fetch(`/auth/signup`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      email,
      password
    })
  });
  if(response.status === 200){
    return response.json()
 }else{
    throw "error"
 }
}