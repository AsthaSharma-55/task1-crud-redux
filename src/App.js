
import React, { useEffect, useState } from 'react';
import View from './components/view'

const getData = () => {
  const data = localStorage.getItem('users')
   console.log('data',data) 
  if (data) {
    return JSON.parse(data);
  } else {
    return []
  }

}

const App = () => {
const[search,setSearch]=useState('')

  const [users, setUsers] = useState(getData())   
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [id, setId] = useState('')

  const [editItem, setEditItem] = useState(null)          //new
  const [toggleEdit, setToggleEdit] = useState(true) //new

  const handelSubmit = (e) => {
    e.preventDefault();
    let user = {
      id,
      name,
      age
    }
    setUsers([...users, user])
    console.log(users)
    setName('')
    setAge('')
    setId('')
    if (user && !toggleEdit) {
      setUsers(users.map((elem) => {
        if (elem.id === editItem) {
          return { ...elem, name: name, age: age }
        }
        return elem;

      }
      )
      )
      setToggleEdit(true)
      setName(" ")                  //new
      setAge(" ")                   //new
      setEditItem(null)
    }


  }
  const EditUser = (id) => {

    var newEditUser = users.find((elem) => {
      return elem.id === id
    })
    console.log(newEditUser)
    setId(newEditUser.id)
    setName(newEditUser.name)
    setAge(newEditUser.age)


    setToggleEdit(false)
    setName(newEditUser.name)                    //new
    setAge(newEditUser.age)                      //new
    setEditItem(id)

  }
  const DeleteUser = (id) => {
    const filterDelete = users.filter((element, index) => {
      return element.id !== id
    })
    setUsers(filterDelete)

  }
  const handleSearch=(e)=>{
    setSearch(e.target.value)
    const matchedUsers = users.filter((user) => {
			return `${user.name}`
				.toLowerCase()
				.includes(e.target.value.toLowerCase());
		});

		setUsers(matchedUsers);
		setSearch(e.target.value);
  }


  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users))
  }, [users])


  return (
    <div>
      <div>
        <h1>app</h1>
      </div>

      <form style={{ backgroundColor: "beige", display: "inlineBlock", height: "300px", width: "400px" }} onSubmit={handelSubmit}>
        <div>
          <input type={"text"} name="id" placeholder='id' style={{ display: "block" }} value={id} onChange={(e) => setId(e.target.value)} />
          <input type={"text"} name="name" placeholder='Name' style={{ display: "block" }} value={name} onChange={(e) => setName(e.target.value)} />
          <input type={"text"} name="age" placeholder='age' style={{ display: "block" }} value={age} onChange={(e) => setAge(e.target.value)} />
        </div>
        {toggleEdit ? <button style={{ width: "177px" }}>Submit</button> : <button style={{ width: "177px" }}>Edit</button>}
        {/*<button style={{ width: "177px" }}>Submit</button>*/}

      </form>

     <div>
      <input type={'text'} placeholder={'search by name'} name='search' value={search} onChange={handleSearch}   />
     </div>
      <div style={{ backgroundColor: "azure", display: "inline-block", float: "right", width: "809px" }}>
        {users.length > 0 && <>
          <div>
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Age</th>

                  <th>Action</th>
                </tr>
              </thead>

              <View users={users} DeleteUser={DeleteUser} EditUser={EditUser} />


            </table>
          </div>
        </>}
        {users.length < 1 && <div>No User</div>}
      </div>


    </div>
  )

}
export default App;