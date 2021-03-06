import React from 'react'
import Schedulelist from '../components/Schedulelist/index'
import { Button, Collapse, List } from 'antd';
import request from '../request'

const { Panel } = Collapse;
export default () => {
    const [list, setlist] = React.useState([])
    const [listdata, setdata] = React.useState([])
    React.useEffect(() => {
        async function temp() {
            const { data } = await request('/schedules')
            setlist(data)
        }
        temp();
    }, [])
    const getdata = async (index) => {
        const copy = [...listdata]
        const { data } = await request(`/get_schedules/${list[index]}`)
        copy[index] = data.schedules
        setdata(copy)
    }
    return (
        <div>
            <Collapse onChange={getdata} accordion>
                {list.map((s, i) => (
                    <Panel header={s} key={i}>
                        <List
                            size="large"
                            bordered
                            dataSource={listdata[i] || []}
                            renderItem={(item, index) => <Schedulelist {...item} schedulename={s} />}
                        />
                    </Panel>
                ))}
            </Collapse>
            <Button type="primary" style={{ marginTop: 20 }}>新增Schedule</Button>
        </div>
    )
}