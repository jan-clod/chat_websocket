import { authApi, profileApi } from "../../api/api";
import { useEffect, useState } from "react";
import "./Profile.css";
import { MdAddAPhoto } from "react-icons/md";
type ContactsType = {
  facebook: string | null;
  github: string | null;
  instagram: string | null;
  mainLink: string | null;
  twitter: string | null;
  vk: string | null;
  website: string | null;
  youtube: string | null;
};
type PhotosType = {
  small: string | null;
  large: string | null;
};
type ProfileItemsType = {
  name: string;
  id: number | null;
  photos: PhotosType;
  status: string | null;
  followed: false;
  contacts: ContactsType;
};
export const Profile = () => {
  const [myProfile, setMyProfile] = useState<ProfileItemsType>({
    name: "",
    id: null,
    photos: {
      small: null,
      large: null,
    },
    status: null,
    followed: false,
    contacts: {
      facebook: null,
      github: null,
      instagram: null,
      mainLink: null,
      twitter: null,
      vk: null,
      website: null,
      youtube: null,
    },
  });
  const [myStatus, setMyStatus] = useState("");
  async function showAvatar() {
    try {
      let res = await profileApi.updadeStatus("i'm frontend developer");
      let status = await res;
      setMyStatus(await status.config.data);
      /* alert("status update"); */
    } catch (err) {
      /* alert("status error"); */
      setTimeout(showAvatar, 3000);
    }
  }
  useEffect(() => {
    showAvatar();
    profileApi.getProfile(24600).then((res) => {
      setMyProfile({
        name: res.data.fullName,
        id: res.data.userId,
        photos: {
          small: res.data.photos.small,
          large: res.data.photos.large,
        },
        status: null,
        followed: false,
        contacts: res.data.contacts,
      });
    });
  }, []);
  let changeFile = (e: any) => {
    let img = e.target.files[0];
    profileApi.updatePhotos(img);
  };

  return (
    <div className="profile">
      <div className="profile_photo">
        <div className="photo_container">
          {myProfile.photos.large && (
            <img src={myProfile.photos.large} alt="" />
          )}
        </div>
        <div className="update_PhotoButton">
          <input
            type="file"
            name="file"
            className="input input__file"
            onChange={changeFile}
          />
          <label htmlFor="input__file">
            <MdAddAPhoto
              className="icon_photo"
              title="Загрузить новую фотографию"
            />
          </label>
        </div>
      </div>

      <div className="profile_info">
        <h3>Account</h3>
        <p className="user_name">@{myProfile.name}</p>
        <p className="dop_info">User name</p>
        <hr />
        <p title="Кликните два раза чтобы изменить статус">{myStatus}</p>
        <p className="dop_info">Status</p>
        <hr />
      </div>
    </div>
  );
};
