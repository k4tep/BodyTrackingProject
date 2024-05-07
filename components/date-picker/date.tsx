import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

export default function MyDatePicker(props: { label: string; date: any; setDate: any }) {
    return (
        <DatePicker
            format={'DD/MM/YYYY'}
            defaultValue={
                props.label === 'Date'
                    ? props.date?.date
                    : props.label === 'End date'
                    ? props.date?.endDate
                    : props.date?.startDate
            }
            label={props.label}
            onChange={(newValue) =>
                props.label === 'Date'
                    ? props.setDate({ ...props.date, date: newValue })
                    : props.label === 'End date'
                    ? props.setDate({ ...props.date, endDate: newValue })
                    : props.setDate({ ...props.date, startDate: newValue })
            }
            sx={{
                '.MuiInputBase-root': {
                    color: '#627254',
                    borderRadius: '5px',
                    backgroundColor: '#EEEEEE',
                    fontSize: '15px',
                    margin: '10px 0',
                    padding: '3px',
                    paddingRight: '15px',
                },
                '.MuiInputBase-input': {
                    padding: '5px',
                },
                '.MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                    outline: 'none',
                },
                '.MuiInputLabel-root.Mui-focused': {
                    color: '#76885B',
                },
                '.MuiInputLabel-root, .MuiIconButton-root': {
                    color: '#627254',
                },
            }}
        />
    );
}
