export async function getMe() {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  headers.append('Allow-Origin', '*');
  headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`);

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_PATH}/users/me`, {
    method: 'GET',
    headers,
  });
  if(response.status === 200){
    return response.json()
 }else{
    throw response.status + ' ' + response.statusText
 }
}