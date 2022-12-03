import { extend, setInteractionMode } from "vee-validate";
import { required, email, max, min, confirmed } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "{_field_} is required.",
});

extend("email", {
  ...email,
  message: "This field must valid email.",
});

extend("max", {
  ...max,
  message: "This field must be {length} characters or less",
});

extend("min", {
  ...min,
  message: "This field must be {length} characters or more",
});

extend("confirmed", {
  ...confirmed,
  message: "This {_field_} must match.",
});

setInteractionMode("lazy");
