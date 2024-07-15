import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function Profile() {

    let navigate = useNavigate();

    const handleBack = () => {
        navigate("/")
    }
    
  return (
    <div>
        <div onClick={handleBack} className=" md:hidden back flex gap-3 items-center">
        <IoMdArrowBack className="text-[25px]"/>
        <span className="text-[20px]">Back</span>
        </div>
    <div className="flex items-center flex-col gap-10 md:gap-20">
      <div className="profile_img  w-[300px] h-[300px]">
        <img
          src="/image/girl-img.jpeg"
          alt="dp"
          className="images w-[100%] h-[100%] rounded-full"
        />
      </div>

      <div className="profile flex flex-col gap-10">
        <div className="profile_details flex flex-col items-center md:flex-row gap-10">
          <div 
          className="profile_surname  
          border-2 border-solid border-nottieBlack p-2 rounded-full w-[200px] text-center text-[500] text-[20px]">
            Alumun
          </div>
          <div className="profile_firstname border-2 border-solid border-nottieBlack p-2 rounded-full w-[200px] text-center text-[500] text-[20px]">Nita</div>
          <div className="profile_lastname border-2 border-solid border-nottieBlack p-2 rounded-full w-[200px] text-center text-[500] text-[20px]">Ngodoo</div>
        </div>

        <div className="profile_email border-2 border-solid border-nottieBlack px-5 md:px-0 p-2 rounded-full w-[fit] text-center text-[500] text-[20px]">
            nita1017@gmail.com
        </div>

        <div className="profile_button flex flex-col md:flex-row gap-10 items-center">
          <div className="update_butt">
            <button className="update w-[200px] p-2 bg-white rounded-full">
                Edit Profile
            </button>
          </div>
          <div className="logOut ">
            <button className="logout w-[200px] p-2 bg-white rounded-full">
                LogOut
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Profile;
