import { Box,Typography,Avatar } from "@mui/material";
import { UserCard, UsersList } from "./styles";
import axios from 'axios';
import { api } from "../../config";
import { useState } from "react";
const Users = ()=>{
    const [users,setUsers] = useState([]);
    axios.get(`${api}/users`).then((response)=>{
            setUsers(response.data);
    });
    return(
    <UsersList>
        
    {users.length>0?(users.map((data)=>(
    <UserCard>
        <Avatar/>
        <Typography color="black">
            {data.id}
        </Typography>
        <Typography color="black">
            {data.name}
        </Typography>
    </UserCard>
    ))):<Typography color="black" >
        Fetching Data.....</Typography>}
    </UsersList>
    )
}

export {Users};