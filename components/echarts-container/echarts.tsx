import styles from './echarts.module.scss';
import dayjs from 'dayjs';
import MyEchartLine from './echartLine/echarts-line';
import MyEchartGrade from './echartGrade/echart-grade';

export default function MyEcharts(props: {
    data: any;
    date: { startDate: dayjs.Dayjs; endDate: dayjs.Dayjs };
    type: string;
}) {
    return (
        <div className={styles.echarts_container}>
            {props.data.length === 0 ? (
                <h1>No data here</h1>
            ) : props.type === 'Line' ? (
                <MyEchartLine date={props.date} data={props.data} />
            ) : (
                <MyEchartGrade data={props.data} />
            )}
        </div>
    );
}
