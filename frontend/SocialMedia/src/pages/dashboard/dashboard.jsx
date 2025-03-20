import { Box, Tab } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import { useState } from 'react';
import { Section } from './styles';
import { Users } from './users';

const Dashboard = ()=>{
    const [value,setValue] = useState(0);
    const tabs = [
        {
            label:"Top Users",
            id :0,
        },
        {
            label:"Latest Posts",
            id :1,
        },
        {
            label:"Trending Posts",
            id :2,
        }
    ]

    const sections = [
        <Users/>
    ]
    return(
        <Box sx={{
        }}>
        <Tabs  value={value}>
            {
                tabs.map((data)=>(
                    <Tab onClick={()=>{setValue(data.id)}} label={data.label}/>
                ))
            }
        </Tabs>
        <Section>
            {
                sections[value]
            }
        </Section>
        </Box>
    )
}

export {Dashboard};