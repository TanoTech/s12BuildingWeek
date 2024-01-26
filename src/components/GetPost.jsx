import React, { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../redux/contexts/ProfileContext";
import { Container, Button, Modal } from "react-bootstrap";
import CommentPost from "./ CommentPost";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import { HiOutlinePencil } from "react-icons/hi2";

const EditPostModal = ({ post, onCancel, onSave }) => {
  const [editedText, setEditedText] = useState(post.text);

  const handleSave = () => {
    onSave(post._id, editedText);
  };

  return (
    <Modal show={true} onHide={onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <textarea
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          rows="4"
          className="form-control"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const GetPost = ({ posts, onDeletePost, onEditPost }) => {
  const { fetchUserProfile } = useContext(ProfileContext);
  const [userProfiles, setUserProfiles] = useState({});
  const [editPostModal, setEditPostModal] = useState({
    isOpen: false,
    postId: null,
  });

  useEffect(() => {
    const loadUserProfiles = async () => {
      const profiles = {};
      for (let post of posts) {
        const userId = post.user._id;
        if (userId && !profiles[userId]) {
          try {
            const userProfile = await fetchUserProfile(userId);
            if (userProfile) {
              profiles[userId] = userProfile;
            } else {
            }
          } catch (error) {
            console.error("Errore nel caricamento del profilo utente", error);
          }
        }
      }
      setUserProfiles(profiles);
    };
    if (posts && posts.length > 0) {
      loadUserProfiles();
    }
  }, [posts, fetchUserProfile]);

  const postsInReverse = [...posts].reverse();

  const handleEditPost = (postId) => {
    setEditPostModal({ isOpen: true, postId });
  };

  const handleCancelEdit = () => {
    setEditPostModal({ isOpen: false, postId: null });
  };

  const handleSaveEdit = (postId, newText) => {
    onEditPost(postId, newText);
    setEditPostModal({ isOpen: false, postId: null });
  };

  return (
    <Container className="m-0 p-0">
      {postsInReverse.slice(0, 10).map((post) => {
        const userProfile = userProfiles[post.user._id];
        return (
          <div
            className="bg-white my-3 mx-0 py-2 rounded border border-solid"
            id="ConteinerPost"
            key={post._id}
          >
            {userProfile && (
              <div className="d-flex justify-content-between">
                <div className="d-flex m-0">
                  <Link
                    className="align-self-center"
                    to={`/user/${post.user._id}`}
                  >
                    <img
                      className="img-fluid"
                      id="ProfilePicPost"
                      src={userProfile.image}
                      alt="Immagine del profilo"
                    />
                  </Link>
                  <div className="ms-2 align-items-center d-flex">
                    <div style={{height:"5em"}}>
                      <Link  to={`/user/${post.user._id}`}>
                        <p className="m-0" id="NamePost">
                          {userProfile.name} {userProfile.surname}
                        </p>
                      </Link>
                      <p className="m-0" id="DatePost">
                        {new Date(post.updatedAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="m-1 ms-2 d-flex" style={{height:"3em"}}>
                      <div className="d-flex justify-content-center  rounded IconAndTextPost">
                        <button
                          className="d-flex align-self-center m-0 px-3 fs-5"
                          style={{ background: "none", border: "none"}}
                          onClick={() => handleEditPost(post._id)}
                        >
                          <HiOutlinePencil className="m-0"/>
                        </button>
                      </div>
  
                      <div className="d-flex justify-content-center rounded IconAndTextPost">
                        <button
                          className="d-flex align-self-center m-0 px-3 fs-5 "
                          style={{ background: "none", border: "none" }}
                          onClick={() => onDeletePost(post._id)}
                        >
                          <FaRegTrashAlt className="m-0"/>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="d-flex align-self-center rounded p-1 ms-0 me-2"
                  id="FollowPost"
                >
                  <FiPlus className="align-self-center m-1 p-0" />
                  <p className="align-self-center m-0 p-0">Follow</p>
                </div>
              </div>
            )}

            <p className="mx-0 mt-1 mb-4 p-2">{post.text}</p>

            {post.image && (
              <img src={post.image} alt="Post" className="m-0" id="imgPost" />
            )}

            <CommentPost postId={post._id} />
          </div>
        );
      })}

      {editPostModal.isOpen && (
        <EditPostModal
          post={posts.find((post) => post._id === editPostModal.postId)}
          onCancel={handleCancelEdit}
          onSave={handleSaveEdit}
        />
      )}
    </Container>
  );
};

export default GetPost;
