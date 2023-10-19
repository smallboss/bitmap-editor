import { useState } from "react";
import { useForm } from "react-hook-form";
import "./style.scss";

const Comments = () => {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    console.log(data.comment);
    setSent(true);
    reset();
  };

  return (
    <div className="comments">
      <div className="comments__header">Comments and suggestions</div>
      {sent ? (
        <div className="comment-thank">
          Thank you for your valuable comments and suggestions. Your feedback is
          important to us, and it helps us improve. We look forward to coming
          back to you with our updates and improvements. If you need to add
          more, <span onClick={() => setSent(false)}>click here</span>.
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <textarea {...register("comment", { required: true })} />

          <button>Reject the project</button>
        </form>
      )}
    </div>
  );
};

export default Comments;
