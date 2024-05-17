import { getMe } from '@/api/get-me';
import ReactEcharts from 'echarts-for-react';
import { useEffect, useState } from 'react';

export default function MyEchartGrade(props: { data: any }) {
    const [me, setMe] = useState({ id: null, email: '', age: null, height: null });

    useEffect(() => {
        async function getInfo() {
            try {
                const data = await getMe();
                setMe(data);
            } catch (error) {}
        }
        getInfo();
    }, [props.data]);

    let option = {
        series: [
            {
                type: 'gauge',
                startAngle: 180,
                endAngle: 0,
                center: ['50%', '90%'],
                radius: '150%',
                min: 10,
                max: 64,
                splitNumber: 9,
                axisLine: {
                    lineStyle: {
                        width: 3,
                        color: [
                            [0.17, '#5b7488'],
                            [0.29, '#76885B'],
                            [0.36, '#887f5b'],
                            [1, '#885b5b'],
                        ],
                    },
                },
                pointer: {
                    icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
                    length: '20%',
                    width: 15,
                    offsetCenter: [0, '-60%'],
                    itemStyle: {
                        color: 'auto',
                    },
                },
                axisTick: {
                    length: 15,
                    lineStyle: {
                        color: 'auto',
                        width: 2,
                    },
                },
                splitLine: {
                    length: 25,
                    lineStyle: {
                        color: 'auto',
                        width: 4,
                    },
                },
                axisLabel: {
                    color: 'inherit',
                    fontSize: 15,
                    fontWeight: 'normal',
                    distance: -60,
                    rotate: 'tangential',
                    formatter: function (value: number) {
                        if (value === 52) {
                            return 'Obesity';
                        } else if (value === 28) {
                            return 'Overweight';
                        } else if (value === 22) {
                            return 'Normal';
                        } else if (value === 16) {
                            return 'Underweight';
                        }
                        return '';
                    },
                },
                title: {
                    offsetCenter: [0, '-10%'],
                    fontSize: 20,
                },
                detail: {
                    fontSize: 30,
                    offsetCenter: [0, '-30%'],
                    valueAnimation: true,
                    formatter: function (value: number) {
                        if (value >= 30) {
                            return 'Obesity \n' + Math.round(value);
                        } else if (value >= 26 && value <= 30) {
                            return 'Overweight \n' + Math.round(value);
                        } else if (value >= 20 && value <= 25) {
                            return 'Normal \n' + Math.round(value);
                        } else if (value <= 20) {
                            return 'Underweight \n' + Math.round(value);
                        }
                        return '';
                    },
                    color: 'inherit',
                },
                data: [
                    {
                        value:
                            me.height === null
                                ? 0
                                : props.data[props.data.length - 1].value /
                                  Math.pow(me.height / 100, 2),
                        name: 'BMI',
                    },
                ],
            },
        ],
    };

    return me.height === null ? (
        <h1>No height data available</h1>
    ) : (
        <ReactEcharts
            option={option}
            style={{
                height: '100%',
                width: '100%',
            }}
        />
    );
}
