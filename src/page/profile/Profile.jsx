import './Profile.css'
import userimg from '../../../public/userImg.png'

const Profile = ({info}) => {
  return (
    <div className='pageinfo'>
    <div className='profile'>
        <div className='img' style={{width: "30%"}}>
            <img src={userimg} alt="user" style={{width: "100%",height: "100%"}}/>
        </div>
        <div className='content' style={{width: "60%"}}>
            <p>Họ tên: {info.name}</p>
            <p>Năm sinh: {info.birthday}</p>
            <p>CCCD: {info.id}</p>
            <p>Username : {info.username}</p>
            <p>Password: {info.password}</p>
            <p>Email: {info.email}</p>
            <p>Sđt: {info.phone}</p>
            <p>Level: {info.level}</p>
        </div>
      </div>
      <div className='total'>
        <h3>Lịch sử mua sắm</h3> 
        <h2>Tổng tiêu dùng: {info.total} vnđ</h2>
      </div>

    <div className='logs'>
          <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Sản phẩm</th>
                  <th>Đơn giá</th>
                  <th>Số lượng</th>
                  <th>Thành tiền</th>
                </tr>
              </thead>
              <tbody>
              {info.logs[0] && info.logs[0].map((value , index) =>
              <tr key={index}>
                <td><img src={value[1]} alt={value[2]} style={{width: "70px", height: "70px", borderRadius: "10px", boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"}}/></td>
                <td>{value[2]}</td>
                <td>{value[3]}</td>
                <td>{value[4]}</td>
                <td>{value[5]}</td>
              </tr>
              )}
              </tbody>
            </table>
    </div>
    </div>
  )
}

export default Profile

