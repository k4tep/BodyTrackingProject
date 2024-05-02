import dayjs from "dayjs";

export async function getData(date:{ startDate: dayjs.Dayjs; endDate: dayjs.Dayjs; }) {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  headers.append('Allow-Origin', '*');
  headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`);

  const response = await fetch(`http://192.168.31.68:3000/weights?dateFrameStart=${date.startDate.format('YYYY-MM-DD')}&dateFrameEnd=${date.endDate.format('YYYY-MM-DD')}`, {
    method: 'GET',
    headers,
  });
  if(response.status === 200){
    return response.json()
 }else{
    throw response.status + ' ' + response.statusText
 }
}