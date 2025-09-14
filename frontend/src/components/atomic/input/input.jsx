import React from "react";

const Input = ({...props}) => {
  
  return <input style={styles.base} {...props} ></input>
}
export default Input
const styles= {
  base:{
    borderRadius: 30,
    boxShadow: '0 2px 8px black'
  }
}
