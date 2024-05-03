export async function signIn(email:string, password:string, authType:string) {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  headers.append('Allow-Origin', '*');

  console.log(email, password)

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_PATH}/auth/`+ authType.toLocaleLowerCase().replace(/ /g,''), {
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