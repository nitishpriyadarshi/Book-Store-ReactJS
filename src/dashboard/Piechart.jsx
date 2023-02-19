import React from 'react'
import { PieChart } from 'react-minimal-pie-chart';

export default function Piechart() {
    return (
        <div style={{ textAlign: "center", marginLeft: "20ex" }} >
            <h2>Data in Chart</h2>
            <PieChart
                radius="50"
                data={[
                    { labels: "Sales", title: 'Sales', value: 9000, color: '#E38627' },
                    { labels: "Profit", title: 'Profit', value: 900, color: '#C13C37' },
                ]}
            />
            <h3>Sales and Profit Chart</h3>

        </div>
    )
}
