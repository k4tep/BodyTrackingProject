import { getMinMaxData } from '@/api/data/min-max-data';
import ReactEcharts from 'echarts-for-react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

export default function MyEchartLine(props: {
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
        tooltip: {
            trigger: 'item',
            formatter: '{b} <br/>------- <br/>Вес: {c}',
            padding: [5],
            textStyle: {
                fontSize: 12,
                color: '#627254',
            },
            backgroundColor: 'rgba(238, 238, 238, 0.8)',
            border: 'none',
            borderRadius: 4,
            extraCssText: 'height: fit-content;',
        },
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

    return <ReactEcharts option={option} />;
}
