const URL='http://localhost:3001/users'

export const api={
  // getUsers:()=>fetch(URL).then(r=>r.json()),
   getUsers: async ({ page = 1, limit = 5, sortKey = 'id', order = 'asc' }) => {
    const res = await fetch(URL);
    let data = await res.json();

    // Sorting
    data.sort((a, b) => {
      if (order === 'asc') return a[sortKey] > b[sortKey] ? 1 : -1;
      return a[sortKey] < b[sortKey] ? 1 : -1;
    });

    // Pagination
    const start = (page - 1) * limit;
    const paginated = data.slice(start, start + limit);

    return {
      total: data.length,
      rows: paginated
    };
  },
  addUser:(data)=>fetch(URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}),
  updateUser:(id,data)=>fetch(URL+'/'+id,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}),
  deleteUser:(id)=>fetch(URL+'/'+id,{method:'DELETE'}),
  login:async (username,password)=>{
    const res=await fetch(URL)
    const users=await res.json()
    return users.find(u=>u.username===username && u.password===password)
  }
}
