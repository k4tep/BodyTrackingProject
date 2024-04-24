import styles from './echarts.module.scss';
import ReactEcharts from 'echarts-for-react';

export default function MyEcharts(props: { data: any }) {
    let option = {
        xAxis: {
            type: 'category',
            data: props.data
                .sort((a: any, b: any) => Date.parse(a.date) - Date.parse(b.date))
                ?.map((e: { date: string | any[] }) => e.date.slice(0, 10)),
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                data: props.data?.map((e: { value: any }) => e.value),
                type: 'line',
                color: '#627254',
            },
        ],
    };

    return (
        <div className={styles.echarts_container}>
            <ReactEcharts option={option} />
        </div>
    );
}
