import React from "react";

const Label = ({children, ...props}) => {


return (
  <label style={styles.base} {...props}> {children}</label>
)
}

export default Label

const styles = {
  base: {
    color:'blue'
  }
}