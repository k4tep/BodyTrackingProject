export async function putData(data:{id: number; value: number}) {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  headers.append('Allow-Origin', '*');
  headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`);

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_PATH}/weights/${data.id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({value:data.value})
  });
  if(response.status === 200){
    return response.json()
 }else{
    throw response.status + ' ' + response.statusText
 }
}