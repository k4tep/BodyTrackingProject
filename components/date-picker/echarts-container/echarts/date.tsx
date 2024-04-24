import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

export default function MyDatePicker(props: { label: string }) {
    return (
        <DatePicker
            defaultValue={
                props.label === 'End date'
                    ? dayjs(Date.now())
                    : dayjs(Date.now() - 7 * 24 * 60 * 60 * 1000)
            }
            label={props.label}
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
