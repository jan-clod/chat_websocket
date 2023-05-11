import "./Profile.css";

export const Profile = () => {
  return (
    <div className="profile">
      <div className="main_info">
        <img src="logo.svg" alt="" />
        <h1 className="user_name">user_name</h1>
      </div>
      <div className="accaunt_info">
        <p className="my_phonenNumber"> +375 (29) 364 83 53</p>
        <p className="my_username">my_username</p>
        <p className="my_status">I'm Frontend Develepor</p>
      </div>

    </div>
  );
};
