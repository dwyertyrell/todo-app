import React from "react";

const Text = ({children, color='inherit' , size= 'md', ...props})=> { 
  //dynamic styling (that relies on the state of the parent prop) needs to be declared inside the component
  const styles = {
  fontSize: size === 'sm' ? '0.875rem' : size === 'lg'? '1.25rem': '1rem',
  color,
} 
  return (
    <span style={styles} {...props} >{children}</span>
  )
}
export default Text


