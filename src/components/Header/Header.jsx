import React, { useState } from "react";
import "./Header.scss";
import { AiFillHome, AiOutlineHeart, AiOutlineSearch } from "react-icons/ai";
import { MdOutlineExplore } from "react-icons/md";
import { FcPhotoReel } from "react-icons/fc";
import { SlPlus } from "react-icons/sl";
import { CgDetailsMore, CgProfile } from "react-icons/cg";
import { FaTelegramPlane } from "react-icons/fa";
import Modal from "../Modal/Modal";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";

const Header = () => {
  const [modal, setModal] = useState({
    status: false,
  });
  const [input, setInput] = useState({
    aName: "",
    aPhoto: "",
    pContent: "",
    pPhoto: "",
  });

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!input.aName || !input.aPhoto || !input.pContent || !input.pPhoto) {
      swal("All Fields Are Required");
    } else {
      axios.post("http://localhost:5050/posts", input).then((res) => {
        setInput({
          aName: "",
          aPhoto: "",
          pContent: "",
          pPhoto: "",
        });
      });

      setModal((prevState) => ({
        ...prevState,
        status: false,
      }));
      swal("Create Successful ");
    }
  };

  return (
    <>
      <div className="side_bar py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="logo">
                <h4>Instagram</h4>
              </div>
              <div className="menu py-3">
                <div className="insta_menu">
                  <ul>
                    <li>
                      <Link to="/">
                        <div className="icon">
                          <AiFillHome />
                        </div>
                        <div className="content">Home</div>
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <div className="icon">
                          <AiOutlineSearch />
                        </div>
                        <div className="content">Search</div>
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <div className="icon">
                          <MdOutlineExplore />
                        </div>
                        <div className="content">Explore</div>
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <div className="icon">
                          <FcPhotoReel />
                        </div>
                        <div className="content">Reels</div>
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <div className="icon">
                          <FaTelegramPlane />
                        </div>
                        <div className="content">Messages</div>
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <div className="icon">
                          <AiOutlineHeart />
                        </div>
                        <div className="content">Notifications</div>
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <div className="icon">
                          <SlPlus />
                        </div>
                        <div
                          className="content"
                          onClick={() =>
                            setModal((prevState) => ({
                              ...prevState,
                              status: true,
                            }))
                          }
                        >
                          Create
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <div className="icon">
                          <CgProfile />
                        </div>
                        <div className="content">Profile</div>
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <div className="icon">
                          <CgDetailsMore />
                        </div>
                        <div className="content">More</div>
                      </Link>
                    </li>
                  </ul>

                  {modal.status && (
                    <Modal
                      title="Create A New Post"
                      hide={setModal}
                      children={
                        <>
                          <form onSubmit={handleFormSubmit}>
                            <div className="my-3">
                              <label for="">Aught Name</label>
                              <input
                                type="text"
                                name="aName"
                                value={input.aName}
                                onChange={handleInputChange}
                                className="form-control"
                              />
                            </div>
                            <div className="my-3">
                              <label for="">Aught Photo</label>
                              <input
                                type="text"
                                name="aPhoto"
                                value={input.aPhoto}
                                onChange={handleInputChange}
                                className="form-control"
                              />
                            </div>
                            <div className="my-3">
                              <label for="">Post Content</label>
                              <textarea
                                name="pContent"
                                value={input.pContent}
                                onChange={handleInputChange}
                                className="form-control"
                              ></textarea>
                            </div>
                            <div className="my-3">
                              <label for="">Post Photo</label>
                              <input
                                name="pPhoto"
                                value={input.pPhoto}
                                onChange={handleInputChange}
                                type="text"
                                className="form-control"
                              />
                            </div>
                            <div className="my-3">
                              <button
                                type="submit"
                                className="btn btn-primary w-100"
                              >
                                Create Now
                              </button>
                            </div>
                          </form>
                        </>
                      }
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
