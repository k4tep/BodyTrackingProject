const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpY2MiOjIsImlhdCI6MTcxMzUxOTYwMCwiZXhwIjoxNzE2MTExNjAwfQ.8MF2zZOQkzMa22J4-PF8b1_OY8lqIOMxa7HHl9VPlO0'
export async function getData() {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  headers.append('Allow-Origin', '*');
  headers.append('Authorization', `Bearer ${token}`);

  const response = await fetch(`http://192.168.31.68:3000/weights?dateFrameStart=2023-04-01&dateFrameEnd=2024-04-30`, {
    method: 'GET',
    headers,
  });
  if(response.status === 200){
    return response.json()
 }else{
    throw response.status + ' ' + response.statusText
 }
}