import Link from 'next/link'
import React from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'

const NavLink = ({ href, activeClassName, children }) => {
  const router = useRouter()
  const child = React.Children.only(children)

  let className = child.props.className || ''
  if (router.pathname === href && activeClassName) {
    className = `${className} ${activeClassName}`.trim()
  }

  return <Link href={href}>{React.cloneElement(child, { className })}</Link>
}
  
NavLink.propTypes = {
  href: PropTypes.string,
  activeClassName: PropTypes.string,
  children: PropTypes.node.isRequired
}

NavLink.defaultProps = {
  href: '',
  activeClassName: ''
}

export default NavLink
