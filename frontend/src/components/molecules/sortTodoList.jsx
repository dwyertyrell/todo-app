import React from "react";
import Button from "../atomic/button";
import Label from "../atomic/label";
import Modal from "../atomic/modal";

const SortTodoList = ({setFilter, sort, setSort}) => {

  return (
    
    <>    
    <div>
      <Label> sort by:</Label>
      <select value={sort} onChange= {e => setSort(e.target.value)}>
        <option value ='date'>Creation Date</option>
        <option value='alpha'>Alphabetical</option>
      </select>
    </div>
      <div>
      <Button onClick= {() => setFilter('all')}>all</Button>
      <Button onClick= {()=>{setFilter('completed')}}>completed</Button>
      <Button onClick= {()=>{setFilter('active')}}>active</Button>
    </div>
</>
  )
}

export default SortTodoList