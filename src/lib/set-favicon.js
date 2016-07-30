import iconPath from '../img/icon256.png'

export default function () {
  const link = document.createElement('link')
  link.rel = 'icon'
  link.type = 'image/png'
  link.href = iconPath
  document.head.appendChild(link)
}

