import dayjs from "dayjs";

export async function getMinMaxData(date:{ startDate: dayjs.Dayjs; endDate: dayjs.Dayjs; }) {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  headers.append('Allow-Origin', '*');
  headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`);

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_PATH}/weights/min-max?dateFrameStart=${date.startDate.format('YYYY-MM-DD')}&dateFrameEnd=${date.endDate.format('YYYY-MM-DD')}`, {
    method: 'GET',
    headers,
  });
  if(response.status === 200){
    return response.json()
 }else{
    throw response.status + ' ' + response.statusText
 }
}