import React from 'react'

/*
The onClick attribute is passed as a prop to this atomic component.
the text between the opening/closing tags, is passed into children prop  

const Button ({variant, children, onClick}){

variant 
children
onClick
}
*/
const Button = ({children, variant, ...props}) => {

  let variantStyle = styles.base;
  if (variant === 'edit') {
    variantStyle = {...styles.base, ...styles.edit}
  } else

  switch (variant) {
    case 'edit':
      variantStyle = {...styles.base, ...styles.edit}
      break;
    case 'delete':
      variantStyle = {...styles.base, ...styles.delete}
      break;
    case 'add':
      variantStyle = {...styles.base, ...styles.add}
      break;
    case 'save':
      variantStyle = {...styles.base, ...styles.save}
      break;
    default: 
    variantStyle = styles.base
    }

return (
 <button 
 style={variantStyle} 
 {...props}
 >
  {children}
  </button> 
)}  

export default Button

const styles = {
  base:{
    padding: '8px 16px',
    color: 'white',
    background: 'rgba(89, 92, 87, 1)',
    fontSize: '1rem',
    border: 'none',
    borderRadius: 30,
    cursor: 'pointer',
    boxShadow: '0px 2px 8px black',
    margin: '4px',
    // opacity: 0.9
  },
  edit:{
    background: "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)",
  },
  delete:{
    background: "linear-gradient(90deg, #ff512f 0%, #dd2476 100%)",
  },
  save: {
    backgroundColor: 'blue'
  },
}
 styles.add = {
   ...styles.edit
  }