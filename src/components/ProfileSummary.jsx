import { Container } from "react-bootstrap"
import { useContext } from "react"
import { ProfileContext } from "../redux/contexts/ProfileContext"
import { TypeUnderline } from "react-bootstrap-icons"
import { IoBookmark } from "react-icons/io5";

const ProfileSummary = () => {
    const { profile } = useContext(ProfileContext)
    const userProfileName = profile ? `${profile.name} ${profile.surname}` : ''
    const userProfileTitle = profile ? profile.title : '';
    const userProfileImg = profile ? profile.image : '';

    return (
        <Container className="bg-white border border-solid rounded mt-3 p-0" id="ContainerSummary">
            <div>
                
            </div>
            <>
                <Container className="p-0 text-center border-bottom" id="Section1Summary">
                    <img className='img-fluid dropImg mt-4 mx-0' style={{cursor:"pointer"}} src={userProfileImg} alt="foto profilo utente" />
                    <div className="mt-3 mx-0">
                        <p className="text-center m-0 fw-bold" id="UserName">{userProfileName}</p>
                        <p className="text-center mb-2 mx-0 Style1Summary">{userProfileTitle}</p>
                    </div>
                </Container>

                <Container className="p-2 border-bottom" id="Section2Summary">
                    <div className="m-0 d-flex justify-content-between ">
                        <p className="m-0 Style2Summary">Connection</p>
                        
                    </div>
                    <p className="m-0" id="ExpandYourNetwork">Expand your network</p>
                </Container>

                <Container className="p-2 border-bottom " id="Section3Summary">
                    <p className="m-0 Style3Summary">Boost your career with exclusive tools</p>
                    <p className="m-0" id="TryPremium">Try Premium for 0 EUR</p>
                </Container>
                <p>My items</p>
            </>
        </Container>
    )
}

export default ProfileSummary;