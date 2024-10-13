import './Profile.css'
import userimg from '../../../public/userImg.png'

const Profile = ({info}) => {
  return (
    <div className='profile'>
        <div className='img' style={{width: "30%"}}>
            <img src={userimg} alt="user" style={{width: "100%",height: "100%"}}/>
        </div>
        <div className='content' style={{width: "60%"}}>
            <p>Họ tên: {info.name}</p>
            <p>Năm sinh: {info.birthday}</p>
            <p>CCCD: {info.id}</p>
            <p>Name : {info.username}</p>
            <p>Password: {info.password}</p>
            <p>Email: {info.email}</p>
            <p>Sđt: {info.phone}</p>
            <p>Level: {info.level}</p>
        </div>
    </div>
  )
}

export default Profile

