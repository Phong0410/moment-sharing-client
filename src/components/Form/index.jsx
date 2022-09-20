import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FileBase from "react-file-base64";
import { create as createPost } from "../../app/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Paper, TextField, Button, CircularProgress } from "@material-ui/core";

const initialData = {
  message: "",
  image: "",
};

const Form = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState(initialData);
  const [filebaseKey, setFilebaseKey] = useState(0);
  const user = useSelector((state) => state.auth?.user);
  const creating = useSelector((state) => state.posts.creating);

  const handelSubmit = (e) => {
    e.preventDefault();

    if (!data.message) return;
    if (
      data.image &&
      data.image.split(";")[0].split(":")[1].split("/")[0] !== "image"
    )
      return;
    dispatch(createPost({ ...data, name: user?.name }));

    clear();
  };

  const clear = () => {
    setData({
      message: "",
      image: "",
    });
    setFilebaseKey(filebaseKey + 1);
  };

  return (
    <Paper elevation={3}>
      <form autoComplete="off" noValidate onSubmit={handelSubmit}>
        <TextField
          name="message"
          variant="outlined"
          label="Share your moment"
          fullWidth
          multiline
          value={data.message}
          onChange={(e) =>
            setData({
              ...data,
              message: e.target.value,
            })
          }
        />
        <FileBase
          type="file"
          multiple={false}
          onDone={({ base64 }) => setData({ ...data, image: base64 })}
          key={filebaseKey}
        />
        <Button
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
          style={{ height: "40px" }}
        >
          {creating ? (
            <CircularProgress size={20} style={{ color: "white" }} />
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
