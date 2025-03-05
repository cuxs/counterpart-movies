import dayjs from 'dayjs'
import { Facebook, Instagram, Twitter } from 'lucide-react'
export function Footer() {
  return <div className="p-4 text-white bg-slate-500 flex gap-2 justify-between text-sm">
    <div className='flex flex-col'>
      <p>{dayjs().year()} Movie Explorer. All rights reserved.</p>
      <p>Discover, explore, and enjoy the best movies from around the world.</p>
    </div>
    <div className='flex flex-col'>
      <p>📍 Contact Us: email</p>
      <div className='flex gap-4'><p>📱 Follow Us:</p> <Facebook size={20} /> <Twitter size={20} />  <Instagram size={20}/></div>
      <p>🔗 Quick Links: <a href="#">About</a> | <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a></p>
    </div>

  </div>
}