import { getMinMaxData } from '@/api/data/min-max-data';
import styles from './echarts.module.scss';
import ReactEcharts from 'echarts-for-react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

export default function MyEcharts(props: {
    data: any;
    date: { startDate: dayjs.Dayjs; endDate: dayjs.Dayjs };
}) {
    const [minMax, setminMax] = useState({ min: 0, max: 100 });

    useEffect(() => {
        async function getList() {
            try {
                const data = await getMinMaxData(props.date);
                setminMax(data);
            } catch (error) {}
        }
        getList();
    }, [props.date]);

    let option = {
        xAxis: {
            type: 'category',
            data: props.data
                .sort((a: any, b: any) => Date.parse(a.date) - Date.parse(b.date))
                ?.map((e: { date: string | any[] }) => e.date.slice(0, 10)),
        },
        yAxis: {
            type: 'value',
            min: Math.round(minMax.min) - 1,
            max: Math.round(minMax.max) + 1,
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
            {props.data.length === 0 ? <h1>No data here</h1> : <ReactEcharts option={option} />}
        </div>
    );
}
