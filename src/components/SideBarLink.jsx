import React from 'react'
import { Link } from 'react-router-dom'

const SideBarLink = (props) => {
  const content = props.content;
  const className = props.className;
  return (
    <Link className={className?className: ('w-4/5 ml-3 text-white px-2 py-2 my-2 text-xl hover:bg-white hover:text-red-500 rounded-2xl')} to={props.to?props.to:''}>
      {content}
    </Link>
  )
}

export default SideBarLink