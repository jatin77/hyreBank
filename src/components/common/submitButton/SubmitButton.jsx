import React from "react";
import Button from "@material-ui/core/Button";

function SubmitButton({ text }) {
  return (
    <div>
      <div className="mt-2">
        <Button
          className="w-full "
          type="submit"
          variant="contained"
          size="medium"
          color="primary"
        >
          {text}
        </Button>
      </div>
    </div>
  );
}

export default SubmitButton;
