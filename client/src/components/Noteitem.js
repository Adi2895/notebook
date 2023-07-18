import React, { useContext } from "react";
import { Link } from "react-router-dom";
import noteContext from "../context/noteContext";

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  
  

  return (
    <div className="col-md-4">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-item-center">
            <h5 style={{ color: "#000" }} className="card-title">
              {note.title}
            </h5>
            <i
              onClick={() => deleteNote(note._id)}
              style={{ color: "#000" }}
              className="fa fa-trash mx-2 my-1"
            >
              {" "}
            </i>
            <i
              onClick={() => updateNote(note)}
              style={{ color: "#000" }}
              className="fa-solid fa-light fa-pen-to-square mx-2 my-1"
            ></i>
          </div>
          <p style={{ color: "#000" }} className="card-text">
            {note.description.length < 70 ? (
              note.description
            ) : (
              <>
                {note.description.slice(0, 50)}
                <Link
                  to={`/note/${note._id}`}
                  style={{ color: "blue", textDecoration: "none" }}
                >
                  ...Show more{" "}
                </Link>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
export default Noteitem;
