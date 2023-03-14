import React from "react";



const View=({users,DeleteUser,EditUser})=>{
    return  users.map(user=>(
        <tbody>
        <tr keys={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.age}</td>
            <td>
                <button onClick={()=>DeleteUser(user.id)}>Delete</button>
                
                <button onClick={()=>EditUser(user.id)}>Edit</button>
                
            </td>
        </tr>
        </tbody>
        
    ))
}
export default View;